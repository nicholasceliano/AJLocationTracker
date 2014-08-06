var mapLegend;
(function (mapLegend) {
    function test() {
        setTimeout(function () {
            webIO.socket.emit('moveMarker');
            test();
        }, 3000);
    }
    mapLegend.test = test;

    function ToggleMarkers(markerType) {
        $.each(webIO.markers, function (i, obj) {
            if (obj.id.indexOf(markerType) >= 0) {
                if ($(event.target).is(':checked'))
                    obj.setVisible(true);
                else {
                    obj.setVisible(false);
                    if (webIO.infoWindow.markerID == obj.id)
                        webIO.infoWindow.close();
                }
            }
        });
    }
    mapLegend.ToggleMarkers = ToggleMarkers;
})(mapLegend || (mapLegend = {}));
