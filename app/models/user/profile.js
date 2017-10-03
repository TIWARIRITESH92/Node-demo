'use strict'
var pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        query;

/*** Get user profile data ***/
exports.getUserData = function (userId,callback){
	query = "SELECT * FROM clients WHERE id = $1";
	pool.query(query,[userId],function(err,result){
			if(err){
				callback(err);
			}else{
				callback(null,result);
			}
	});
}