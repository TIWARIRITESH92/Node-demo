'use strict'
var express = require("express"),
        app = express(),
        adminUserModel = require('../../models/admin/user'),
        pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        async = require('async');


exports.showDashboard = function (req, res, next) {
    res.render("./admin/dashboard.html");
}