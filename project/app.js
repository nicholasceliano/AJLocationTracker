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

//AddedBy Me

var buildingList = [
		{"ID": "AJ", "lat": 40.652632, "lng": -74.282895, "Img": "Images/office.png"},
		{"ID": "WestSide", "lat": 40.692773, "lng": -74.22739, "Img": "Images/WestSide.png"}
	];
	
var empList = [
		{"ID": "Dan", "lat": 40.121593, "lng": -74.045063, "Img": "Images/Dan.png"},
		{"ID": "Gene", "lat": 40.102994, "lng": -74.087052, "Img": "Images/Gene.png"},
		{"ID": "Greg", "lat": 40.7008537, "lng": -74.7882376, "Img": "Images/Greg.png"},
		{"ID": "Michael", "lat": 39.9770511, "lng": -74.3671074, "Img": "Images/Michael.png"}
	];

io.on('connection', function(socket){
	console.log('connected');
	io.emit('loadInitialMap', buildingList, empList);
	
	socket.on('chat message', function(msg){
		empList[0].lat = empList[0].lat + 0.001;
		io.emit('loadUsersPosition', empList[0].ID, empList[0].lat + .001, empList[0].lng);
	});
});
server.listen(3000);

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