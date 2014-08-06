module helperFunctions {
	export function addDDLValue(ddlID: string, ID: string, Text: string){
		$('#' + ddlID).append($('<option></option>').val(ID).html(Text));
	}
}