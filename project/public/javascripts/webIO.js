///<reference path='typings/jquery.d.ts' />
///<reference path='typings/google.maps.d.ts' />
///<reference path='typings/knockout.d.ts' />
///<reference path='typings/socket.io.d.ts' />
var webIO;
(function (webIO) {
    webIO.socket = io(), webIO.map = null, webIO.markers = [], webIO.infoWindow, webIO.mapZoomDefault = 9, webIO.mapCenterDefault = new google.maps.LatLng(40.65, -74.28);

    webIO.socket.on('loadInitialMap', function (markerList) {
        webIO.map = new google.maps.Map(document.getElementById("trackingMap"), {
            center: webIO.mapCenterDefault,
            zoom: webIO.mapZoomDefault,
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

        $.each(markerList, function (i, obj) {
            webIO.markers.push(new google.maps.Marker({
                id: obj.ID,
                position: new google.maps.LatLng(obj.lat, obj.lng),
                map: webIO.map,
                html: '<div><table><tr><td>Name:</td><td>' + obj.name + '</td>' + '<td>Address:</td><td>' + obj.add + '</td>' + '<td>Phone #:</td><td>' + obj.phoneNum + '</td></tr></table></div>',
                icon: obj.img
            }));

            switch (obj.ID.charAt(0)) {
                case 'E':
                    helperFunctions.addDDLValue('ddlEmployees', obj.ID, obj.name);
                    break;
                case 'J':
                    helperFunctions.addDDLValue('ddlJobs', obj.ID, obj.name);
                    break;
                case 'B':
                    helperFunctions.addDDLValue('ddlBusinesses', obj.ID, obj.name);
                    break;
            }

            webIO.infoWindow = new google.maps.InfoWindow({
                content: 'blank'
            });

            google.maps.event.addListener(obj, 'click', function () {
                webIO.infoWindow.markerID = this.id;
                webIO.infoWindow.setContent(this.html);
                webIO.infoWindow.open(webIO.map, this);
            });
        });
        google.maps.event.addDomListener(window, 'load', null);
    });

    webIO.socket.on('loadUsersPosition', function (empID, lat, lng) {
        $.each(webIO.markers, function (i, obj) {
            if (obj.id == empID) {
                obj.setPosition(new google.maps.LatLng(lat, lng));
                return false;
            }
        });
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
