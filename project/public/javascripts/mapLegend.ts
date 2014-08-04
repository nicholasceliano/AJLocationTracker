module mapLegend {
	export function test(){
		setTimeout (function() {
			webIO.socket.emit('moveMarker');
			test();
		}, 3000);
	}

	export function ToggleMarkers(markerType: any){
		var mrkrs = webIO.markers;
		for(var i = 0; i < mrkrs.length; i++){
			if (mrkrs[i].type == markerType){
				//if the box is checked set visible
				if ($(event.target).is(':checked'))
					mrkrs[i].setVisible(true);
				else{
					mrkrs[i].setVisible(false);
					if(webIO.infoWindow.markerID == mrkrs[i].id)
						webIO.infoWindow.close();
				}
			}
		}
	}
}