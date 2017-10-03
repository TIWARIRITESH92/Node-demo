'use strict'
var express = require('express'),
app = express(),
config = {};

var env = app.get('env');
/**** set global configuration variable here ***/
if(env == 'development'){
	config = require('./config/development');
}else{
	config = require('./config/production');
}

module.exports = config;