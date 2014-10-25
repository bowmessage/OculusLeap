function init() {
    window.map = new OpenLayers.Map("basicMap");
    var mapnik = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(13.41, 52.52).transform(fromProjection, toProjection);
    var zoom = 3;

    map.addLayer(mapnik);
    map.setCenter(position, zoom);
/*
    var style = new OpenLayers.Style({
        pointRadius: "${radius}",
        fillColor: "#ffcc66",
        fillOpacity: 0.8,
        strokeColor: "#cc6633",
        strokeWidth: 2,
        strokeOpacity: 0.8
    }, {
        context: {
            radius: function(feature) {
                //return 3;
                //Todo change this to the number of posts or somethin
                return Math.min(feature.attributes.count, 7) + 3;
            }
        }
    });

    var pois = new OpenLayers.Layer.Vector("My Points", {
        strategies: [
            new OpenLayers.Strategy.Cluster({
                distance: 15
            })
        ],
        styleMap: new OpenLayers.StyleMap({
            "default": style,
            "select": {
                fillColor: "#8aeeef",
                strokeColor: "#32a8a9"
            }
        })

    });
    var select = new OpenLayers.Control.SelectFeature(
        pois, {
            hover: true
        }
    );
    map.addControl(select);
    select.activate();
    pois.events.on({
        "featureselected": display
    });



    function display(event) {
        $("#namesdiv").empty();
        console.log(event.feature.cluster);
        $.each(event.feature.cluster, function(k, v) {
            $("#namesdiv").append("<div>" + v.data.schoolName + "</div>");
        });

    }*/


    OAuth.initialize('AlrP4jjCIXkqVpJE_tZxvuqsF58')
    OAuth.popup('flickr', {}, function(error, result) {
        console.log(result)
        result.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&bbox=-30,-30,-8,-8').done(function(data) {
            //var template = Handlebars.compile($('#entry-template').html())
            //var content = template({
            //    statuses: data.statuses
            //})
            //$('#search-res').html(content)
            console.log('done!')

            console.log(data)
/*
            var features = [];
            var i;
            for (i = 0; i < data.statuses.length; i++) {
                var val = data.statuses[i];
                var pt = new OpenLayers.Geometry.Point(val.lon, val.lat);
                pt.transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    new OpenLayers.Projection("EPSG:900913")
                );
                features.push(
                    new OpenLayers.Feature.Vector(
                        pt, {
                            text: val.text
                        }
                    )
                );
            }*/
        })//.error(function(err){console.log(err)})
        // do some stuff with result
    })
}



var app = angular.module('myApp', ['ngResource']);
/*
app.factory('twitter', function ($resource, $http) {
            var consumerKey = encodeURIComponent('nBIQFWOypdKwQyRpXSiAAEsB6')
            var consumerSecret = encodeURIComponent('47BXF7Tw5A1d96mNeyFGAtJjiC0dYGxqTBpVOgRalyuVDaWadl')
            var credentials = btoa(consumerKey + ':' + consumerSecret)
            // Twitters OAuth service endpoint
            var twitterOauthEndpoint = $http.post(
                'https://api.twitter.com/oauth2/token'
                , "grant_type=client_credentials"
                , {headers: {'Authorization': 'Basic ' + credentials, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            )
            twitterOauthEndpoint.success(function (response) {
                // a successful response will return
                // the "bearer" token which is registered
                // to the $httpProvider
                app.$httpProvider.defaults.headers.common['Authorization'] = "Bearer " + response.access_token
            }).error(function (response) {
                  // error handling to some meaningful extent
                })
 
            var r = $resource('https://api.twitter.com/1.1/search/:action',
                {action: 'tweets.json',
                    count: 10,
                },
                {
                     paginate: {method: 'JSONP'}
                })
 
            return r;
        });
*/
app.controller('mainCtrl', ['$scope',
    function($scope) {
        $scope.double = function(value) {
            return value * 2;
        };
    }
]);

/* global angular, DeviceManager, RiftSandbox, Mousetrap */
(function() {
    'use strict';

    var File = (function() {
        var constr = function(name, contents) {
            this.name = name || 'Example';
            var defaultContents = ('\
      var t3 = THREE;\n\
      var light = new t3.PointLight();\n\
      light.position.set(10, 15, 9);\n\
      scene.add(light);\n\
      var makeCube = function (x, y, z) {\n\
        var cube = new t3.Mesh(\n\
          new t3.BoxGeometry(1, 1.1, 1),\n\
          new t3.MeshLambertMaterial({color: \'red\'})\n\
        );\n\
        cube.scale.set(0.1, 0.1, 0.1);\n\
        cube.position.set(1, 0, -1).add(\n\
          new t3.Vector3(x, y, z));\n\
        scene.add(cube);\n\
        return cube;\n\
      };\n\
      \n\
      var rows, cols, cubes = [], spacing = 0.07;\n\
      rows = cols = 18;\n\
      for (var r = 0; r < rows; r++) {\n\
        for (var c = 0; c < cols; c++) {\n\
          if (c === 0) { cubes[r] = []; }\n\
          cubes[r][c] = makeCube(r * spacing, 0, c * spacing);\n\
        }\n\
      }\n\
      var i = 0;\n\
      return function () {\n\
        i += -0.05;\n\
        for (var r = 0; r < rows; r++) {\n\
          for (var c = 0; c < cols; c++) {\n\
            var height = (\n\
              Math.sin(r / rows * Math.PI * 2 + i) + \n\
              Math.cos(c / cols * Math.PI * 2 + i));\n\
            cubes[r][c].position.setY(height / 12 + 0.6);\n\
            cubes[r][c].material.color.setRGB(\n\
              height + 1.0, height + 0.5, 0.5);\n\
          }\n\
        }\n\
      };\
    '.replace(/\n {6}/g, '\n').replace(/^\s+|\s+$/g, ''));
            //var defaultContents=
            this.contents = contents === undefined ? defaultContents : contents;
            this.selected = true;
        };
        constr.prototype.findNumberAt = function(index) {
            return this.contents.substring(index).match(/-?\d+\.?\d*/)[0];
        };
        constr.prototype.spinNumber = function(number, direction, amount) {
            if (number.indexOf('.') === -1) {
                return (parseInt(number, 10) + direction * amount).toString();
            } else {
                return (parseFloat(number) + direction * amount).toFixed(1);
            }
        };
        constr.prototype.spinNumberAt = function(index, direction, amount) {
            var number = this.findNumberAt(index);
            var newNumber = this.spinNumber(number, direction, amount);
            this.contents = (
                this.contents.substring(0, index) +
                newNumber +
                this.contents.substring(index + number.length)
            );
        };
        return constr;
    }());

    var Sketch = (function() {
        var constr = function(name, files) {
            this.name = name || 'Example Sketch';
            this.files = files || [
                new File()
            ];
        };
        constr.prototype.getCode = function() {
            var code = '';
            for (var i = 0; i < this.files.length; i++) {
                code += this.files[i].contents;
            }
            return code;
        };
        constr.prototype.addFile = function() {
            this.files.push(new File('Untitled', ''));
        };
        return constr;
    }());


    app
        .controller('SketchController', ['$scope',
            function($scope) {
                var autosave = localStorage.getItem('autosave');
                var files;
                if (autosave) {
                    files = [new File('autosave', autosave)];
                    $scope.sketch = new Sketch('autosave', files);
                } else {
                    $scope.sketch = new Sketch(files);
                }

                // TODO: Most of this should be in a directive instead of in the controller.
                var mousePos = {
                    x: 0,
                    y: 0
                };
                /*window.addEventListener(
                    'mousemove',
                    function(e) {
                        mousePos.x = e.clientX;
                        mousePos.y = e.clientY;
                    },
                    false
                );*/

                this.sketchLoop = function() {};

                //var mapElement = document.querySelector('div#basicMap');

                this.mainLoop = function() {
                    window.requestAnimationFrame(this.mainLoop.bind(this));

                    // Apply movement
                    if (this.deviceManager.sensorDevice) {
                        if (this.riftSandbox.vrMode) {
                            this.riftSandbox.setHmdPositionRotation(
                                this.deviceManager.sensorDevice.getState());
                        }
                        this.riftSandbox.setBaseRotation();
                        this.riftSandbox.updateCameraPositionRotation();
                    }
                    if (!this.deviceManager.sensorDevice || !this.riftSandbox.vrMode) {
                        this.riftSandbox.setRotation({
                            y: (mousePos.x / window.innerWidth) * Math.PI * 2
                        });
                        this.riftSandbox.setBaseRotation();
                        this.riftSandbox.updateCameraPositionRotation();
                    }

                    try {
                        this.sketchLoop();
                    } catch (err) {
                        if ($scope.error === null) {
                            $scope.error = err.toString();
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }
                    }

                    var mapImages = document.querySelectorAll("div#basicMap img")

                    var i;
                    for (i = 0; i < mapImages.length; i++) {
                        //mapImages[i].style.transform = "translate3d(10,0,0)";
                    }

                    this.riftSandbox.render();
                };

                this.deviceManager = new DeviceManager();
                this.riftSandbox = new RiftSandbox(window.innerWidth, window.innerHeight);
                this.deviceManager.onResizeFOV = function(
                    renderTargetSize, fovLeft, fovRight
                ) {
                    this.riftSandbox.setFOV(fovLeft, fovRight);
                }.bind(this);
                this.deviceManager.onHMDDeviceFound = function(hmdDevice) {
                    var eyeOffsetLeft = hmdDevice.getEyeTranslation("left");
                    var eyeOffsetRight = hmdDevice.getEyeTranslation("right");
                    this.riftSandbox.setCameraOffsets(eyeOffsetLeft, eyeOffsetRight);
                }.bind(this);

                window.addEventListener(
                    'resize',
                    this.riftSandbox.resize.bind(this.riftSandbox),
                    false
                );

                $scope.is_editor_visible = true;
                var domElement = this.riftSandbox.container;
                this.bindKeyboardShortcuts = function() {
                    var spinNumberAndKeepSelection = function(direction, amount) {
                        var textarea = document.querySelector('textarea');
                        var start = textarea.selectionStart;
                        $scope.sketch.files[0].spinNumberAt(start, direction, amount);
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        textarea.selectionStart = textarea.selectionEnd = start;
                    }.bind(this);
                    Mousetrap.bind('alt+v', function() {
                        this.riftSandbox.toggleVrMode();
                        if (domElement.mozRequestFullScreen) {
                            domElement.mozRequestFullScreen({
                                vrDisplay: this.deviceManager.hmdDevice
                            });
                        } else if (domElement.webkitRequestFullscreen) {
                            domElement.webkitRequestFullscreen({
                                vrDisplay: this.deviceManager.hmdDevice
                            });
                        }
                        return false;
                    }.bind(this));
                    Mousetrap.bind('alt+z', function() {
                        this.deviceManager.sensorDevice.zeroSensor();
                        return false;
                    }.bind(this));
                    Mousetrap.bind('alt+e', function() {
                        $scope.is_editor_visible = !$scope.is_editor_visible;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        return false;
                    }.bind(this));
                    Mousetrap.bind('alt+u', function() {
                        spinNumberAndKeepSelection(-1, 10);
                        return false;
                    });
                    Mousetrap.bind('alt+i', function() {
                        spinNumberAndKeepSelection(1, 10);
                        return false;
                    });
                    Mousetrap.bind('alt+j', function() {
                        spinNumberAndKeepSelection(-1, 1);
                        return false;
                    });
                    Mousetrap.bind('alt+k', function() {
                        spinNumberAndKeepSelection(1, 1);
                        return false;
                    });
                    Mousetrap.bind('alt+m', function() {
                        spinNumberAndKeepSelection(-1, 0.1);
                        return false;
                    });
                    Mousetrap.bind('alt+,', function() {
                        spinNumberAndKeepSelection(1, 0.1);
                        return false;
                    });

                    var MOVEMENT_RATE = 0.01;
                    var ROTATION_RATE = 0.01;

                    Mousetrap.bind('w', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.setVelocity(MOVEMENT_RATE);
                        }
                    }.bind(this), 'keydown');
                    Mousetrap.bind('w', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.setVelocity(0);
                        }
                    }.bind(this), 'keyup');

                    Mousetrap.bind('s', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.setVelocity(-MOVEMENT_RATE);
                        }
                    }.bind(this));
                    Mousetrap.bind('s', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.setVelocity(0);
                        }
                    }.bind(this), 'keyup');

                    Mousetrap.bind('a', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.BaseRotationEuler.y += ROTATION_RATE;
                        }
                    }.bind(this));
                    Mousetrap.bind('d', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.BaseRotationEuler.y -= ROTATION_RATE;
                        }
                    }.bind(this));

                    Mousetrap.bind('q', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.BaseRotationEuler.y += Math.PI / 4;
                        }
                    }.bind(this));
                    Mousetrap.bind('e', function() {
                        if (!$scope.is_editor_visible) {
                            this.riftSandbox.BaseRotationEuler.y -= Math.PI / 4;
                        }
                    }.bind(this));

                }.bind(this);
                this.bindKeyboardShortcuts();

                var toggleVrMode = function() {
                    if (!(document.mozFullScreenElement || document.webkitFullScreenElement) &&
                        this.riftSandbox.vrMode
                    ) {
                        $scope.isInfullscreen = false;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        this.riftSandbox.toggleVrMode();
                    } else {
                        $scope.isInfullscreen = true;
                        // Guesstimate that it's DK1 based on resolution. Ideally getVRDevices
                        // would give us a model name but it doesn't in Firefox.
                        if (window.innerWidth < 1800) {
                            $scope.isDK1 = true;
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                }.bind(this);
                document.addEventListener('mozfullscreenchange', toggleVrMode, false);
                document.addEventListener('webkitfullscreenchange', toggleVrMode, false);

                this.riftSandbox.resize();
                // We only support a specific WebVR build at the moment.
                if (!navigator.userAgent.match('Firefox/34')) {
                    $scope.seemsUnsupported = true;
                }
                this.deviceManager.onError = function() {
                    $scope.seemsUnsupported = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }.bind(this);
                this.deviceManager.init();
                this.mainLoop();

                /*$scope.$watch('sketch.getCode()', function(code) {
                    this.riftSandbox.clearScene();
                    var _sketchLoop;
                    $scope.error = null;
                    try {
                        var _sketchFunc = new Function('scene', '"use strict";\n' + code);
                        _sketchLoop = _sketchFunc(this.riftSandbox.scene);
                    } catch (err) {
                        $scope.error = err.toString();
                    }
                    if (_sketchLoop) {
                        this.sketchLoop = _sketchLoop;
                    }
                    localStorage.setItem('autosave', code);
                }.bind(this));*/
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
                var zooming = false;
                var startDistance;
                var pinchStartPosition = new THREE.Vector3(0, 0, 0);
                var pinchStartCameraPosition = new THREE.Vector3(0, 0, 0);
                var pinchThreshold = 0.9;

                window.renderer = null;

                window.camera = this.riftSandbox.camera;

                initScene = function(sandbox, element) {
                    THREE.ImageUtils.crossOrigin = '';
                    var axis, pointLight;
                    /*window.renderer = new THREE.WebGLRenderer({
                        alpha: true
                    });*/
                    //renderer.setClearColor(0x000000, 1);
                    //renderer.setSize(window.innerWidth, window.innerHeight);
                    //element.appendChild(renderer.domElement);
                    axis = new THREE.AxisHelper(5);
                    sandbox.scene.add(axis);
                    sandbox.scene.add(new THREE.AmbientLight(0x888888));
                    pointLight = new THREE.PointLight(0x888888);
                    //pointLight.position = new THREE.Vector3(-20, 10, 0);
                    pointLight.lookAt(new THREE.Vector3(0, 0, 0));
                    sandbox.scene.add(pointLight);

                    //var map = THREE.ImageUtils.loadTexture("http://i.imgur.com/vMXXnOB.jpg");
                    //var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );


                    //scene.add( sprite );  

                    //var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('../images/worldmap.jpg') } );
                    //var material = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
                    //material.position.set( 0, 0, 0);
                    //scene.add(material);

                    //window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                    sandbox.camera.position.fromArray([0, 0, 20]);
                    sandbox.camera.lookAt(cameraTarget);
                    window.controls = new THREE.TrackballControls(sandbox.camera);
                    sandbox.scene.add(sandbox.camera);

                    /*window.addEventListener('resize', function() {
                        sandbox.camera.aspect = window.innerWidth / window.innerHeight;
                        sandbox.camera.updateProjectionMatrix();
                        sandbox.renderer.setSize(window.innerWidth, window.innerHeight);
                        controls.handleResize();
                        return sandbox.renderer.render(sandbox.scene, sandbox.camera);
                    }, false);
                    return sandbox.renderer.render(sandbox.scene, sandbox.camera);*/
                };

                // via Detector.js:
                var webglAvailable = (function() {
                    try {
                        var canvas = document.createElement('canvas');
                        return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
                    } catch (e) {
                        return false;
                    }
                })();

                if (webglAvailable) {
                    initScene(this.riftSandbox, document.body);
                }

                stats = new Stats();

                stats.domElement.style.position = 'absolute';

                stats.domElement.style.left = '0px';

                stats.domElement.style.top = '0px';

                document.body.appendChild(stats.domElement);

                var prevPosition = null;

                window.controller = controller = Leap.loop({
                    enableGestures: true
                }, function(frame) {
                    console.log(cameraTarget.x + ',' + cameraTarget.y + ',' + cameraTarget.z);

                    if (frame.valid && frame.gestures.length > 0) {
                        var gesture = frame.gestures[0]
                        switch (gesture.type) {
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
                    if (frame.hands.length == 1) {
                        var hand = frame.hands[0];


                        if (hand.pinchStrength > pinchThreshold && !pinching) {
                            pinching = true;
                            var pinchingFinger = findPinchingFingerType(hand);
                            var p = pinchingFinger.dipPosition;
                            pinchStartPosition.set(p[0], p[1], p[2]);
                            console.log(p);
                            var cp = camera.position;
                            pinchStartCameraPosition.copy(cp);
                            pinchStartCameraTarget.copy(cameraTarget);
                            console.log("Starting pinch, Camera position:" + pinchStartCameraPosition.x + ',' + pinchStartCameraPosition.y + ',' + pinchStartCameraPosition.z);
                        } else if (hand.pinchStrength > pinchThreshold && pinching) {

                            var pinchingFinger = findPinchingFingerType(hand);
                            var newp = pinchingFinger.dipPosition;
                            var newFingerPosition = new THREE.Vector3(newp[0], newp[1], newp[2]);

                            var movementThisFrame = new THREE.Vector3(0, 0, 0);
                            if (prevPosition != null) {
                                movementThisFrame.copy(newFingerPosition).sub(prevPosition).multiplyScalar(4);
                                //console.log("newFingerPosition:" + newFingerPosition.x + ',' + newFingerPosition.y + ',' + newFingerPosition.z);
                                //console.log("prevPosition:" + prevPosition.x + ',' + prevPosition.y + ',' + prevPosition.z);
                            } else {
                                prevPosition = new THREE.Vector3(0, 0, 0);
                            }
                            prevPosition.copy(newFingerPosition);

                            var fingerOffset = newFingerPosition.sub(pinchStartPosition).multiplyScalar(1);
                            fingerOffset.setZ(0);



                            //console.log("Offset:" + fingerOffset.x + ',' + fingerOffset.y + ',' + fingerOffset.z);
                            var cp = new THREE.Vector3(0, 0, 0);
                            cp.copy(pinchStartCameraPosition).add(fingerOffset).round();


                            //console.log("Camera position:" + pinchStartCameraPosition.x + ',' + pinchStartCameraPosition.y + ',' + pinchStartCameraPosition.z);
                            //camera.position.copy(cp);

                            var ct = new THREE.Vector3(0, 0, 0);
                            ct.copy(pinchStartCameraTarget).add(fingerOffset.multiplyScalar(0.9)).round();

                            window.map.moveByPx(-movementThisFrame.x, movementThisFrame.y);


                            //console.log("Setting camera target:" + movementThisFrame.x + ',' + movementThisFrame.y + ',' + movementThisFrame.z);
                        } else if (hand.pinchStrength <= pinchThreshold && pinching) {
                            pinching = false;
                            prevPosition = null;
                        }
                    }
                    //ZOOMING
                    else if (frame.hands.length == 2) {
                        var hand1 = frame.hands[0];
                        var hand2 = frame.hands[1];

                        if (hand1.pinchStrength > pinchThreshold && hand1.pinchStrength > pinchThreshold && !zooming) {
                            zooming = true;
                            var finger1 = findPinchingFingerType(hand1);
                            var finger2 = findPinchingFingerType(hand2);


                            var tempPosition1 = new THREE.Vector3(0, 0, 0);
                            tempPosition1.fromArray(finger1.dipPosition);
                            var tempPosition2 = new THREE.Vector3(0, 0, 0);
                            tempPosition1.sub(tempPosition2.fromArray(finger2.dipPosition));

                            startDistance = tempPosition1.length();


                        } else if (hand1.pinchStrength > pinchThreshold && hand1.pinchStrength > pinchThreshold && zooming) {

                            var finger1 = findPinchingFingerType(hand1);
                            var finger2 = findPinchingFingerType(hand2);


                            var tempPosition1 = new THREE.Vector3(0, 0, 0);
                            tempPosition1.fromArray(finger1.dipPosition);
                            var tempPosition2 = new THREE.Vector3(0, 0, 0);
                            tempPosition1.sub(tempPosition2.fromArray(finger2.dipPosition));

                            var newDistance = tempPosition1.length();

                            var distanceOffset = newDistance - startDistance;

                            console.log("Distance: " + distanceOffset);

                            window.map.zoomTo(window.map.getZoom() + distanceOffset / 150);

                        }
                    }
                });

                controller.use('handHold').use('transform', {
                    position: new THREE.Vector3(1, 0, 0)
                }).use('handEntry').use('screenPosition').use('riggedHand', {
                    parent: this.riftSandbox.scene,
                    renderer: this.riftSandbox.renderer,
                    scale: getParam('scale'),
                    positionScale: getParam('positionScale'),
                    offset: new THREE.Vector3(0, 0, 50),
                    renderFn: function() {
                        //this.renderer.render(this.parent, this.camera);
                        return controls.update();
                    },
                    materialOptions: {
                        wireframe: getParam('wireframe')
                    },
                    dotsMode: getParam('dots'),
                    stats: stats,
                    camera: this.riftSandbox.camera,
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
                        } else {

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
                    this.riftSandbox.scene.add(sphere);
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
            }
        ]);



}());

function findPinchingFingerType(hand) {
    var pincher;
    var closest = 500;
    for (var f = 1; f < 5; f++) {
        current = hand.fingers[f];
        distance = Leap.vec3.distance(hand.thumb.tipPosition, current.tipPosition);
        if (current != hand.thumb && distance < closest) {
            closest = distance;
            pincher = current;
        }
    }
    return pincher;
}