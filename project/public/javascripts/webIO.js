///<reference path='typings/jquery.d.ts' />
///<reference path='typings/google.maps.d.ts' />
///<reference path='typings/knockout.d.ts' />
///<reference path='typings/socket.io.d.ts' />
var webIO;
(function (webIO) {
    webIO.socket = io(), webIO.map = null, webIO.markers = [], webIO.infoWindow;

    webIO.socket.on('loadInitialMap', function (markerList) {
        webIO.map = new google.maps.Map(document.getElementById("trackingMap"), {
            center: new google.maps.LatLng(40.65, -74.28),
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        new google.maps.Polygon({
            paths: NJ,
            strokeColor: '#006aa9',
            strokeOpacity: 0.5,
            strokeWeight: 5,
            map: webIO.map,
            fillOpacity: 0
        });

        for (var i = 0; i < markerList.length; i++) {
            webIO.markers.push(new google.maps.Marker({
                id: markerList[i].ID,
                position: new google.maps.LatLng(markerList[i].lat, markerList[i].lng),
                map: webIO.map,
                html: '<div><table><tr><td>Name:</td><td>' + markerList[i].name + '</td>' + '<td>Address:</td><td>' + markerList[i].add + '</td>' + '<td>Phone #:</td><td>' + markerList[i].phoneNum + '</td></tr></table></div>',
                icon: markerList[i].img
            }));

            webIO.infoWindow = new google.maps.InfoWindow({
                content: 'blank'
            });

            google.maps.event.addListener(webIO.markers[i], 'click', function () {
                webIO.infoWindow.markerID = this.id;
                webIO.infoWindow.setContent(this.html);
                webIO.infoWindow.open(webIO.map, this);
            });
        }
        google.maps.event.addDomListener(window, 'load', null);
    });

    webIO.socket.on('loadUsersPosition', function (empID, lat, lng) {
        for (var i = 0; i < webIO.markers.length; i++) {
            if (webIO.markers[i].id == empID) {
                webIO.markers[i].setPosition(new google.maps.LatLng(lat, lng));
                return;
            }
        }

        //Only if user wasn't Found
        webIO.markers.push(new google.maps.Marker({
            id: empID,
            position: new google.maps.LatLng(lat, lng),
            map: webIO.map,
            icon: 'images/westside.png' }));
    });

    webIO.socket.on('passEmpInfo', function (empList) {
        function viewModel() {
            var self = this;
            self.emps = empList;
        }
        ko.applyBindings(new viewModel());
    });

    webIO.socket.on('passJobInfo', function (jobList) {
        function viewModel() {
            var self = this;
            self.jobs = jobList;
        }
        ko.applyBindings(new viewModel());
    });

    webIO.socket.on('passBusinessInfo', function (businessList) {
        function viewModel() {
            var self = this;
            self.businesses = businessList;
        }
        ko.applyBindings(new viewModel());
    });
})(webIO || (webIO = {}));
