var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes/index');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var gm = require('googlemaps');
gm.config({key: 'AIzaSyDIUHVyHjABaBnF2h2yROpJCroqRSzZFXg'})

var empList = [
		{"Type": "E", "ID": "Dan", "lat": 40.121593, "lng": -74.045063, "Img": "Images/Dan.png"},
		{"Type": "E", "ID": "Gene", "lat": 40.102994, "lng": -74.087052, "Img": "Images/Gene.png"},
		{"Type": "E", "ID": "Greg", "lat": 40.7008537, "lng": -74.7882376, "Img": "Images/Greg.png"},
		{"Type": "E", "ID": "Michael", "lat": 39.9770511, "lng": -74.3671074, "Img": "Images/Michael.png"}
	];
	
var jobList = [
		{"Type": "J", "ID": "J1", "lat": 40.68, "lng": -74.33, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J2", "lat": 40.20, "lng": -74.56, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J3", "lat": 40.99, "lng": -74.46, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J4", "lat": 40.13, "lng": -74.09, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J5", "lat": 40.25, "lng": -74.36, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J6", "lat": 39.95, "lng": -74.46, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J7", "lat": 40.79, "lng": -74.40, "Img": "Images/Indicator_Job.png"},
		{"Type": "J", "ID": "J8", "lat": 39.99, "lng": -74.13, "Img": "Images/Indicator_Job.png"}
	];
	
var businessList = [
		{"Type": "B", "ID": "AJ", "lat": 40.652632, "lng": -74.282895, "Img": "Images/office.png"},
		{"Type": "B", "ID": "WestSide", "lat": 40.692773, "lng": -74.22739, "Img": "Images/WestSide.png"}
	];
	
var markerList = [];
function setMarkerList(){
	for(var i=0; i < empList.length; i++)
		markerList.push(empList[i]);
	
	for(var i=0; i < jobList.length; i++)
		markerList.push(jobList[i]);
		
	for(var i=0; i < businessList.length; i++)
		markerList.push(businessList[i]);
}
setMarkerList();

io.on('connection', function(socket){
	var cHead = socket.handshake.headers;
	var pageAccessed = cHead.referer.split(cHead.host)[1];
	
	//Switch for what to load on the connection of a page
	switch(pageAccessed){
		case '/':
			io.emit('loadInitialMap', markerList);
		
			socket.on('moveMarker', function(){
				console.log('go');
				markerList[2].lat = markerList[2].lat + 0.001;
				io.emit('loadUsersPosition', markerList[2].ID, markerList[2].lat, markerList[2].lng);
			});
			break;
		case '/Admin/Employees':
			socket.on('adminEmpPageAccessed', function(){
				io.emit('passEmpInfo', empList);
			});
			break;
		case '/Admin/Jobs':
			socket.on('adminJobPageAccessed', function(){
				io.emit('passJobInfo', jobList);
			});
			break;
		case '/Admin/Businesses':
			socket.on('adminBusinessPageAccessed', function(){
				io.emit('passBusinessInfo', businessList);
			});
			break;
	}
});
server.listen(3000);
console.log('server connected');

//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.use(function(req, res, next) {
	console.log(req);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;