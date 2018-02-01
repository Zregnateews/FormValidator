/* Created by Manuel Nogueira on 25/05/2017
   DON'T JUDGE ME, probably times were different :D */

function checkIfValidNameFieldWithObj(el) {
    var value = el.val().trim()
        , exp_regExp = /^$|^[a-zA-Z\u00C0-\u017F- ']+$/;
    if (!exp_regExp.test(value))
        return false;
    else
        return true;
}

function checkIfValidPhoneNumberFieldWithObj(el) {
    var value = el.val().trim()
        , exp_regExp = el.data("phone-regex") ? el.data("phone-regex") : /^$|^[+]\d+$|^\d+$/;
    if (!exp_regExp.test(value))
        return false;
    else
        return true;
}

function checkIfValidNumberFieldWithObj(el) {
    var value = el.val().trim()
        , exp_regExp = el.data("number-regex") ? el.data("number-regex") : /^$|^[0-9 ]+$/;
    if (!exp_regExp.test(value))
        return false;
    else
        return true;
}

function checkIfValidCVVFieldWithObj(el) {
    var value = el.val().trim()
        , exp_regExp = el.data("cvv-regex") ? el.data("cvv-regex") : /^$|^\d{3,4}$/;
    if (!exp_regExp.test(value))
        return false;
    else
        return true;
}
function checkIfEmailFieldhasAtSign(el) {
    if (el.val().indexOf("@") < 0)
        return false;
    else
        return true;
}
function checkIfEmailFieldhasValidLength(el) {
    var value = el.val().trim()
        , checkLength = el.data("length-number") ? el.data("length-number") : 254;

    if (value.length > checkLength)
        return false;
    else
        return true;
}

function checkIfValidEmailFieldWithObj(el) {
    var value = el.val().trim()
        , exp_regExp = el.data("email-regex") ? el.data("email-regex") : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!exp_regExp.test(value) || !checkIfEmailFieldhasValidLength(el))
        return false;
    else
        return true;
}

function checkIfStrongPasswordWithObj(el){
    var value = el.val().trim()
        , exp_regExp = el.data("pw-regex") ? el.data("pw-regex") : new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[)(!@#\$%\^&\*])(?=.{8,})");

    if (!exp_regExp.test(value))
        return false;
    else
        return true;
}

function isNotEmptyWithObj(el) {
    if (el.val() == null || typeof el.val() == "undefined" || el.val() == '' || el.val().replace(/\s/g, '') == '' || (hasAttribute(el, "placeholder") && el.val() == el.attr("placeholder")))
        return false;
    else
        return true;
}

function isNullOrEmpty(str) {
    if (typeof str == "undefined" || str == '')
        return true;
    else
        return false;
}

function hasAttribute(el, attr) {
    attr = el.attr(attr);

    if (typeof attr !== typeof undefined && attr !== false)
        return true;
    else
        return false;
}

function blurValidations(form, options) {
    var fields = form.find("input[type='text'],input[type='password'],input[type='email'],input[type='file'],input[type='checkbox'],input[type='radio'],textarea,select")
        , options = options != null ? options : { validateHiddenFields: false, showErrorMessage: false, dumbValidations: false };

    for (var i = 0, n = fields.length; i < n; i++) {
        var el = $(fields[i]);

        if (el.is("input[type='text'],input[type='password'],input[type='email'],textarea")) {
            el.blur(function (e) {
                validateFormField($(e.target), options);
            });
        } else if (el.is("input[type='checkbox'],input[type='radio']")) {
            el.click(function (e) {
                validateFormField($(e.target), options);
            });
        } else if (el.is("select,input[type='file']")) {
            el.change(function (e) {
                validateFormField($(e.target), options);
            });
        }
    }
}

function validateFormField(field, options) {
    var validField = true
        , parentFieldHolder = field.parents(".fieldHolder")
        , options = options != null ? options : { validateHiddenFields: false, showErrorMessage: false, dumbValidations: false }
        , errorMessage = "";

    if (options.validateHiddenFields || field.is(":visible")) {
        if (field.is("input[type='text'],input[type='password'],input[type='email'],input[type='file'],textarea,select")) {
            if ((field.hasClass("required") || hasAttribute(field, "required")) && !isNotEmptyWithObj(field)) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("empty-error-message") ? field.data("empty-error-message") : "This field is required.";
                validField = false;
            } else if ((field.hasClass("validName") || hasAttribute(field, "validName")) && !checkIfValidNameFieldWithObj(field)) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("name-error-message") ? field.data("name-error-message") : "Invalid Name.";
                validField = false;
            } else if ((field.hasClass("validEmail") || hasAttribute(field, "validEmail")) && !checkIfValidEmailFieldWithObj(field)) {
                field.addClass("error");
                validField = false;

                if (options.showErrorMessage) {
                    errorMessage = field.data("email-error-message") ? field.data("email-error-message") : "Invalid Email.";

                    if (options.dumbValidations && !checkIfEmailFieldhasAtSign(field))
                        errorMessage = "Email must contain @.";
                    else if (options.dumbValidations && !checkIfEmailFieldhasValidLength(field))
                        errorMessage = "Email can only have 254 Characters.";
                }
            } else if ((field.hasClass("validPhone") || hasAttribute(field, "validPhone")) && !checkIfValidPhoneNumberFieldWithObj(field)) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("phone-error-message") ? field.data("phone-error-message") : "Invalid Phone.";
                validField = false;
            } else if ((field.hasClass("validNumber") || hasAttribute(field, "validNumber")) && !checkIfValidNumberFieldWithObj(field)) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("number-error-message") ? field.data("number-error-message") : "Invalid Number.";
                validField = false;
            } else if ((field.hasClass("validCVV") || hasAttribute(field, "validCVV")) && !checkIfValidCVVFieldWithObj(field)) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("cvv-error-message") ? field.data("cvv-error-message") : "Invalid CVV code.";
                validField = false;
            } else if((field.hasClass("strongPassword") || hasAttribute(field, "strongPassword")) && !checkIfStrongPasswordWithObj(field)){
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("strong-password-error-message") ? field.data("strong-password-error-message") : "A strong password is required.";
                validField = false;
            } else
                field.removeClass("error");

        } else if (field.is("input[type='checkbox']")) {
            if ((field.hasClass("oneIsRequired") || hasAttribute(field, "oneIsRequired"))) {
                var thisGroup = $("input[name='" + field.attr("name") + "']")
                    , oneIsChecked = false;

                for(var i=0,n=thisGroup.length;i<n;i++){
                    var thisInput = $(thisGroup[i]);

                    if (thisInput.is(":checked"))
                        oneIsChecked = true;
                }

                if(oneIsChecked)
                    thisGroup.removeClass("error");
                else {
                    thisGroup.addClass("error");
                    if (options.showErrorMessage) errorMessage = field.data("empty-error-message") ? field.data("empty-error-message") : "One of these options is required.";
                    validField = false;
                }

            }

            if ((field.hasClass("required") || hasAttribute(field, "required")) && !field.is(":checked")) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("empty-error-message") ? field.data("empty-error-message") : "This field is required.";
                validField = false;
            } else
                field.removeClass("error");
        } else if (field.is("input[type='radio']")) {
            if ((field.hasClass("oneIsRequired") || hasAttribute(field, "oneIsRequired"))) {
                var thisGroup = $("input[name='" + field.attr("name") + "']")
                    , oneIsChecked = false;

                for(var i=0,n=thisGroup.length;i<n;i++){
                    var thisInput = $(thisGroup[i]);

                    if (thisInput.is(":checked"))
                        oneIsChecked = true;
                }

                if(oneIsChecked)
                    thisGroup.removeClass("error");
                else {
                    thisGroup.addClass("error");
                    if (options.showErrorMessage) errorMessage = field.data("empty-error-message") ? field.data("empty-error-message") : "One of these options is required.";
                    validField = false;
                }

            } else if ((field.hasClass("required") || hasAttribute(field, "required")) && !field.is(":checked")) {
                field.addClass("error");
                if (options.showErrorMessage) errorMessage = field.data("empty-error-message") ? field.data("empty-error-message") : "This field is required.";
                validField = false;
            } else
                field.removeClass("error");
        }
        if (options.showErrorMessage)
            parentFieldHolder.removeClass("hasError").find("p.errorMessage").remove();

        if (options.showErrorMessage && !validField && !parentFieldHolder.hasClass("hasError")) {
            var errorMessageClass = field.hasClass("half") && field.prev().is(".half") && !field.prev().hasClass("error") ? "field50" : "";

            errorMessageClass = field.is(".small") && field.prev().is(".small") && !field.prev().hasClass("error") ? "field25" : errorMessageClass;
            parentFieldHolder.addClass("hasError").append("<p class='errorMessage " + errorMessageClass + "'><span>" + errorMessage + "</span></p>");
        }


        /*if (!validField)
            field.trigger("focus");*/

    }
    return validField;
}

function validateForm(form, options) {
    var fields = form.find("input[type='text'],input[type='password'],input[type='email'],input[type='file'],input[type='checkbox'],input[type='radio'],textarea,select")
        , validForm = true
        , focusTriggered = false
        , options = options != null ? options : { validateHiddenFields: false, showErrorMessage: false, dumbValidations: false };

    for (var i = 0, n = fields.length; i < n; i++) {
        var el = $(fields[i]);

        if (!validateFormField(el, options)) {
            validForm = false;
            if (!focusTriggered) {
                var focusable = el;
                focusTriggered = true;
                scrollToElement(focusable, -10, function () { focusable.trigger("focus");});
            }
        }
    }
    return validForm;
}

$(function(){
    var floatingInputs = $(".floating-label > input");

    floatingInputs.blur(function () {
        var el = $(this),
            parent = el.parent();

        if (el.val() != "")
            parent.addClass("hasValue");
        else
            parent.removeClass("hasValue");

    }).blur();
});

/// Given an element (jQuery el) will animate the body to scroll to it's location
/// An offset can be passed so it has some margin if needed
/// Usage: scrollToElement($('element'), offset)
/////////////////////////////////////////////////////
function scrollToElement(el, offset, callback) {
    offset = offset != null ? offset : 0;
    if (typeof el == "object") {

        $('html,body').animate({ scrollTop: el.offset().top + offset }, 500).promise().done(callback);
    }
}

/////////////////////////////////////////////////////
///Given a img and file upload control, set's the selected image inside the img container for preview
/// Usage: previewFile('myImg', 'myFileUpload')
/////////////////////////////////////////////////////
function previewFile(imgControlId, fuControlId) {
    var preview = document.getElementById(imgControlId) //selects the query named img
        , file = document.getElementById(fuControlId).files[0] //sames as here
        , reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
        $(preview).parent().addClass("hasFile");
    } else {
        preview.src = "";
        $(preview).parent().removeClass("hasFile");
    }
}
