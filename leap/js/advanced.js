(function() {
  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  var controller, cursor, initScene, stats;

  //////////////// ADDED VARS//////////////////
  var processingGesture = false;
  var cameraTarget = new THREE.Vector3(0, 0, 0);
  var pinchStartCameraTarget = new THREE.Vector3(0, 0, 0);

  var pinching = false;
  var pinchStartPosition = new THREE.Vector3(0, 0, 0);
  var pinchStartCameraPosition = new THREE.Vector3(0, 0, 0);
  var pinchThreshold = 0.9;

  window.scene = null;

  window.renderer = null;

  window.camera = null;

  initScene = function(element) {
    THREE.ImageUtils.crossOrigin = '';
    var axis, pointLight;
    window.scene = new THREE.Scene();
    window.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    element.appendChild(renderer.domElement);
    axis = new THREE.AxisHelper(5);
    scene.add(axis);
    scene.add(new THREE.AmbientLight(0x888888));
    pointLight = new THREE.PointLight(0x888888);
    pointLight.position = new THREE.Vector3(-20, 10, 0);
    pointLight.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(pointLight);

    var geometry = new THREE.BoxGeometry( 100, 80, 1 );
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('http://i.imgur.com/vMXXnOB.jpg') } );
    var mesh = new THREE.Mesh( geometry, material );

    //var map = THREE.ImageUtils.loadTexture("http://i.imgur.com/vMXXnOB.jpg");
    //var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
    var sprite = new THREE.Sprite( material );

    mesh.position.set(0,0,-10);


    scene.add( mesh );
    sprite.scale.set(150, 100, 100);

    //scene.add( sprite );  

    //var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('../images/worldmap.jpg') } );
    //var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
    //material.position.set( 0, 0, 0);
    //scene.add(material);

    window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.fromArray([0, 0, 20]);
    camera.lookAt(cameraTarget);
    window.controls = new THREE.TrackballControls(camera);
    scene.add(camera);

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls.handleResize();
      return renderer.render(scene, camera);
    }, false);
    return renderer.render(scene, camera);
  };

  // via Detector.js:
  var webglAvailable  = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();

  if (webglAvailable) {
    initScene(document.body);
  }

  stats = new Stats();

  stats.domElement.style.position = 'absolute';

  stats.domElement.style.left = '0px';

  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  window.controller = controller = Leap.loop({enableGestures: true}, function(frame){
    if(frame.valid && frame.gestures.length > 0){
      var gesture = frame.gestures[0]
      switch (gesture.type){
        case "circle":
        console.log("Circle Gesture");
        break;
        case "keyTap":
        console.log("Key Tap Gesture");
        break;
        case "screenTap":
        console.log("Screen Tap Gesture");
        break;
        case "swipe":
        // if(!processingGesture){
          console.log("Swipe!");
        //   cameraTarget.add(new THREE.Vector3( gesture.direction[0], gesture.direction[1], 0 ).multiplyScalar(5));
        //   camera.lookAt(cameraTarget);
        //   camera.position.add(new THREE.Vector3( gesture.direction[0], gesture.direction[1], 0 ).multiplyScalar(2))
        //   processingGesture = true;
        //   setTimeout(function() {
        //     processingGesture = false;
        //   }, 1000);
        // }
        break;
      }
    }


    //// PINCHING //////////////
    if(frame.hands.length > 0) {
      var hand = frame.hands[0];

      if(hand.pinchStrength > pinchThreshold && !pinching) {
        pinching = true;
        var pinchingFinger = findPinchingFingerType(hand);
        var p = pinchingFinger.dipPosition;
        pinchStartPosition.set(p[0], p[1], p[2]);
        console.log(p);
        var cp = camera.position;
        pinchStartCameraPosition.copy(cp);
        pinchStartCameraTarget.copy(cameraTarget);
        console.log("Starting pinch, Camera position:" + pinchStartCameraPosition.x + ',' + pinchStartCameraPosition.y + ',' + pinchStartCameraPosition.z);
      }
      else if(hand.pinchStrength > pinchThreshold && pinching) {
        var pinchingFinger = findPinchingFingerType(hand);
        var newp= pinchingFinger.dipPosition;
        var newFingerPosition = new THREE.Vector3(newp[0], newp[1], newp[2]);

        var fingerOffset = newFingerPosition.sub(pinchStartPosition).multiplyScalar(1);
        fingerOffset.setZ(0);

        console.log("Offset:" + fingerOffset.x + ',' + fingerOffset.y + ',' + fingerOffset.z);
        var cp = new THREE.Vector3(0,0,0);
        cp.copy(pinchStartCameraPosition).add(fingerOffset).round();
        console.log("Camera position:" + pinchStartCameraPosition.x + ',' + pinchStartCameraPosition.y + ',' + pinchStartCameraPosition.z);
        camera.position.copy(cp);

        var ct = new THREE.Vector3(0,0,0);
        ct.copy(pinchStartCameraTarget).add(fingerOffset.multiplyScalar(0.7)).round();
        camera.lookAt(ct);
        cameraTarget.copy(ct);
      }
      else if(hand.pinchStrength <= pinchThreshold && pinching) {
        pinching = false;
      }
    }
  });

  controller.use('handHold').use('transform', {
    position: new THREE.Vector3(1, 0, 0)
  }).use('handEntry').use('screenPosition').use('riggedHand', {
    parent: scene,
    renderer: renderer,
    scale: getParam('scale'),
    positionScale: getParam('positionScale'),
    offset: new THREE.Vector3(0, 0, 0),
    renderFn: function() {
      renderer.render(scene, camera);
      return controls.update();
    },
    materialOptions: {
      wireframe: getParam('wireframe')
    },
    dotsMode: getParam('dots'),
    stats: stats,
    camera: camera,
    boneLabels: function(boneMesh, leapHand) {
      if (boneMesh.name.indexOf('Finger_03') === 0) {
        return leapHand.pinchStrength;
      }
    },
    boneColors: function(boneMesh, leapHand) {
      if ((boneMesh.name.indexOf('Finger_0') === 0) || (boneMesh.name.indexOf('Finger_1') === 0)) {
        return {
          hue: 0.6,
          saturation: leapHand.pinchStrength
        };
      }
      else {

      }
    },
    checkWebGL: true
  }).connect();


  if (getParam('screenPosition')) {
    cursor = document.createElement('div');
    cursor.style.width = '50px';
    cursor.style.height = '50px';
    cursor.style.position = 'absolute';
    cursor.style.zIndex = '10';
    cursor.style.backgroundColor = 'green';
    cursor.style.opacity = '0.8';
    cursor.style.color = 'white';
    cursor.style.fontFamily = 'curior';
    cursor.style.textAlign = 'center';
    cursor.innerHTML = "&lt;div&gt;";
    document.body.appendChild(cursor);
    controller.on('frame', function(frame) {
      var hand, handMesh, screenPosition;
      if (hand = frame.hands[0]) {
        handMesh = frame.hands[0].data('riggedHand.mesh');
        screenPosition = handMesh.screenPosition(hand.fingers[1].tipPosition, camera);
        cursor.style.left = screenPosition.x;
        return cursor.style.bottom = screenPosition.y;
      }
    });
  }

  if (getParam('scenePosition')) {
    window.sphere = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial(0xff0000));
    scene.add(sphere);
    controller.on('frame', function(frame) {
      var hand, handMesh;
      if (hand = frame.hands[0]) {
        handMesh = frame.hands[0].data('riggedHand.mesh');
        return handMesh.scenePosition(hand.indexFinger.tipPosition, sphere.position);
      }
    });
  }

  if (getParam('playback')) {
    controller.use('playback', {
      recording: 'examples/confidence2-49fps.json.lz',
      autoPlay: true,
      pauseOnHand: true
    });
  }

}).call(this);

function findPinchingFingerType(hand){
    var pincher;
    var closest = 500;
    for(var f = 1; f < 5; f++)
    {
        current = hand.fingers[f];
        distance = Leap.vec3.distance(hand.thumb.tipPosition, current.tipPosition);
        if(current != hand.thumb && distance < closest)
        {
            closest = distance;
            pincher = current; 
        }
    } 
    return pincher;
}