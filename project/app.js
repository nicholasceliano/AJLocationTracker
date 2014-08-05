///<reference path='public/javascripts/typings/node.d.ts' />
///<reference path='public/javascripts/typings/jquery.d.ts' />
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes/index');
var server = require('http').Server(app);
var sIO = require('socket.io')(server);
var jsdom = require("jsdom");
var $ = require("jquery")(jsdom.jsdom().createWindow());
var gm = require('googlemaps');
gm.config({ key: 'AIzaSyDIUHVyHjABaBnF2h2yROpJCroqRSzZFXg' });
var loadData = require('./serverCode/sLoadData');

var empList = loadData.EmpDataLoad();
var jobList = loadData.JobDataLoad();
var businessList = loadData.BusinessDataLoad();

console.log(empList);

var sMain;
(function (sMain) {
    sIO.on('connection', function (socket) {
        var cHead = socket.handshake.headers;
        var pageAccessed = cHead.referer.split(cHead.host)[1];

        switch (pageAccessed) {
            case '/':
                var markerList = loadData.BuildMarkerList(empList, jobList, businessList);

                sIO.emit('loadInitialMap', markerList);

                socket.on('moveMarker', function () {
                    markerList[0].lat = markerList[0].lat + 0.005;
                    sIO.emit('loadUsersPosition', markerList[0].ID, markerList[0].lat, markerList[0].lng);
                });
                break;
            case '/Admin/Employees':
                socket.on('adminEmpPageAccessed', function () {
                    sIO.emit('passEmpInfo', empList);
                });
                break;
            case '/Admin/Jobs':
                socket.on('adminJobPageAccessed', function () {
                    sIO.emit('passJobInfo', jobList);
                });
                break;
            case '/Admin/Businesses':
                socket.on('adminBusinessPageAccessed', function () {
                    sIO.emit('passBusinessInfo', businessList);
                });
                break;
        }
    });
    server.listen(3000);

    console.log('server connected');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', routes);

    app.use(function (req, res, next) {
        console.log(req);
        var err = new Error('Not Found - 404');
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;
})(sMain || (sMain = {}));
