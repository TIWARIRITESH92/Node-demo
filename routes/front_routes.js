'use strict'
var express = require('express'),
        csrf = require('csurf'),
        dotenv = require("dotenv").config(),
        loginController = require('../app/Controllers/loginController'),
        userDashboardController = require('../app/Controllers/user/dashboardController'),
        profileController = require('../app/Controllers/user/profileController'),
        userCreditController = require('../app/Controllers/user/userCreditController'),
        router = express.Router();
/** Front all routing will be listed here ***/

router.get("/", loginAuthentication, function (req, res) {
    res.render('user/user_login.html');
});

router.post("/userLogIn", loginController.userLogin);

router.get("/user/dashboard", authenticateUser, userDashboardController.showDashboard);

router.get('/logout', loginController.userLogOut);

router.get('/user/addUserCredit', authenticateUser,userCreditController.addUserCredit);

router.post('/user/insertUserCredit', authenticateUser,userCreditController.insertUserCredit);

router.get('/user/transactionList', authenticateUser,userCreditController.transactionList);

router.post('/user/transactionList', authenticateUser,userCreditController.transactionList);

router.get('/user/profile', authenticateUser,profileController.profile);

/*** Create middleware for admin authentication ***/
function loginAuthentication(req, res, next) {
    if (req.session && req.session.user_login) {
        res.redirect('/user/dashboard');
    } else {
        next();
    }
}


function authenticateUser(req, res, next) {
    if (req.session && req.session.user_login) {
        if (req.url == '/') {
            res.redirect('/user/dashboard');
        } else {
            next();
        }

    } else {
        res.redirect('/');
    }
}

module.exports = router;