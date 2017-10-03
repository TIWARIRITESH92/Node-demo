'use strict'
var express = require("express"),
app = express(),
userModel = require('../../models/user/user'), 
pool = require('../../../config/config/connection'),
bcrypt = require('bcrypt'),
async = require('async');


exports.showDashboard = function (req, res, next) {
	async.waterfall([
		function(callback){
			userModel.userTotalBalance(req.session.user['id'],function(err,result){
				if(err){
					callback(err);
				}else{
					callback(null,result);
				}
			});
		}
	],function(err,result){
		if(err){
			res.send({status:500,message:err.message});
		}else{
			var currentBalance = JSON.parse(JSON.stringify(result.rows));
			currentBalance = currentBalance[0].current_balance;
			res.render("./user/dashboard.html",{currentBalance:currentBalance});
		}
	});
    
}