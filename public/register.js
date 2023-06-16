function validate() {

    var role = document.getElementById('role').value;
    var uname = document.getElementById('uname').value;
    var pwd1 = document.getElementById('pwd1').value;
    var email = document.getElementById('email').value;

    var userObj = {
        role: role,
        username: uname,
        pwd1: pwd1,
        email: email
    }

    let user = JSON.parse(window.localStorage.getItem('users')) || []
    if (uname !== "" && pwd1 !== "" && email !== "") {
        let storeData = localStorage.getItem("users")
        storeData = JSON.parse(storeData)
        if (storeData && storeData.length > 0) {
            let emailData = storeData.filter(item => item.email === email)
            if (emailData && emailData.length > 0) {
                alert("email already exist!");
                event.preventDefault();
                return false;
            }
        }

        user.push(userObj)
        window.localStorage.setItem('users', JSON.stringify(user))
    }
}


// Validation

$(document).ready(function () {
    $('#usercheck').hide();
    $('#usercheck1').hide();
    $('#emailcheck').hide();
    $('#emailcheck1').hide();
    $('#emailcheck1').hide();


    var user_err = true;
    var email_err = true;

    //  Username    

    $('#uname').on('change', function () {
        uname_check();

    });

    function uname_check() {
        var user_val = $('#uname').val();

        if (user_val.length === 0) {
            $('#usercheck').show();
            $('#usercheck').focus();
            $('#usercheck1').hide();
            $('#uname').addClass("boxred");

            user_err = false;
            return false;

        } else {

            if ((user_val.length < 3) || (user_val.length > 25)) {
                $('#usercheck1').show();
                $('#usercheck1').focus();
                $("#uname").removeClass('boxblack');
                $('#uname').addClass("boxred");
                user_err = false;
                return false;

            } else {
                $('#usercheck1').hide();
                $('#uname').addClass("boxblack");

            }
            $('#usercheck').hide();
        }

    }

    // Email

    $('#email').on('change', function () {
        email_check();
    });

    function email_check() {
        var email_val = $('#email').val();

        if (email_val.length === 0) {
            $('#emailcheck').show();
            $('#emailcheck').focus();
            $('#emailcheck1').hide();
            $('#email').addClass("boxred");
            email_err = false;
            return false;

        } else {

            var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
            if (!pattern.test(email_val)) {
                $('#emailcheck1').show();
                $('#emailcheck1').focus();
                $('#emailcheck').hide();
                $("#email").removeClass('boxblack');
                $('#email').addClass("boxred");
                email_err = false;
                return false;

            } else {
                $('#emailcheck1').hide();
                $('#email').addClass("boxblack");
            }
            $('#emailcheck').hide();
        }
    }

    // Login click

    $('#login').click(function () {

        user_err = true;
        email_err = true;


        uname_check();
        email_check();


        if ((user_err == true) &&
            (email_err == true)) {
            return true;

        } else {
            return false;
        }

    });

});