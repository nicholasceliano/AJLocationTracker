var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var lat = 40.6926501;
//AddedBy Me
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){
	console.log('connected');
	var officeLat = 40.652632,
		officeLong = -74.282895;	
	io.emit('loadInitialMap', officeLat, officeLong);
	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		
		lat = lat + 0.001;
		
		io.emit('loadUsersPosition', 'Mel', lat, -74.2273751,17);
	});
});
server.listen(3000);

var gm = require('googlemaps');
var util = require('util');
gm.config({key: 'AIzaSyDIUHVyHjABaBnF2h2yROpJCroqRSzZFXg'})

//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


//Added by me

gm.reverseGeocode('41.850033,-87.6500523', function(err, data){
	var lat = data.results[0].geometry.location.lat;
	var lng = data.results[0].geometry.location.lng;
	console.log(lat + ", "  + lng);
	io.emit('disconnect', 'testzzz');
	
});

gm.reverseGeocode(gm.checkAndConvertPoint([41.850033, -87.6500523]), function(err, data){


});


//





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