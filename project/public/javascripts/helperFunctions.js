var helperFunctions;
(function (helperFunctions) {
    function addDDLValue(ddlID, ID, Text) {
        $('#' + ddlID).append($('<option></option>').val(ID).html(Text));
    }
    helperFunctions.addDDLValue = addDDLValue;
})(helperFunctions || (helperFunctions = {}));
