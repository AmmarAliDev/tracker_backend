"use strict";

var express = require('express');
var cors = require('cors');
var vehicleRoutes = require('./routes/vehicleRoutes');
var dbConnect = require('./config/db') / dbConnect();
var app = express();

// Request logging middleware
app.use(function (req, res, next) {
  console.log("".concat(req.method, " ").concat(req.url));
  next();
});
app.use(express.json());
app.use(cors({
  origin: 'https://location-frontend-three.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Server Error',
    error: err.message
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});