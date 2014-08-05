var jsdom = require("jsdom"); 
var $: JQueryStatic = require("jquery")(jsdom.jsdom().createWindow()); 

module sLoadData {
	
	//Load Table Calls
	export function EmpDataLoad(){
		return require('../DummyData/empData.json');
	}
	export function JobDataLoad(){
		return require('../DummyData/jobData.json');
	}
	export function BusinessDataLoad(){
		return require('../DummyData/businessData.json');
	}
	
	export function BuildMarkerList(empData, jobData, businessData){
		var markerList = Array<MarkerList>();
		
		$.each(empData, function(i, obj){
			var list = new MarkerList()
			list.ID = obj.ID,
			list.lat = obj.lat,
			list.lng = obj.lng,
			list.img = obj.img,
			list.name = obj.fName + " " + obj.lName,
			list.add = obj.add,
			list.phoneNum = obj.phoneNum
			markerList.push(list);	
		});	
		
		$.each(jobData, function(i, obj){	
			var list = new MarkerList()
			list.ID = obj.ID,
			list.lat = obj.lat,
			list.lng = obj.lng,
			list.img = obj.img,
			list.name = obj.name,
			list.add = obj.add,
			list.phoneNum = obj.phoneNum
			markerList.push(list);				
		});
		
		$.each(businessData, function(i, obj){
			var list = new MarkerList()
			list.ID = obj.ID,
			list.lat = obj.lat,
			list.lng = obj.lng,
			list.img = obj.img,
			list.name = obj.name,
			list.add = obj.add,
			list.phoneNum = obj.phoneNum
			markerList.push(list);	
		});
		
		return markerList
	}
	
	export class MarkerList{
		public ID: string;
		public lat: number;
		public lng: number;
		public img: string;
		public name: string;
		public add: string;
		public phoneNum: string;		
	}
}

module.exports = sLoadData;