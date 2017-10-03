'use strict'
var express = require("express"),
        app = express(),
        userModel = require('../../models/user/user'),
        creditModel = require('../../models/user/credit'),
        stripe = require('stripe')('sk_test_Uph5eiRxLO65PInSKd3YW94r'),
        creditValidate = require('../../lib/validate/creditValidate'),
        pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        moment = require('moment'),
        async = require('async');

exports.addUserCredit = function (req, res, next) {
    console.log(req.session.user['admin_email']);
    var currentYear = new Date().getFullYear();
    res.render("./user/add_credit.html", {currentYear: currentYear});
}

/**** Inser user credit *****/

exports.insertUserCredit = function (req, res, next) {
    async.waterfall([
        function (callback) {
            req.body.credit_card = req.body.credit_card.replace(/\s/g, "");
            req.checkBody(creditValidate.validateCredit());
            req.getValidationResult().then(result => {
                var errors = result.array();
                if (errors && errors.length > 0) {
                    //console.log(errors);
                    var currentYear = new Date().getFullYear();
                    res.render('user/add_credit.html', {errors: errors, param: req.body, currentYear: currentYear});
                } else {
                    callback(null);
                }
            });
        },
        function (callback) {
            console.log("First");
            /*** Create strip customer token **/
            stripe.customers.create({
                email: req.session.user['admin_email'],
                source: req.body.token
            }, function (err, customer) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, customer);
                }
            }
            );
        },
        function (customer, callback) {
            var amount = req.body.ammount * 100;
            stripe.charges.create({
                amount: amount,
                currency: "usd",
                customer: customer.id,
            }, function (err, charge) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, charge);
                }
            });
        },
        function(charge,callback){
            /*** Fetch user details **/
            var userId = req.session.user['id'];
            creditModel.getUserDetails(userId,function(err,userInfo){
                if(err){
                    callback(err);
                }else{
                    callback(null,userInfo,charge);
                }
            });
        },
        function(userInfo,charge,callback){
           /*** Add transaction details if transaction is sucesfull ***/
                    var userData = req.body;
                    var transaction_status;
                    var remain_amount;
                    if (charge.status == "succeeded") {
                        remain_amount = parseInt(req.body.ammount) + userInfo['current_balance'];
                        transaction_status = 0;
                    } else {
                        remain_amount = parseInt(userInfo['current_balance']);
                        transaction_status = 1;
                    }

                    creditModel.addStripeTransaction(userInfo,charge,transaction_status,remain_amount,req.body,function (err) {
                            if(err){
                                callback(err);
                            }else{
                                callback(null,remain_amount,charge);
                            }
                    });
                    
            },
        function(remain_amount,charge,callback){
            
            /*** If transaction sucesfull then add details to user ***/
            if(charge.status == "succeeded"){
                var userId = req.session.user['id'];
                creditModel.addBalanceToClientWallet(userId,remain_amount,function (err) {
                            if(err){
                                callback(err);
                            }else{
                                callback(null,remain_amount,charge);
                            }
                });      
            }else{
                callback(null,remain_amount,charge);
            }
        },
        function(remain_amount,charge,callback){
                    var transaction_type = 0;
                    var transaction_status;
                    var userId = req.session.user['id'];
                    if(charge.status == "succeeded"){
                        transaction_status = 0;
                    }else{
                        transaction_status = 1;
                    }
                    creditModel.addCommonTransaction(userId,req.body.ammount,remain_amount,transaction_type,transaction_status,function (err, result) {
                            if(err){
                                callback(err);
                            }else{
                                callback(null,charge);
                            }
                    });
        }
    ], function (err, result) {
        if (err) {
               res.send({status: 500, message: err.message});
        } else {
              if(result.status == "succeeded"){
                req.flash('sucess_message','Payment completed sucesfully');
              }else{
                req.flash('failure_message','Something went wrong with payment please contact with adminstrator.');
              }
              res.redirect('/user/transactionList');
        }
    });
}

/**** Transaction List ***/
exports.transactionList = function (req,res,next){
    var userId = req.session.user['id'];
    async.waterfall([
        function(callback){
            creditModel.getClientStripeTransaction(userId,function(err,result){
                if(err){
                    callback(err);
                }else{
                    callback(null,result);
                }
            });
        }
 
    ],function(err,result){
        if(err) {
            res.send({status:500,message:err.message})
        } else {
            var transactionData = JSON.parse(JSON.stringify(result.rows));
            res.render('./user/transaction_list.html',{transactionData:transactionData,moment:moment});
        }
    });
}