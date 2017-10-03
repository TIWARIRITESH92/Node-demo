'use strict' 
var express = require("express"),
app = express(),
adminUserModel = require('../../models/admin/user'),
pool = require('../../../config/config/connection'),
userValidate = require('../../lib/validate/userValidate'),
bcrypt = require('bcrypt'),
https = require('https'),
async = require('async');


/*** User listing ***/
exports.userlist = function (req,res,next){
	    async.waterfall([
	    	function(callback){
	    		adminUserModel.getUserList(req.body,function(err,result){
	    			if(err){
	    				callback(err);
	    			}else{
	    				callback(null,result);
	    			}
	    		})
	    	}
	    ],function(err,result){
	    	if(err){
	    		callback(err);
	    	}else{
	    		var userData = JSON.parse(JSON.stringify(result.rows));
	    		res.render('./admin/user_list.html',{result:userData});
	    	}
	    });
}

/*** Add user ****/
exports.adduser = function (req,res,next){
		res.render("./admin/add_user.html"); 
}

/*** Add user details ***/
exports.adduserDetail = function(req,res,next){
	async.waterfall([
			function(callback){
					req.checkBody(userValidate.validateUserForm());
					req.getValidationResult().then(result => {
					  		var errors = result.array();
					  		if(errors && errors.length > 0){
					  			 res.render('admin/add_user.html',{errors:errors,param:req.body});
					  		}else{
					  			req.body.admin_email = req.body.admin_email.toLowerCase();
					  			req.body.invoice_email = req.body.invoice_email.toLowerCase();
					  			req.body.support_email = req.body.support_email.toLowerCase();
					  			callback(null);
					  		}
	  					});
			},
			function(callback){
				/** Check if user email address allready exists ***/
				adminUserModel.checkUserEmail(req.body,function(err,result){
					if(err){
						callback(err);
					}else{
						if(result.rowCount > 0){
							res.render('admin/add_user.html',{admin_email_exists:"Admin email allready exists",param:req.body});
						}else{
							adminUserModel.addUser(req.body,function(err,result){
								if(err){
									callback(err);
								}else{
									callback(null,result);
								}	
							})
						}
					}
				});
			}
	],function(err,result){
		if(err){
		    res.send({status:500,message:err.message});
		}else{
			req.flash('sucess_message', 'User added sucessfully');
			res.redirect('/admin/userlist');
		}
	});
}

/*** Edit user details ***/
exports.editUser = function(req,res,next){
		async.waterfall([
	    	function(callback){
	    		adminUserModel.getUserById(req,function(err,result){
	    			if(err){
	    				callback(err);
	    			}else{
	    				callback(null,result);
	    			}
	    		})
	    	}
	    ],function(err,result){
	    	if(err){
	    		//console.log(err.message);
	    		res.send({status:500,msg:err.message});
	    	}else{
	    		var userData = JSON.parse(JSON.stringify(result.rows));
	    		if(userData.length > 0){
	    			res.render("./admin/edit_user.html",{userData:userData});
	    		}else{
	    			res.redirect("/admin/userlist");
	    		}
	    		
	    	}
	    });
		 
};

/*** Add user details ***/
exports.updateUser = function(req,res,next){
	async.waterfall([
			function(callback){
					req.checkBody(userValidate.editValidateUserForm());
					req.getValidationResult().then(result => {
					  		var errors = result.array();
					  		if(errors && errors.length > 0){
					  			 res.render('admin/edit_user.html',{errors:errors,param:req.body});
					  		}else{
					  			req.body.admin_email = req.body.admin_email.toLowerCase();
					  			req.body.invoice_email = req.body.invoice_email.toLowerCase();
					  			req.body.support_email = req.body.support_email.toLowerCase();
					  			callback(null);
					  		}
	  				});
			},
			function(callback){
				/** Check if user email address allready exists ***/
				adminUserModel.checkUserEmailForUpdate(req.body,function(err,result){
					if(err){
						callback(err);
					}else{
						if(result.rowCount > 0){
							res.render('admin/edit_user.html',{admin_email_exists:"Admin email allready exists",param:req.body});
						}else{
							adminUserModel.updateUser(req.body,function(err,result){
								if(err){
									callback(err);
								}else{
									callback(null);
								}	
							})
						}
					}
				});
			},
			function(callback){
				var password = req.body.password;
				if(password.length > 0){
					req.checkBody(userValidate.validateUserForm());
					req.getValidationResult().then(result => {
						var errors = result.array();
					  	if(errors && errors.length > 0){
					  		res.render('admin/edit_user.html',{errors:errors,param:req.body});
					  	}else{
			  			 	adminUserModel.updateUserPassword(req.body,function(err,result){
								if(err){
									callback(err);
								}else{
									callback(null);
								}	
							});
					  	}
				  	});
						
				} else {
					callback(null);
				}
			},
			function(callback){
					/************ prepare data *************/
					var userData = {id:req.body.user_id};
					userData['fields'] = {
							'uniqueId' : req.body.user_id,  
							'company​Name':req.body.company_name,
							'firstName':req.body.firstname,
							'surName' : req.body.surname,
							'address​Line​_​1' : req.body.company_address_1,
							'address​Line_2' : req.body.company_address_2,
							'town' : req.body.town,
							'country' : req.body.country,
							'postcode' : req.body.postcode,
							'phone' : req.body.phone,
							'supportEmail' : req.body.support_email,
							'clientEmail' : req.body.admin_email,
							'invoiceEmail' : req.body.invoice_email
					};
					userData = JSON.stringify(userData);
					/*********** header ***********/
					var postheaders = {
					    'X-API-Key' : 'tNZBgRI7UA1qKSZKrpMWbaJveGtlrVEs9ZtR83yk'
					};
					
					// the post options
					var optionspost = {
					    host : 'f7ohskvee9.execute-api.eu-west-2.amazonaws.com',
					    path : '/Production/accountupdate',
					    method : 'POST',
					    headers : postheaders
					};
					// do the POST call
					var reqPost = https.request(optionspost, function(res) {
					    res.on('data', function(d) {
					        process.stdout.write(d);
					    });
					});
					reqPost.write(userData);
					reqPost.end();
					reqPost.on('error', function(e) {
						console.log("Error occured");
					});
					callback(null);
			}
	],function(err,result){
		if(err){
		    res.send({status:500,message:err.message});
		}else{
			req.flash('sucess_message', 'User update sucessfully');
			res.redirect('/admin/userlist');
		}
	});
}