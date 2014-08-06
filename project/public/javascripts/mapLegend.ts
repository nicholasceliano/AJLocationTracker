module mapLegend {
	export function test(){
		setTimeout (function() {
			webIO.socket.emit('moveMarker');
			GetSelectedMaker();
			test();
		}, 3000);
	}

	export function ToggleMarkers(type: string){
		var chkBox: HTMLElement = <HTMLElement>event.target;
		$.each(webIO.markers, function(i, obj){
			if(obj.id.indexOf(type) >= 0){
				if ($(chkBox).is(':checked')){
						$('#' + chkBox.id.replace('chk', 'ddl')).show();
						obj.setVisible(true);
				}
				else{
					obj.setVisible(false);
					$('#' + chkBox.id.replace('chk', 'ddl')).hide();
					if(webIO.infoWindow.markerID == obj.id)
						webIO.infoWindow.close();
				}
			}
		});
	}
	
	export function FocusMapSelection(){
		var ddl: HTMLElement = <HTMLElement>event.target;
		if ($(ddl).val() == '0'){
			webIO.map.setCenter(webIO.mapCenterDefault);
			webIO.map.setZoom(webIO.mapZoomDefault);
		} else {
			//set other ddl's to 0
			switch(ddl.id) {
				case 'ddlEmployees':
					$('#ddlJobs').val('0');
					$('#ddlBusinesses').val('0');
				break;
				case 'ddlJobs':
					$('#ddlEmployees').val('0');
					$('#ddlBusinesses').val('0');
				break;
				case 'ddlBusinesses':			
					$('#ddlEmployees').val('0');
					$('#ddlJobs').val('0');
				break;
			}
		
			ZoomOnMarker($(ddl).val());	
		}
	}
	
	function GetSelectedMaker(){
		var empVal: string = $('#ddlEmployees').val(),
			jobVal: string = $('#ddlJobs').val(),
			busVal: string = $('#ddlBusinesses').val();
	
		if (empVal !== '0')
			ZoomOnMarker(empVal);
		else if (jobVal !== '0') 
			ZoomOnMarker(jobVal);
		else if (busVal !== '0') 
			ZoomOnMarker(busVal);
	}
	
	function ZoomOnMarker(ddlVal:string){
		$.each(webIO.markers, function(i,obj){
			if (obj.id == ddlVal){
				webIO.map.setCenter(obj.position);
				webIO.map.setZoom(12);
				return false;
			}
		});
	}
}