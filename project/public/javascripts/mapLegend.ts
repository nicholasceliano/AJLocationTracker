module mapLegend {
	export function test(){
		setTimeout (function() {
			webIO.socket.emit('moveMarker');
			test();
		}, 3000);
	}

	export function ToggleMarkers(markerType: string){
		$.each(webIO.markers, function(i, obj){
			if(obj.id.indexOf(markerType) >= 0){
				if ($(event.target).is(':checked'))
						obj.setVisible(true);
				else{
					obj.setVisible(false);
					if(webIO.infoWindow.markerID == obj.id)
						webIO.infoWindow.close();
				}
			}
		});
	}
}