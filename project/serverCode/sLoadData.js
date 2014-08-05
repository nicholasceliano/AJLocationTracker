var jsdom = require("jsdom");
var $ = require("jquery")(jsdom.jsdom().createWindow());

var sLoadData;
(function (sLoadData) {
    //Load Table Calls
    function EmpDataLoad() {
        return require('../DummyData/empData.json');
    }
    sLoadData.EmpDataLoad = EmpDataLoad;
    function JobDataLoad() {
        return require('../DummyData/jobData.json');
    }
    sLoadData.JobDataLoad = JobDataLoad;
    function BusinessDataLoad() {
        return require('../DummyData/businessData.json');
    }
    sLoadData.BusinessDataLoad = BusinessDataLoad;

    function BuildMarkerList(empData, jobData, businessData) {
        var markerList = Array();

        $.each(empData, function (i, obj) {
            var list = new MarkerList();
            list.ID = obj.ID, list.lat = obj.lat, list.lng = obj.lng, list.img = obj.img, list.name = obj.fName + " " + obj.lName, list.add = obj.add, list.phoneNum = obj.phoneNum;
            markerList.push(list);
        });

        $.each(jobData, function (i, obj) {
            var list = new MarkerList();
            list.ID = obj.ID, list.lat = obj.lat, list.lng = obj.lng, list.img = obj.img, list.name = obj.name, list.add = obj.add, list.phoneNum = obj.phoneNum;
            markerList.push(list);
        });

        $.each(businessData, function (i, obj) {
            var list = new MarkerList();
            list.ID = obj.ID, list.lat = obj.lat, list.lng = obj.lng, list.img = obj.img, list.name = obj.name, list.add = obj.add, list.phoneNum = obj.phoneNum;
            markerList.push(list);
        });

        return markerList;
    }
    sLoadData.BuildMarkerList = BuildMarkerList;

    var MarkerList = (function () {
        function MarkerList() {
        }
        return MarkerList;
    })();
    sLoadData.MarkerList = MarkerList;
})(sLoadData || (sLoadData = {}));

module.exports = sLoadData;
