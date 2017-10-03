'use strict'
var pool = require('../../../config/config/connection'),
        bcrypt = require('bcrypt'),
        query;

/***User credential check **/
exports.userCredentialCheck = function (request, callback) {
    var email = request.email;
    var password = request.password;
    query = "SELECT * FROM clients WHERE admin_email = $1 AND role = '1'";
    pool.query(query, [email], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

/*** Check if email address allready exists **/
exports.checkUserEmail = function (req, callback) {
    var admin_email = req.admin_email;
    query = "SELECT * FROM clients WHERE admin_email = $1";
    pool.query(query, [admin_email], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

/************** Add user ****************/
exports.addUser = function (req, callback) {
    var firstname = req.firstname;
    var surname = req.surname;
    var admin_email = req.admin_email;
    var invoice_email = req.invoice_email;
    var company_name = req.company_name;
    var company_address_1 = req.company_address_1;
    var company_address_2 = req.company_address_2;
    var town = req.town;
    var country = req.country;
    var postcode = req.postcode;
    var phone = req.phone;
    var support_email = req.support_email;
    var password = req.password;
    var saltpassword = bcrypt.hashSync(password, 0);
    var role = 2;
    query = "INSERT INTO clients (firstname,surname,admin_email,invoice_email,company_name,company_address_1,company_address_2,town,country,postcode,phone,support_email,password,role,created_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,CURRENT_TIMESTAMP)";
    pool.query(query, [firstname, surname, admin_email, invoice_email, company_name, company_address_1, company_address_2, town, country, postcode, phone, support_email, password, role], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

/**** Get user list ******/
exports.getUserList = function (req, callback) {
    query = "SELECT * FROM clients WHERE role = '2'";
    pool.query(query, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**** Get user by id ******/
exports.getUserById = function (req, callback) {
    var id = parseInt(req.params.id);
    query = "SELECT * FROM clients WHERE id = $1";
    pool.query(query, [id], function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};


/*** Check if email address allready exists **/
exports.checkUserEmailForUpdate = function (req, callback) {
    var admin_email = req.admin_email;
    var id = req.user_id;
    query = "SELECT * FROM clients WHERE admin_email = $1 AND id <> $2";
    pool.query(query, [admin_email, id], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

/**** Update user ********/
exports.updateUser = function (req, callback) {
    var id = req.user_id;
    var firstname = req.firstname;
    var surname = req.surname;
    var admin_email = req.admin_email;
    var invoice_email = req.invoice_email;
    var company_name = req.company_name;
    var company_address_1 = req.company_address_1;
    var company_address_2 = req.company_address_2;
    var town = req.town;
    var country = req.country;
    var postcode = req.postcode;
    var phone = req.phone;
    var support_email = req.support_email;
    query = "UPDATE clients SET firstname = $1,surname=$2,admin_email=$3,invoice_email=$4,company_name=$5,company_address_1=$6,company_address_2=$7,town=$8,country=$9,postcode=$10,phone=$11,support_email=$12 WHERE id = $13";
    pool.query(query, [firstname, surname, admin_email, invoice_email, company_name, company_address_1, company_address_2, town, country, postcode, phone, support_email, id], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });

}
/*** Update user password *****/
/**** Update user ********/
exports.updateUserPassword = function (req, callback) {
    var id = req.user_id;
    var password = req.password;
    var saltpassword = bcrypt.hashSync(password, 0);
    query = "UPDATE clients SET password = $1 WHERE id = $2";
    pool.query(query, [saltpassword, id], function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });

}


