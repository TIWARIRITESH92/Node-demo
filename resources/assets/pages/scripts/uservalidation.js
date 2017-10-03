var FormValidation = function () {

    // basic validation
    var handleValidation1 = function() {
        // for more info visit the official plugin documentation: 
            // http://docs.jquery.com/Plugins/Validation

            var form1 = $('#user_creation_form');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);

            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                    firstname : "Please enter firstname",
                    surname  : "Please enter surname",
                    admin_email : "Please enter admin email",
                    invoice_email : "Please enter invoice email",
                    company_name : "Please enter company name",
                    company_address_1 : "Please enter company address 1",
                    company_address_2 : "Please enter company address 2",
                    town : "Please enter town name",
                    country : "Please enter country name",
                    postcode : "Please enter postcode",
                    phone : "Please enter phone number",
                    support_email : "Please enter support email",
                    password : "Please enter password"
                },
                rules: {
                    firstname: {
                        minlength: 2,
                        required: true
                    },
                    surname: {
                        minlength: 2,
                        required: true
                    },
                    admin_email: {
                        email: true,
                        required: true
                    },
                    invoice_email: {
                        email: true,
                        required: true
                    },
                    company_name: {
                        minlength: 2,
                        required: true
                    },
                    company_address_1: {
                        minlength: 2,
                        required: true
                    },
                    company_address_2: {
                        minlength: 2,
                        required: true
                    },
                    town: {
                        minlength: 2,
                        required: true
                    },
                    country: {
                        minlength: 2,
                        required: true
                    },
                    postcode: {
                        minlength: 2,
                        required: true,
                        digits : true,
                    },
                    phone: {
                        minlength: 2,
                        required: true,
                        digits : true,
                    },
                    support_email: {
                        email: true,
                        required: true
                    },
                    password: {
                        minlength: 2,
                        required: true
                    },
                    
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    success1.hide();
                    error1.show();
                    App.scrollTo(error1, -200);
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    var cont = $(element).parent('.input-group');
                    if (cont.size() > 0) {
                        cont.after(error);
                    } else {
                        element.after(error);
                    }
                },

                highlight: function (element) { // hightlight error inputs

                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                   form.submit();
                }
            });
    } 
    // basic validation
    var handleValidation2 = function() {
        // for more info visit the official plugin documentation: 
            // http://docs.jquery.com/Plugins/Validation

            var form1 = $('#edit_user_form');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);

            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                    firstname : "Please enter firstname",
                    surname  : "Please enter surname",
                    admin_email : "Please enter admin email",
                    invoice_email : "Please enter invoice email",
                    company_name : "Please enter company name",
                    company_address_1 : "Please enter company address 1",
                    company_address_2 : "Please enter company address 2",
                    town : "Please enter town name",
                    country : "Please enter country name",
                    postcode : "Please enter postcode",
                    phone : "Please enter phone number",
                    support_email : "Please enter support email",
                   
                },
                rules: {
                    firstname: {
                        minlength: 2,
                        required: true
                    },
                    surname: {
                        minlength: 2,
                        required: true
                    },
                    admin_email: {
                        email: true,
                        required: true
                    },
                    invoice_email: {
                        email: true,
                        required: true
                    },
                    company_name: {
                        minlength: 2,
                        required: true
                    },
                    company_address_1: {
                        minlength: 2,
                        required: true
                    },
                    company_address_2: {
                        minlength: 2,
                        required: true
                    },
                    town: {
                        minlength: 2,
                        required: true
                    },
                    country: {
                        minlength: 2,
                        required: true
                    },
                    postcode: {
                        minlength: 2,
                        required: true,
                        digits : true,
                    },
                    phone: {
                        minlength: 2,
                        required: true,
                        digits : true,
                    },
                    support_email: {
                        email: true,
                        required: true
                    },
                    
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    success1.hide();
                    error1.show();
                    App.scrollTo(error1, -200);
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    var cont = $(element).parent('.input-group');
                    if (cont.size() > 0) {
                        cont.after(error);
                    } else {
                        element.after(error);
                    }
                },

                highlight: function (element) { // hightlight error inputs

                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                   form.submit();
                }
            });
    }

    ///// Credit card validation
     // basic validation
    var handleValidation3 = function() {
        // for more info visit the official plugin documentation: 
            // http://docs.jquery.com/Plugins/Validation

            var form1 = $('#user_credit_add_form');
            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);

            form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                messages: {
                    credit_card : "Please enter credit card",
                    cvc : "Please enter cvc",
                    month : "Please select month",
                    year : "Please select year",
                    ammount : "Please enter amount"
                },
                rules: {
                    credit_card: {
                        required: true,
                        creditcard : true,
                    },
                    cvc : {
                        required : true,
                        number : true,
                        minlength : 3,
                        maxlength : 3,
                    },
                    month : {
                        required : true,
                    }, 
                    year : {
                        required : true
                    },
                    ammount:{
                        required : true,
                        digits : true
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    success1.hide();
                    error1.show();
                    App.scrollTo(error1, -200);
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    var cont = $(element).parent('.input-group');
                    if (cont.size() > 0) {
                        cont.after(error);
                    } else {
                        element.after(error);
                    }
                },

                highlight: function (element) { // hightlight error inputs

                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                    
                },

                submitHandler: function (form) {
                    $("#submit_credit").prop("disabled", true);
                    $(".ajax_loader").css('display','block');
                    var $form = $("#user_credit_add_form");
                    Stripe.card.createToken($form, function(status, response) {
                        if(typeof response.error !== 'undefined'){
                             alert(response.error['message']);
                             $("#submit_credit").removeAttr('disabled');
                             $(".ajax_loader").css('display','none');
                        }else{
                            
                            $("#token").val(response.id);
                            form.submit();    
                        }
                    })
                    
                }
            });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleValidation1();
	        handleValidation2();
            handleValidation3();
        }

    };

}();

jQuery(document).ready(function() {
    
    FormValidation.init();
});
