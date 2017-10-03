'use strict'

exports.userValidate = function(){
	var schema = {
		'email' :{
				 notEmpty: true,
				 errorMessage: 'Please enter email address',
				 isLowercase: {
        			errorMessage: 'Email must be in lowercase'
			     },
			     isEmail: {
			        errorMessage: 'Please enter correct email id'
			     }
		},
		'password' :{
			notEmpty : true,
			errorMessage: "Please enter password"
		}
	}
	return schema;
}

/**** Add validation on user add form ****/

exports.validateUserForm = function(){

	var schema = {
		'firstname' :{
			notEmpty : true,
			errorMessage : 'Please enter firstname'
		},
		'surname' : {
			notEmpty : true,
			errorMessage : "Please enter surname",
		},
		'admin_email' : {
			notEmpty : true,
			errorMessage : "Please enter admin email address",
			isLowercase : {
				errorMessage : "Admin email must be in lowercase",
			},
			isEmail : {
				errorMessage : "Please enter valid admin email address",
			},
		},
		'invoice_email' :{
			notEmpty : true,
			errorMessage : "Please enter invoice email address",
			isEmail : {
				errorMessage : "Please enter valid invoice email address",
			},
			isLowercase : {
				errorMessage : "Invoice email must be in lowercase",
			}
		},
		'company_name' :{
			notEmpty : true,
			errorMessage : "Please enter company name",
		},
		'company_address_1':{
			notEmpty : true,
			errorMessage : "Please enter company address 1",
		},
		'company_address_2':{
			notEmpty : true,
			errorMessage : "Please enter company address 2",
		},
		'town':{
			notEmpty : true,
			errorMessage : "Please enter company address 2",
		},
		'country':{
			notEmpty : true,
			errorMessage : "Please enter country name",
		},
		'postcode':{
			notEmpty : true,
			errorMessage : "Please enter postcode",
			isNumeric : {
				errorMessage : "Please enter valid postcode",
			},
		},
		'phone':{
			notEmpty : true,
			errorMessage : "Please enter phone number",
			isNumeric : {
				errorMessage : "Please enter valid phone number",
			},
		},
		'support_email' : {
			notEmpty : true,
			errorMessage : "Please enter support email address",
			isLowercase : {
				errorMessage : "Support email must be in lowercase",
			},
			isEmail : {
				errorMessage : "Please enter valid support email address",
			},
		},
		'password':{
			notEmpty : true,
			errorMessage : "Please enter password",
			isLength : {
				options: [{ min: 8, max: 32 }],
				errorMessage : "Password must be 8 to 32 characters long",
			}
		},
	}
	return schema;
}

/**** Add validation on user update form ****/

exports.editValidateUserForm = function(){

	var schema = {
		'firstname' :{
			notEmpty : true,
			errorMessage : 'Please enter firstname'
		},
		'surname' : {
			notEmpty : true,
			errorMessage : "Please enter surname",
		},
		'admin_email' : {
			notEmpty : true,
			errorMessage : "Please enter admin email address",
			isLowercase : {
				errorMessage : "Admin email must be in lowercase",
			},
			isEmail : {
				errorMessage : "Please enter valid admin email address",
			},
		},
		'invoice_email' :{
			notEmpty : true,
			errorMessage : "Please enter invoice email address",
			isEmail : {
				errorMessage : "Please enter valid invoice email address",
			},
			isLowercase : {
				errorMessage : "Invoice email must be in lowercase",
			}
		},
		'company_name' :{
			notEmpty : true,
			errorMessage : "Please enter company name",
		},
		'company_address_1':{
			notEmpty : true,
			errorMessage : "Please enter company address 1",
		},
		'company_address_2':{
			notEmpty : true,
			errorMessage : "Please enter company address 2",
		},
		'town':{
			notEmpty : true,
			errorMessage : "Please enter company address 2",
		},
		'country':{
			notEmpty : true,
			errorMessage : "Please enter country name",
		},
		'postcode':{
			notEmpty : true,
			errorMessage : "Please enter postcode",
			isNumeric : {
				errorMessage : "Please enter valid postcode",
			},
		},
		'phone':{
			notEmpty : true,
			errorMessage : "Please enter phone number",
			isNumeric : {
				errorMessage : "Please enter valid phone number",
			},
		},
		'support_email' : {
			notEmpty : true,
			errorMessage : "Please enter support email address",
			isLowercase : {
				errorMessage : "Support email must be in lowercase",
			},
			isEmail : {
				errorMessage : "Please enter valid support email address",
			},
		},
		
	}
	return schema;
}