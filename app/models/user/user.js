'use strict'
var pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        query;


/***User credential check **/
exports.userCredentialCheck = function (request, callback) {
    var email = request.email;
    query = "SELECT * FROM clients WHERE admin_email = $1 AND role = '2'";
    pool.query(query, [email], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

/*** User total balance get ***/
exports.userTotalBalance = function(userId,callback){
    query = "SELECT current_balance FROM clients WHERE id = $1";
    pool.query(query,[userId],function(err,res){
        if(err) {
            callback(err);
        } else {
            callback(null,res);
        }
    });
}