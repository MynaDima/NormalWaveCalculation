<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page session="false" %>
<%--
  Created by IntelliJ IDEA.
  User: dima
  Date: 1/12/16
  Time: 9:26 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <title>Map</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/map.css"/>">
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/bootstrap.min.css"/>">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script type="text/javascript" src="<c:url value="${pageContext.request.contextPath}/js/map.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/js/bootstrap.min.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/js/jquery.flot.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/js/jquery-ui.js"/>"></script>
    <script type="text/javascript" src="<c:url value="/js/jquery.flot.axislabels.js"/>"></script>
    <script type="text/javascript" type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <%--<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>--%>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet"
          type="text/css"/>

    <link rel="stylesheet" href="https://js.arcgis.com/3.22/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="https://js.arcgis.com/3.22/esri/css/esri.css">
    <script src="https://js.arcgis.com/3.22/"></script>


    <style>
        .esriPopup .contentPane span {
            display: inline-block;
            padding: 0 0 0.2em 0;
            width: 6em;
        }
    </style>
</head>
<body class="claro">
<%--<div id="map"></div>--%>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0STQBkTqhfX0sv1By1wW-Rz7wtly_2xQ&callback=initMap"
async defer></script>

<!-- Large modal -->

<div id="map" style="width:100%; height:100%; border:1px solid #000;">
    <span id="elevSpan"></span>
</div>


<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Input parameters</h4>
            </div>
            <div class="modal-body">
                <br>
                Frequency <input type="text" width="30%" id="frequency">
                <br>
                <%--Mode <input type="text" width="30%" id="modeCount" value="1">--%>
                <br>
                <p><input type="button" value="Build graphs" id="build"></p>
                <div id="header">
                    <h2>Graphics</h2>
                </div>

                <div id="content">
                    <div class="demo-container">
                        <div class="demo-placeholder" id="placeholder" style="width: auto">
                        </div>
                    </div>
                </div>
                <span id="contentSlider"></span>
                <div id="slider"></div>

                <div id="myfirstchart" style="height: 250px;"></div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>

        </div>
    </div>


</div>

</body>
</html>
