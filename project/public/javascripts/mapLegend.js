function test(){
	setTimeout (function() {
		socket.emit('moveMarker');
		test();
	}, 3000);
}

function ToggleMarkers(markerType){
	for(var i = 0; i < markers.length; i++){
		if (markers[i].type == markerType){
			//if the box is checked set visible
			if ($(event.target).is(':checked'))
				markers[i].setVisible(true);
			else{
				markers[i].setVisible(false);
				if(infoWindow.markerID == markers[i].id)
					infoWindow.close();
			}
		}
	}
}