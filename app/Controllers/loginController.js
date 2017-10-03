'use strict'
var express = require("express"),
        app = express(),
        userValidate = require('../lib/validate/userValidate'),
        adminUserModel = require('../models/admin/user'),
        userModel = require('../models/user/user'),
        pool = require('../../config/config/connection'),
        bcrypt = require('bcrypt'),
        async = require('async'),
        saltRounds = 10,
        query;

/*** Login for admin start here ***/
exports.userLogin = function (req, res, next) {
    async.waterfall([
        function (callback) {
            req.checkBody(userValidate.userValidate());
            req.getValidationResult().then(result => {
                var errors = result.array();
                if (errors && errors.length > 0) {
                    res.render('user/user_login.html', {errors: errors, param: req.body});
                } else {
                    req.body.email = req.body.email.toLowerCase();
                    callback(null);
                }
            });
        },
        function (callback) {
            userModel.userCredentialCheck(req.body, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    if (result.rowCount > 0) {
                        /*** password check ****/
                        var userData = JSON.parse(JSON.stringify(result.rows));
                        if (bcrypt.compareSync(req.body.password, userData[0].password)) {
                            callback(null, userData);
                        } else {
                            res.render('user/user_login.html', {invalid_credential: 'Invalid credential', param: req.body});
                        }
                    } else {
                        res.render('user/user_login.html', {invalid_credential: 'Invalid credential', param: req.body});
                    }
                }
            });
        },
        function (result, callback) {
            /*** Set session variable ***/
            req.session.user_login = true;
            req.session.user = result[0];
            callback(null, result);
        }
    ], function (err, result) {
        if (err) {
            res.send({status: 500, message: err.message});
        } else {
            res.redirect('/user/dashboard');
        }
    });

};

/*** Login for admin start here ***/
exports.adminLogin = function (req, res, next) {
    async.waterfall([
        function (callback) {
            req.checkBody(userValidate.userValidate());
            req.getValidationResult().then(result => {
                var errors = result.array();
                if (errors && errors.length > 0) {
                    res.render('admin/admin_login.html', {errors: errors, param: req.body});
                } else {
                    req.body.email = req.body.email.toLowerCase();
                    callback(null);
                }
            });
        },
        function (callback) {
            adminUserModel.userCredentialCheck(req.body, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    if (result.rowCount > 0) {
                        /*** password check ****/
                        var userData = JSON.parse(JSON.stringify(result.rows));
                        if (bcrypt.compareSync(req.body.password, userData[0].password)) {
                            callback(null, userData);
                        } else {
                            res.render('admin/admin_login.html', {invalid_credential: 'Please enter valid password', param: req.body});
                        }
                    } else {
                        res.render('admin/admin_login.html', {invalid_credential: 'Invalid credential', param: req.body});
                    }
                }
            });
        },
        function (result, callback) {
            /*** Set session variable ***/
            req.session.admin_login = true;
            req.session.admin_id = result[0].id;
            callback(null, result);
        }
    ], function (err, result) {
        if (err) {
            res.send({status: 500, message: err.message});
        } else {
            res.redirect('/admin/dashboard');
        }
    });
};

/*** Logout admin ***/
exports.adminLogOut = function (req, res, next) {
    if (req.session && req.session.admin_login) {
        delete req.session.admin_login;
        delete req.session.admin_id;
        res.redirect('/admin');
    } else {
        res.redirect('/admin');
    }
};

/*** Logout user ***/
exports.userLogOut = function (req, res, next) {
    if (req.session && req.session.user_login) {
        delete req.session.user_login;
        delete req.session.user;
        res.redirect('/');
    } else {
        res.redirect('/');
    }
};