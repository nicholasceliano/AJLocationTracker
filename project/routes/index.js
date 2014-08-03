var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tracking Map - Field Status Tracker' });
});
router.get('/Admin/Employees', function(req, res) {
  res.render('adminEmployees', { title: 'Employees - Field Status Trackers' });
});
router.get('/Admin/Jobs', function(req, res) {
  res.render('adminJobs', { title: 'Jobs - Field Status Trackers' });
});
router.get('/Admin/Businesses', function(req, res) {
  res.render('adminBusinesses', { title: 'Businesses - Field Status Trackers' });
});
router.get('/Admin/Settings', function(req, res) {
  res.render('adminSettings', { title: 'Settings - Field Status Trackers' });
});

module.exports = router;