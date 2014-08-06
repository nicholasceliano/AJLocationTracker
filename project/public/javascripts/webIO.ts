///<reference path='typings/jquery.d.ts' />
///<reference path='typings/google.maps.d.ts' />
///<reference path='typings/knockout.d.ts' />
///<reference path='typings/socket.io.d.ts' />

module webIO {
	export var socket = io(),
		map = null,
		markers = [],
		infoWindow,
		mapZoomDefault = 9,
		mapCenterDefault = new google.maps.LatLng(40.65, -74.28);

	socket.on('loadInitialMap', function(markerList){
		map=new google.maps.Map(document.getElementById("trackingMap") ,{
			center: mapCenterDefault,
			zoom:mapZoomDefault,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		});
		
		new google.maps.Polygon({
					paths: NJ,
					strokeColor: '#006aa9',
					strokeOpacity: 0.5,
					strokeWeight: 5,
					map:map,
					fillOpacity: 0
				});
				
		$.each(markerList, function(i, obj){
			markers.push(new google.maps.Marker({
				id: obj.ID,
				position: new google.maps.LatLng(obj.lat, obj.lng),
				map:map,
				html: '<div><table><tr><td>Name:</td><td>' + obj.name + '</td>' +
										'<td>Address:</td><td>' + obj.add +'</td>' +
										'<td>Phone #:</td><td>' + obj.phoneNum +'</td></tr></table></div>',
				icon: obj.img
			}));
			
			//Populate DropDownList Values
			switch (obj.ID.charAt(0)) {
				case 'E':
					helperFunctions.addDDLValue('ddlEmployees', obj.ID,obj.name);
				break;
				case 'J':
					helperFunctions.addDDLValue('ddlJobs', obj.ID,obj.name);
				break;
				case 'B':
					helperFunctions.addDDLValue('ddlBusinesses', obj.ID,obj.name);
				break;
			}
			
			infoWindow = new google.maps.InfoWindow({
				content: 'blank'
			});
			
			google.maps.event.addListener(obj, 'click', function() {
				infoWindow.markerID = this.id;
				infoWindow.setContent(this.html);
				infoWindow.open(map, this);
			});
		});
		google.maps.event.addDomListener(window, 'load', null);
	});

	socket.on('loadUsersPosition', function(empID, lat, lng){
		$.each(markers, function(i, obj) {
			if(obj.id == empID){		
				obj.setPosition(new google.maps.LatLng(lat, lng));
				return false;
			}
		});
	});

	socket.on('passEmpInfo', function(empList){
		function viewModel() {
			var self = this;
			self.emps = empList;
		}
		ko.applyBindings(new viewModel());
	});

	socket.on('passJobInfo', function(jobList){
		function viewModel() {
			var self = this;
			self.jobs = jobList;
		}
		ko.applyBindings(new viewModel());
	});

	socket.on('passBusinessInfo', function(businessList){
		function viewModel() {
			var self = this;
			self.businesses = businessList;
		}
		ko.applyBindings(new viewModel());
	});
}