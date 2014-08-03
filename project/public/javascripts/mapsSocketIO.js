var socket = io();
var map = null;
var markers = [];

socket.on('loadInitialMap', function(buildingList, empList){
	var mapProp = {
		center: new google.maps.LatLng(40.65, -74.28),
		zoom:9,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById("trackingMap") ,mapProp);
	
	new google.maps.Polygon({
                paths: NJ,
				strokeColor: '#006aa9',
				strokeOpacity: 0.5,
				strokeWeight: 5,
				map:map,
                fillOpacity: 0
            });
            
	
	for(var i = 0; i < buildingList.length; i++){
		markers.push(new google.maps.Marker({
			id: buildingList[i].ID,
			position: new google.maps.LatLng(buildingList[i].lat, buildingList[i].lng),
			icon: buildingList[i].Img
		}));
	}
	
	for(var a = 0; a < empList.length; a++){
		markers.push(new google.maps.Marker({
			id: empList[a].ID,
			position: new google.maps.LatLng(empList[a].lat, empList[a].lng),
			icon: empList[a].Img
		}));
	}
	
	setAllMarkers();
	google.maps.event.addDomListener(window, 'load');
});

socket.on('loadUsersPosition', function(empID, lat, lng){
	
	for (var i = 0; i < markers.length; i++){
		if(markers[i].id == empID){
			markers[i].position = new google.maps.LatLng(lat, lng);
			setAllMarkers();
			return;
		}
	}
	
	//Only if user wasn't Found
	markers.push(new google.maps.Marker({
		id: empID,
		position: new google.maps.LatLng(lat, lng),
		icon: 'images/westside.png'}));
		
	setAllMarkers();
});

function setAllMarkers(){
	for (var i = 0; i < markers.length; i++){
		markers[i].setMap(map);
	}
}

function test(){
	setTimeout (function() {
		socket.emit('chat message', 'zzz');
		test();
	}, 3000);
}