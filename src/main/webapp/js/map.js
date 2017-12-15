$(document).ready(function () {

    var elevation;
    var elev;
    var el;

    function displayLocationElevation(location, elevator, infowindow) {
        elevator.getElevationForLocations({
            'locations': [location]
        }, function (results, status) {
            infowindow.setPosition(location);
            if (status === 'OK') {
                // Retrieve the first result
                if (results[0]) {
                    infowindow.setContent('The elevation at this point <br>is ' +
                        results[0].elevation + ' meters.' +
                        '<button class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Build graphics</button>');
                    elevation = results[0].elevation;
                } else {
                    infowindow.setContent('No results found');
                }
            } else {
                infowindow.setContent('Elevation service failed due to: ' + status);
            }
        });
    }

    var points = [];


    $("#build").click(function () {
        var frequency = document.getElementById("frequency").value;

        console.log("pre success" + elevation);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: '/waveCalculation',
            data: JSON.stringify({
                "elevation": elev,
                "elevationMax": 100,
                "frequency": frequency,
                "mode": 1
            }), success: function (result) {
                console.log("success");
                points = [];
                $.each(result, function (i, val) {
                    console.log(i + "  val:" + val);
                    points.push([i, val])
                    console.log("length " + points.length);
                });
                drawChart();
            }
        });
        console.log("after success");
    });

    function drawChart() {

        $.plot("#placeholder",
            [
                {data: points}
            ],

            {
                series: {
                    lines: {show: true},
                    points: {show: true}
                },
                colors: ['blue'], // custom colors array
                xaxis: {
                    ticks: 1,
                    axisLabel: 'Z',
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                    axisLabelPadding: 5,
                    min: 0,
                    max: points.length,

                },
                yaxis: {
                    ticks: 5,
                    min: 0,
                    max: 100,
                    tickDecimals: 1,
                    axisLabel: 'X',
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                    axisLabelPadding: 5,
                },
                grid: {
                    backgroundColor: {colors: ["#fff", "#eee"]},
                    borderWidth: {
                        top: 1,
                        right: 1,
                        bottom: 2,
                        left: 2
                    }
                }
            });
    }


    var map, gsvc, pt, tb;

    require([
        "esri/map", "esri/graphic", "esri/symbols/SimpleMarkerSymbol",
        "esri/tasks/GeometryService", "esri/tasks/ProjectParameters",
        "esri/SpatialReference", "esri/InfoTemplate", "dojo/dom", "dojo/on", "esri/geometry/Polygon",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol", "esri/layers/GraphicsLayer",
        "dojo/dom-attr", "dojo/domReady!"
    ], function (Map, Graphic, SimpleMarkerSymbol,
                 GeometryService, ProjectParameters,
                 SpatialReference, InfoTemplate, dom, on, Polygon, SimpleLineSymbol, SimpleFillSymbol, Color,
                 PictureFillSymbol, CartographicLineSymbol, GraphicsLayer, domAttr) {
        map = new Map("map", {
            basemap: "streets",
            center: [-120.741, 56.39],
            zoom: 4
        });

        var myPolygon = {
            "geometry": {
                "rings": [[[110, 12], [118, 12],
                    [114, 14], [110, 12]]], "spatialReference": {"wkid": 4326}
            },
            "symbol": {
                "color": [0, 0, 0, 64], "outline": {
                    "color": [0, 0, 0, 255],
                    "width": 1, "type": "esriSLS", "style": "esriSLSSolid"
                },
                "type": "esriSFS", "style": "esriSFSSolid"
            }
        };


        var myPolygon1 = {
            "geometry": {
                "rings": [[[114, 14], [114, 17], [118, 12],
                    [114, 14]]], "spatialReference": {"wkid": 4326}
            },
            "symbol": {
                "color": [0, 0, 0, 0], "outline": {
                    "color": [0, 0, 0, 255],
                    "width": 1, "type": "esriSLS", "style": "esriSLSSolid"
                },
                "type": "esriSFS", "style": "esriSFSSolid"
            }
        };

        var myPolygon2 = {
            "geometry": {
                "rings": [[[114, 14], [114, 17], [110, 12],
                    [114, 14]]], "spatialReference": {"wkid": 4326}
            },
            "symbol": {
                "color": [0, 0, 0, 0], "outline": {
                    "color": [0, 0, 0, 255],
                    "width": 1, "type": "esriSLS", "style": "esriSLSSolid"
                },
                "type": "esriSFS", "style": "esriSFSSolid"
            }
        };

        var gra = new Graphic(myPolygon);
        var gl = new GraphicsLayer({id: "circles"});
        gl.add(gra);
        gl.on("mouse-over", layerClick);
        map.addLayer(gl);

        var gra1 = new Graphic(myPolygon1);
        var gl1 = new GraphicsLayer({id: "circles1"});
        gl1.add(gra1);
        gl1.on("mouse-over", layerClick2);
        map.addLayer(gl1);

        var gra2 = new Graphic(myPolygon2);
        var gl2 = new GraphicsLayer({id: "circles2"});
        gl2.add(gra2);
        gl2.on("mouse-over", layerClick3);
        map.addLayer(gl2);

        function ajaxDepthWaterArea(elev, waterAreaId) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                url: '/getElevationByCoord',
                data: JSON.stringify({
                    "depth": elev,
                    "waterAreaId": waterAreaId
                }),
                success: function (result) {
                    console.log("success");
                }
            });
        }

        function layerClick(evt) {
            map.graphics.clear();

            var point = evt.mapPoint;
            var symbol = new SimpleMarkerSymbol().setStyle("diamond");
            var graphic = new Graphic(point, symbol);
            var outSR = new SpatialReference(102100);

            map.graphics.add(graphic);

            gsvc.project([point], outSR, function (projectedPoints) {
                pt = projectedPoints[0];

                var outSR = new SpatialReference(4326);
                var params = new ProjectParameters();
                params.geometries = [pt.normalize()];
                params.outSR = outSR;

                gsvc.project(params, function (projectedPoints) {
                    pt = projectedPoints[0];

                    var elevator = new google.maps.ElevationService;
                    var myLatlng = new google.maps.LatLng(parseFloat(pt.y.toFixed()), parseFloat(pt.x.toFixed()));

                    elevator.getElevationForLocations({
                        'locations': [myLatlng]
                    }, function (results, status) {
                        // infowindow.setPosition(location);
                        if (status === 'OK') {
                            // Retrieve the first result
                            if (results[0]) {
                                elev = results[0].elevation;
                                console.log(elev)
                            } else {
                            }
                        } else {
                        }
                    });
                });

            });

            console.log("Lay");
            var graphic = new Graphic();
            graphic.setInfoTemplate(new InfoTemplate("Water area first",
                "<span>1 area, elevation:</span>" + elev +
                "<br><span> Latitude: </span> " + pt.y.toFixed() + "<br><span> Longitude:</span>" + pt.x.toFixed()));
            map.infoWindow.setTitle(graphic.getTitle());
            map.infoWindow.setContent(graphic.getContent());
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        }


        function layerClick2(evt) {
            map.graphics.clear();

            var point = evt.mapPoint;
            var symbol = new SimpleMarkerSymbol().setStyle("diamond");
            var graphic = new Graphic(point, symbol);
            var outSR = new SpatialReference(102100);

            map.graphics.add(graphic);

            gsvc.project([point], outSR, function (projectedPoints) {
                pt = projectedPoints[0];

                var outSR = new SpatialReference(4326);
                var params = new ProjectParameters();
                params.geometries = [pt.normalize()];
                params.outSR = outSR;

                gsvc.project(params, function (projectedPoints) {
                    pt = projectedPoints[0];

                    var elevator = new google.maps.ElevationService;
                    var myLatlng = new google.maps.LatLng(parseFloat(pt.y.toFixed()), parseFloat(pt.x.toFixed()));

                    elevator.getElevationForLocations({
                        'locations': [myLatlng]
                    }, function (results, status) {
                        // infowindow.setPosition(location);
                        if (status === 'OK') {
                            // Retrieve the first result
                            if (results[0]) {
                                elev = results[0].elevation;
                                console.log(elev)

                            }
                        } else {
                        }
                    });
                });

            });

            console.log("Lay");
            var graphic = new Graphic();
            graphic.setInfoTemplate(new InfoTemplate("Water area first",
                "<span>2 area, elevation:</span>" + elev +
                "<br><span> Latitude: </span> " + pt.y.toFixed() + "<br><span> Longitude:</span>" + pt.x.toFixed()));
            map.infoWindow.setTitle(graphic.getTitle());
            map.infoWindow.setContent(graphic.getContent());
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        }

        function layerClick3(evt) {
            map.graphics.clear();

            var point = evt.mapPoint;
            var symbol = new SimpleMarkerSymbol().setStyle("diamond");
            var graphic = new Graphic(point, symbol);
            var outSR = new SpatialReference(102100);

            map.graphics.add(graphic);

            gsvc.project([point], outSR, function (projectedPoints) {
                pt = projectedPoints[0];

                var outSR = new SpatialReference(4326);
                var params = new ProjectParameters();
                params.geometries = [pt.normalize()];
                params.outSR = outSR;

                gsvc.project(params, function (projectedPoints) {
                    pt = projectedPoints[0];

                    var elevator = new google.maps.ElevationService;
                    var myLatlng = new google.maps.LatLng(parseFloat(pt.y.toFixed()), parseFloat(pt.x.toFixed()));

                    elevator.getElevationForLocations({
                        'locations': [myLatlng]
                    }, function (results, status) {
                        // infowindow.setPosition(location);
                        if (status === 'OK') {
                            // Retrieve the first result
                            if (results[0]) {
                                elev = results[0].elevation;
                                console.log(elev)
                            } else {
                            }
                        } else {
                        }
                    });
                });

            });

            console.log("Lay");
            var graphic = new Graphic();
            graphic.setInfoTemplate(new InfoTemplate("Water area first",
                "<span>3 area, elevation:</span>" + elev +
                "<br><span> Latitude: </span> " + pt.y.toFixed() + "<br><span> Longitude:</span>" + pt.x.toFixed()));
            map.infoWindow.setTitle(graphic.getTitle());
            map.infoWindow.setContent(graphic.getContent());
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        }

        gsvc = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
        map.on("click", projectToWebMercator);

        function projectToWebMercator(evt) {
            map.graphics.clear();

            var point = evt.mapPoint;
            var symbol = new SimpleMarkerSymbol().setStyle("diamond");
            var graphic = new Graphic(point, symbol);
            var outSR = new SpatialReference(102100);

            map.graphics.add(graphic);

            gsvc.project([point], outSR, function (projectedPoints) {
                pt = projectedPoints[0];

                graphic.setInfoTemplate(new InfoTemplate("Coordinates",
                    "<span>X:</span>" + pt.x.toFixed(3) + "<br>" +
                    "<span>Y:</span>" + pt.y.toFixed(3) + "<br>" +
                    // "<input type='button' value='Convert back to LatLong' id='convert'>" +
                    "<div id='latlong'></div>"));
                map.infoWindow.setTitle(graphic.getTitle());
                map.infoWindow.setContent(graphic.getContent());
                map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));

                var outSR = new SpatialReference(4326);
                var params = new ProjectParameters();
                params.geometries = [pt.normalize()];
                params.outSR = outSR;

                gsvc.project(params, function (projectedPoints) {
                    pt = projectedPoints[0];
                    dom.byId("latlong").innerHTML = "<span>Latitude: </span> " +
                        pt.y.toFixed() + "<br><span>Longitude:</span>" + pt.x.toFixed() +
                        '<button class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Build graphics</button>';
                    var elevator = new google.maps.ElevationService;
                    var myLatlng = new google.maps.LatLng(parseFloat(pt.y.toFixed()), parseFloat(pt.x.toFixed()));

                    elevator.getElevationForLocations({
                        'locations': [myLatlng]
                    }, function (results, status) {
                        if (status === 'OK') {
                            if (results[0]) {
                                elev = results[0].elevation;
                                console.log(elev)
                                el = results[0].elevation.toFixed();
                                var elev12 = Math.abs(parseInt(elev, 10));
                                console.log(elev12);
                                $("#elevSpan").text("Elevation in point "+ elev12);
                                $("#slider").slider({
                                    value: 0,
                                    min: 0,
                                    max: elev12,
                                    step: 1,
                                    create: function (event, ui) {
                                        val = $("#slider").slider("value");
                                        $("#contentSlider").html(val);
                                    },
                                    slide: function (event, ui) {
                                        $("#contentSlider").html(ui.value);
                                        var frequency = document.getElementById("frequency").value;
                                        var elev = ui.value;
                                        console.log("pre success" + elevation);
                                        $.ajax({
                                            type: 'POST',
                                            dataType: 'json',
                                            contentType: 'application/json',
                                            url: '/waveCalculation',
                                            data: JSON.stringify({
                                                "elevation": elev,
                                                "elevationMax": 100,
                                                "frequency": frequency,
                                                "mode": 1
                                            }),
                                            success: function (result) {
                                                console.log("success");
                                                points = [];
                                                $.each(result, function (i, val) {
                                                    console.log(i + "  val:" + val);
                                                    points.push([i, val])
                                                });
                                                drawChart();
                                            }
                                        });
                                        console.log("after success");
                                    }
                                });
                            } else {
                            }
                        } else {
                        }
                    });
                });
            });
        }
    });


});



