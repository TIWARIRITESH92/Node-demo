'use strict'

exports.validateCredit = function(){
	var schema = {
		'credit_card':{
			notEmpty : true,
			errorMessage : "Please enter credit card number",
			isNumeric : {
				errorMessage : "Please enter valid credit card number"
			},
			isLength : {
				options: [{ min: 12, max: 19 }],
				errorMessage : "Credit card number must be 12 to 19 characters long",
			}
		},
		'cvc' : {
			notEmpty : true,
			errorMessage : "Please enter cvc number",
			isNumeric : {
				errorMessage : "Please enter valid cvc number",
			},
			isLength :{
				options : [{min:3,max:3}],
				errorMessage : "CVC number must be 3 characters long"
			}
		},
		'ammount' :{
			notEmpty : true,
			errorMessage : "Please enter amount",
			isNumeric : {
				errorMessage : "Please enter valid amount"
			}
		}
	}
	return schema;
}