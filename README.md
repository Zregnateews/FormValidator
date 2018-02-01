# FormValidator
It's a form validator, what do you expect? It validates fields. :)

-----------------------

## The real stuff
  
* blurValidations(form, options); // will trigger blur/click/change validations on the elements inside the form.
* validateFormField(field, options); // will validate the provided field and return true if valid.
* validateForm(form, options); // will validate all form fields inside the given form.

The parameter named **form**, does not need to be a form. Can be any element on which you want to validate the form elements it contains.
The paremeter **field** should be a valid form field (input[type='text'],input[type='password'],input[type='email'],input[type='file'],input[type='checkbox'],input[type='radio'],textarea,select)
The parameter **options** can have the following values: 
* validateHiddenFields: to validate any fields that are not visible in the form - default: false
* showErrorMessage: to show an error message underneath the field - default: false
* dumbValidations: if you feel like the users might be really dumb, these validations will help (mostly on email fields) - default: false

## How to use
    <div id="thisIsAForm">
        <div class="floating-label fieldHolder noPadding">
            <input type="text" id="email" data-empty-error-message="Please enter your First Name" class="validEmail required" />
            <label for="email">Email</label>
        </div>
    </div>
    
    <script type="text/javascript">
        $(function(){
            // Validate single field
            validateFormField($("#email"), { showErrorMessage: true, dumbValidations: true });
            // Validate the entire form
            validateForm($("#thisIsAForm"), { showErrorMessage: true, dumbValidations: true });
            // Trigger on blur validations to this form
            blurValidations($("#thisIsAForm"), { showErrorMessage: true, dumbValidations: true });            
        });        
    </script>

Just as simple as this.


## What else can you use?

* checkIfValidNameFieldWithObj(element); // Pass an input to check if the value is a valid name (basic regex to check for numbers and stuff that don't belong in a name).
* checkIfValidPhoneNumberFieldWithObj(element); // Pass an input to check if the value is a valid phone number (If the field has an attribute named **"data-phone-regex"**, this regex will be used).
* checkIfValidNumberFieldWithObj(element); // Pass an input to check if the value is a valid number field (If the field has an attribute named **"data-number-regex"**, this regex will be used).
* checkIfValidCVVFieldWithObj(element); // Pass an input to check if the value is a valid cvv number (If the field has an attribute named **"data-cvv-regex"**, this regex will be used).
* checkIfEmailFieldhasAtSign(element); // Pass an input to check if the value contains an @ symbol.
* checkIfEmailFieldhasValidLength(element); // Pass an input to check if the value is less than the valid length (If the field has an attribute named **"data-length-number"**, this number will be used).
* checkIfValidEmailFieldWithObj(element); // Pass an input to check if the value is a valid email (If the field has an attribute named "data-email-regex", this regex will be used).
* checkIfStrongPasswordWithObj(element); // Pass an input to check if the value is a strong password (If the field has an attribute named "data-pw-regex", this regex will be used).
* isNotEmptyWithObj(element); // Pass an input to check if has value.
* isNullOrEmpty(string); // Pass a string to check if is null or empty.
* hasAttribute(element, attribute); // Pass an element and a attribute name to check if the element has that attribute.
* scrollToElement(element, offset, callback); // A bonus, will scroll the page to the given element, offset will accept an int with the offset you wanna give to the scrolling, and a callback, you know, just in case.
* previewFile(imgControlId, fuControlId); // Receives an img element and a file input to render the selected file in the image.


Hope it's helpful. I know it's very helpful for me :D
