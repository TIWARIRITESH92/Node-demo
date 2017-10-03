'use strict'
var express = require('express'),
        csrf = require('csurf'),
        loginController = require('../app/Controllers/loginController'),
        dashboardController = require('../app/Controllers/admin/dashboardController'),
        userController = require('../app/Controllers/admin/userController'),
        router = express.Router();
/** Front all routing will be listed here ***/

router.get("/", loginAuthentication, function (req, res, next) {
    res.render('admin/admin_login.html');
});

router.post("/", loginController.adminLogin);

router.get('/logout', loginController.adminLogOut);

router.get("/dashboard", authenticateAdmin, dashboardController.showDashboard);

router.get('/userlist', /*authenticateAdmin,*/userController.userlist);

router.get('/adduser', /*authenticateAdmin,*/userController.adduser);

router.post('/adduserDetail', /*authenticateAdmin,*/userController.adduserDetail);

router.get('/editUser/:id', /*authenticateAdmin,*/userController.editUser);

router.post('/updateuserDetail', /*authenticateAdmin,*/userController.updateUser);

router.get('/user/')


/*** Create middleware for admin authentication ***/
function loginAuthentication(req, res, next) {
    if (req.session && req.session.admin_login) {
        res.redirect('/admin/dashboard');
    } else {
        next();
    }
}


function authenticateAdmin(req, res, next) {
    if (req.session && req.session.admin_login) {
        if (req.url == '/admin') {
            res.redirect('/dashboard');
        } else {
            next();
        }

    } else {
        res.redirect('/admin');
    }
}

module.exports = router;
