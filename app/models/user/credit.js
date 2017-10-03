'use strict' 
var pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        query;

/****  Fetch user details **********/
exports.getUserDetails = function(userId,callback){
			query = "SELECT * FROM clients WHERE id = $1";
			pool.query(query,[userId],function(err,result){
				if(err){
					callback(err);
				}else{
					callback(null,result.rows[0]);
				}
			});
}
	
/**** Add stripe transaction ***/
exports.addStripeTransaction = function(userInfo,charge,transaction_status,remain_amount,request,callback){
		var transaction_id = charge.id;
		var client_id = userInfo['id'];
		var amount = request.ammount;
		var remain_amount = remain_amount;
		var status = transaction_status;
		var transaction_status = charge.status;
		query = "INSERT INTO clients_stripe_transaction (transaction_id,client_id,amount,remain_amount,status,transaction_status,created_date) VALUES ($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP)";
		pool.query(query,[transaction_id,client_id,amount,remain_amount,status,transaction_status],function(err,res){
				if(err){
					callback(err);
				}else{
					callback(null);
				}
		})
}

/**** Update client balance ***/
exports.addBalanceToClientWallet = function(userId,remain_amount,callback){
		var client_id = userId;
		var remain_amount = remain_amount;
		
		query = "UPDATE clients SET current_balance = $1 WHERE id = $2";
		pool.query(query,[remain_amount,client_id],function(err,res){
				if(err){
					callback(err);
				}else{
					callback(null);
				}
		})
}

/**** Add common stripe transaction ********/

exports.addCommonTransaction = function(userId,amount,remain_amount,transaction_type,transaction_status,callback){
		var userId = userId;
		var amount = parseInt(amount);
		var remain_amount = parseInt(remain_amount);
		var transaction_type = transaction_type;
		var transaction_status = transaction_status;

		query = "INSERT INTO clients_all_transaction (client_id,amount,remain_amount,transaction_type,status,created_date) VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP)";
		pool.query(query,[userId,amount,remain_amount,transaction_type,transaction_status],function(err,res){
				if(err){
					callback(err);
				}else{
					callback(null);
				}
		})
}

/*** Get user all stripe transactions ******/

exports.getClientStripeTransaction = function(userId,callback){
	query = "SELECT * FROM clients_stripe_transaction WHERE client_id = $1 ORDER BY created_date ASC";
	pool.query(query,[userId],function(err,result){
			 if(err){
			 	callback(err);
			 }else{
			 	callback(null,result);
			 }
	})
}
