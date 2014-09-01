/**
 * Created by Administrator on 2014/9/1.
 */
/*! hotel-domestic-search 2014-08-14 */
"use strict";
var MapPop = function () {
    //初始化地图
    function initMap() {
        var options = {
            center: LatLng,
            zoom: 15,
            navigationControl: !0,
            scaleControl: !0,
            streetViewControl: !0,
            mapTypeControl: !0,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(mapContent, options)
    }

    //个性化定制MarkerOverlay
    function MarkerOverlay() {
        function Overlay(map, text, css, latlng) {
            this.map = map, this.text = text, this.latLng = latlng, this.className = css, this.div = null, this.setMap(map);
        }

        return Overlay.prototype = new google.maps.OverlayView,
            $.extend(Overlay.prototype, {
                onAdd: function () {
                    var div = document.createElement("div");
                    div.className = this.className, div.innerHTML = this.text,
                        div.style.position = "absolute", div.style.cursor = "default",
                        this.getPanes().overlayMouseTarget.appendChild(div), this.div = div
                },
                draw: function () {
                    var latlng = this.getProjection().fromLatLngToDivPixel(this.latLng);
                    this.div.style.left = latlng.x - 103 + "px", this.div.style.bottom = -(latlng.y - 30) + "px"
                },
                onRemove: function () {
                    this.div.parentNode.removeChild(this.div), this.div = null
                }
            }), Overlay;
    }

    function addMarker(mapobj, ioc) {
        var landmarkimg = new google.maps.MarkerImage(
            mapobj.imageUrl,
            new google.maps.Size(25, 33),
            new google.maps.Point(0, 0),
            new google.maps.Point(13, 33)
        );

        var landmarkshadow = new google.maps.MarkerImage(
            mapobj.shadowUrl,
            new google.maps.Size(25, 33),
            new google.maps.Point(0, 0),
            new google.maps.Point(13, 33)
        );
        var marker = new google.maps.Marker({
            id: mapobj.Keyid,
            position: loc,
            draggable: false,
            icon: landmarkimg,
            shadow: landmarkshadow,
            animation: google.maps.Animation.DROP,
            shape: shape,
            map: map
        });
        if (typeof google !== "undefined" && google.maps.MarkerImage !== undefined
            && !this.iconHover21 && !this.iconHover23 && !this.iconHover24 && !this.iconHover33) {
            this.iconHover21 = new google.maps.MarkerImage(
                "http://www.elongstatic.com/ihsearch/pic/map_flightOn.png?t=20112012",
                new google.maps.Size(32, 39),
                new google.maps.Point(0, 0),
                new google.maps.Point(13, 33)
            );
            this.iconHover23 = new google.maps.MarkerImage(
                "http://www.elongstatic.com/ihsearch/pic/map_trainOn.png?t=20112012",
                new google.maps.Size(32, 39),
                new google.maps.Point(0, 0),
                new google.maps.Point(13, 33)
            );
            this.iconHover24 = new google.maps.MarkerImage(
                "http://www.elongstatic.com/ihsearch/pic/map_subwayOn.png?t=20112012",
                new google.maps.Size(32, 39),
                new google.maps.Point(0, 0),
                new google.maps.Point(13, 33)
            );
            this.iconHover33 = new google.maps.MarkerImage(
                "http://www.elongstatic.com/ihsearch/pic/map_landmarkOn.png?t=20112012",
                new google.maps.Size(32, 39),
                new google.maps.Point(0, 0),
                new google.maps.Point(13, 33)
            );
        }
        var mouseoverIcon;
        switch (mapobj.Type) {
            case 21:
                mouseoverIcon = this.iconHover21;
                break;
            case 23:
                mouseoverIcon = this.iconHover23;
                break;
            case 24:
                mouseoverIcon = this.iconHover24;
                break;
            case 33:
                mouseoverIcon = this.iconHover33;
                break;

        }

        var contentString = mapobj.showUrl == "" ? "<div style=\"line-height:1.35;overflow:hidden;white-space:nowrap;\">" + mapobj.showname + "</br> 距酒店" + mapobj.distance + " 公里" : mapobj.showname + "</br> 距酒店" + mapobj.distance + " 公里</div>"; //"<a href=\"" + mapobj.showUrl + "\"  target=\"_blank\">" + mapobj.showname + "asdfasdasdfasdfasfasfsd</a>";
        google.maps.event.addListener(marker, 'mouseover', function () {
            // Calling the open method of the infoWindow
            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
            }
            infowindow.setContent(contentString);
            this.setIcon(mouseoverIcon);
            infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
            this.setIcon(landmarkimg);
        });
        markersArray.push(marker);
    }

    function togglemark(typeid, boolchecked) {
        for (var i in lanmarkcollection) {
            if (lanmarkcollection[i].Type == typeid) {
                var mapobj = lanmarkcollection[i];
                var poiLatLon = new google.maps.LatLng(mapobj.lat, mapobj.lng);
                if (boolchecked)
                    addMarker(mapobj, poiLatLon);
                else
                    delMarker(typeid);
                check_is_in_or_out();
            }
        }
    }

    //展示某家酒店
    function HotelMark() {
        //此处取得酒店图标
        var landmarkimg = new google.maps.MarkerImage(
            "http://www.elongstatic.com/Inthotels/pic/otherpot/otherpot_image.png?t=20112012",
            new google.maps.Size(39, 57),
            new google.maps.Point(0, 0),
            new google.maps.Point(13, 33)
        );
        var landmarkshadow = new google.maps.MarkerImage(
            "http://www.elongstatic.com/Inthotels/pic/otherpot/otherpot_shadow.png?t=20112012",
            new google.maps.Size(39, 57),
            new google.maps.Point(0, 0),
            new google.maps.Point(13, 33)
        );
        var marker = new google.maps.Marker({
            position: LatLng,
            icon: landmarkimg,
            shadow: landmarkshadow,
            zIndex: 8,
            cursor: "default",
            map: map
        });
        markersArray.push(marker);
        google.maps.event.addListener(marker, 'mouseover', function () {
            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
            }
            infowindow.setContent("<div style=\"line-height:1.35;overflow:hidden;white-space:nowrap;\">" + hotelName + "</br>&nbsp;&nbsp;&nbsp;</div>");
            infowindow.maxWidth = 200;
            infowindow.open(map, marker);
        });

    }

    //fit map
    function check_is_in_or_out() {
        var bounds = new google.maps.LatLngBounds();

        for (var i in markersArray) {
            bounds.extend(markersArray[i].getPosition());
        }
        // if only the hotel is selected
        if (markersArray.length == 1) {
            map.setCenter(LatLng);
            map.setZoom(15);
        } else {
            map.fitBounds(bounds);
        }
    }

    //删除点
    function delMarker(id) {
        var marker;
        for (var i in markersArray) {
            if (markersArray[i]['id'] == id) {
                marker = markersArray[i];
                markersArray.splice(i, 1);
                break;
            }
        }
        if (marker) {
            marker.setMap(null);
        }
    }

    //给Mark添加事件
    function MarkEvent() {
        $(landmark).bind("click", function () {
            if ("current" === this.className) {
                this.className = "";
                togglemark("23", true);
                return;
            }
            this.className = "current";
            togglemark("23", false);

        });
        $(traffic).bind("click", function () {
            if ("current" === this.className) {
                this.className = "";
                togglemark("24", true);
                return;
            }
            this.className = "current";
            togglemark("24", false);
        });
        $(other).bind("click", function () {
            if ("current" === this.className) {
                this.className = "";
                togglemark("33", true);
            }
            this.className = "current";
            togglemark("33", false);
        });
        $(fly).bind("click", function () {
            if ("current" === this.className) {
                this.className = "";
                togglemark("21", true);
            }
            this.className = "current";
            togglemark("21", false);
        });
    }

    //创建地标
    function CreateLandMark() {
        var p = {regionid: regionid, hotelid: hotelId};
        $.ajax("/landmark.html", {
            method: "post",
            context: p,
            escape: !1,
            async: !0,
            cache: !1,
            onsuccess: function (res) {
                var collection = res.success && res.value;
                if (collection && collection.length > 0) {
                    var width = 0;
                    //此处借助LINQ.JS来查找相应的东东
                    var a = document.createElement("div"),
                        landmarkdiv = document.createElement("div");
                    landmarkdiv.className = "landmark_box",
                        landmarkdiv.style.cssText = "position:absolute;top:10px;right:10px";
                    lanmarkcollection = collection;
                    if (Enumerable.from(lanmarkcollection)
                        .where("$.Type==21").any()) {
                        width += 100;
                        fly = document.createElement("a");
                        fly.setAttribute("TypeID", "21");
                        fly.href = "javascript:;";
                        fly.innerHTML = mapConfig.flyBtn;
                        landmarkdiv.appendChild(fly);
                    }
                    if (Enumerable.from(lanmarkcollection)
                        .where("$.Type==23").any()) {
                        width += 100;
                        landmark = document.createElement("a");
                        landmark.setAttribute("TypeID", "23");
                        landmark.href = "javascript:;";
                        landmark.innerHTML = mapConfig.landmarkBtn;
                        landmarkdiv.appendChild(landmark);
                    }
                    if (Enumerable.from(lanmarkcollection)
                        .where("$.Type==24").any()) {
                        width += 100;
                        traffic = document.createElement("a");
                        traffic.setAttribute("TypeID", "24");
                        traffic.href = "javascript:;";
                        traffic.innerHTML = mapConfig.trafficBtn;
                        landmarkdiv.appendChild(traffic);
                    }
                    if (Enumerable.from(lanmarkcollection)
                        .where("$.Type==33").any()) {
                        width += 100;
                        other = document.createElement("a");
                        other.setAttribute("TypeID", "33");
                        other.href = "javascript:;";
                        other.innerHTML = mapConfig.otherHotelBtn;
                        landmarkdiv.appendChild(other);
                    }
                    if (width > 0) {
                        a.appendChild(landmarkdiv),
                            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(a);
                        if (width < 400)
                            $(".landmark_box").css("width", width.toString());
                    }
                }
            }
        });
    }

    var regionid, hotelName, hotelId, LatLng, mapContent, map, landmark, traffic, other, cityId, fly, infowindow, lanmarkcollection = [], markersArray = [];
    return {
        init: function (Options) {
            var p = Options.position.split("|");
            hotelName = Options.name;
            hotelId = Options.id;
            LatLng = new google.maps.LatLng(p[0], p[1]);
            mapContent = document.getElementById("mapContent");
            initMap();
            CreateLandMark();
            HotelMark();
            MarkEvent();
            cityId = Options.cityid;

        }
    }
}();
//全局CONTAINER容器
var cQuery = {
    container: null
};
//扩展JQUERY方法
$.fn.extend({
    mask: function () {
        var e = this[0];
        if (!e)
            return  this;
        this.unmask();
        document.body.style.overflow = "hidden";
        var t = {};
        t.cssText = e.style.cssText,
            t.nextSibling = e.nextSibling,
            t.parentNode = e.parentNode,
            e.style.position = "absolute",
            e.style.display = "block",
            cQuery.container.append(e),
            e.style.left = (document.documentElement.scrollLeft || document.body.scrollLeft || 0) + Math.max(0, (document.documentElement.clientWidth - e.offsetWidth) / 2) + "px",
            e.style.top = (document.documentElement.scrollTop || document.body.scrollTop || 0) + Math.max(0, (document.documentElement.clientHeight - e.offsetHeight) / 2) + "px";
        var r = "background:#000;position:absolute;left:0;top:0;width:" + Math.max(document.documentElement.clientWidth, document.documentElement.scrollWidth, document.body.clientWidth, document.body.scrollWidth) + "px;height:" + Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight) + "px;";
        return t.maskDiv = document.createElement("div"), t.maskDiv.style.cssText = r + "filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;", $(t.maskDiv).insertBefore(e), jQuery.support.leadingWhitespace && (t.maskIframe = document.createElement("iframe"), t.maskIframe.style.cssText = r + "filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);opacity:0;", $(t.maskIframe).insertBefore(t.maskDiv)), this.data("__mask__", t), this
    },
    unmask: function () {
        var e = this[0];
        if (!e)
            return  this;
        if (cQuery.container != null && cQuery.container.children().length > 0) {
            $(cQuery.container.children()[1]).css('display', 'none').appendTo('body');
            $(cQuery.container.children()[0]).remove();
        }
        document.body.style.overflow = "auto";
    }
});

var mapConfig = {
    landmarkBtn: "<i class=\"icon_Bus\"></i>车站",
    trafficBtn: "<i class=\"icon_Train\"></i>地铁",
    otherHotelBtn: "<i class=\"icon_Mark\"></i>景点",
    flyBtn: "<i class=\"icon_Fly\"></i>机场"
};
function showMapPop(a) {
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    var maxclientWidth = Math.max(clientWidth - 170, 600);
    var maxclientHeight = Math.max(clientHeight - 170, 400);
    var popMapdom = document.getElementById("popMap");
    popMapdom.style.width = maxclientWidth + "px";
    var mapContentdom = document.getElementById("mapContent");
    mapContentdom.style.height = maxclientHeight + "px";
    $(popMapdom).mask();
    MapPop.init(a);
    $("#delMap").bind("click", function () {
        $(popMapdom).unmask();
    });
}
$(document).ready(function () {
    var e = document.createElement("container");
    e.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;z-index:100;";
    var t = document.body;
    t || document.write('<span id="__body__" style="display:none;">cQuery</span>'), t = document.body.firstChild, (t ? document.body.insertBefore(e, t) : document.body.appendChild(e)), t = document.getElementById("__body__"), t && t.parentNode.removeChild(t), cQuery.container = $(e)
    $('body').append("<div class=\"map_pop\" id=\"popMap\" style=\"width: 1249px; display: none;\"><a id=\"delMap\" href=\"javascript:void(0);\" class=\"delete\">×</a> <div class=\"map_content\" id=\"mapContent\"></div></div>");
});