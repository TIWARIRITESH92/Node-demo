'use strict'
var express = require("express"),
        app = express(),
        profileModel = require('../../models/user/profile'),
        stripe = require('stripe')('sk_test_Uph5eiRxLO65PInSKd3YW94r'),
        creditValidate = require('../../lib/validate/creditValidate'),
        pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        moment = require('moment'),
        async = require('async');


exports.profile = function (req,res,next){
	var userId = req.session.user['id'];
	async.waterfall([
		function(callback){
				profileModel.getUserData(userId,function(err,result){
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
			var userData = JSON.parse(JSON.stringify(result.rows));
	    	res.render('./user/profile.html',{userData:userData});
		}
	});
}