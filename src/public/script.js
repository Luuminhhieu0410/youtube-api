
var form_login = document.querySelector('.container_login');
var form_register = document.querySelector('.container_register');

// Hiển thị form khi click vào button đăng nhập 
function loginButtonClick() {
    form_login.style.display = 'block';
}

// Ẩn form khi click ra ngoài
window.addEventListener('click', function (event) {
    if (event.target === form_login) {
        form_login.style.display = 'none';
    }
    if (event.target === form_register) {
        form_register.style.display = 'none';
    }
});

// Validate form đăng nhập
function validateLoginForm() {
    let username = document.getElementById("login_username").value.trim();
    let password = document.getElementById("login_password").value.trim();
    let valid = true;

    if (username === "") {
        document.getElementById("login_username_error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("login_username_error").style.display = "none";
    }

    if (password === "") {
        document.getElementById("login_password_error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("login_password_error").style.display = "none";
    }

    // if (valid) {
    //   alert("Đăng nhập thành công!");
    //   form_login.style.display = 'none';
    //   resetLoginForm();
    // }
}

// Reset form đăng nhập
function resetLoginForm() {
    document.getElementById("login_username").value = "";
    document.getElementById("login_password").value = "";
    document.getElementById("login_username_error").style.display = "none";
    document.getElementById("login_password_error").style.display = "none";
}

// Validate form đăng ký
function validateRegisterForm() {
    let fullname = document.getElementById("register_fullname").value.trim();
    let username = document.getElementById("register_username").value.trim();
    let password = document.getElementById("register_password").value.trim();
    let confirmPassword = document.getElementById("register_confirm_password").value.trim();
    let valid = true;

    if (fullname === "") {
        document.getElementById("register_fullname_error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("register_fullname_error").style.display = "none";
    }

    if (username === "") {
        document.getElementById("register_username_error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("register_username_error").style.display = "none";
    }

    if (password === "") {
        document.getElementById("register_password_error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("register_password_error").style.display = "none";
    }

    if (confirmPassword === "" || confirmPassword !== password) {
        document.getElementById("register_confirm_password_error").style.display = "block";
        valid = false;
    } else {
        document.getElementById("register_confirm_password_error").style.display = "none";
    }

    // if (valid) {
    //     alert("Đăng ký thành công!");
    //     form_register.style.display = 'none';
    //     resetRegisterForm();
    // }
}

// Reset form đăng ký
function resetRegisterForm() {
    document.getElementById("register_fullname").value = "";
    document.getElementById("register_username").value = "";
    document.getElementById("register_password").value = "";
    document.getElementById("register_confirm_password").value = "";
    document.getElementById("register_fullname_error").style.display = "none";
    document.getElementById("register_username_error").style.display = "none";
    document.getElementById("register_password_error").style.display = "none";
    document.getElementById("register_confirm_password_error").style.display = "none";
}

// Sự kiện chuyển đổi giữa các form
const LoginLink = document.getElementById('LoginLink');
const RegisterLink = document.getElementById('RegisterLink');

RegisterLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (form_login.style.display != 'none') form_login.style.display = 'none';
    form_register.style.display = 'block';
});

LoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (form_register.style.display != 'none') form_register.style.display = 'none';
    form_login.style.display = 'block';
});


//post
var loginForm = document.getElementById('loginForm');
var registerForm = document.getElementById('registerForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let loginUsername = document.getElementById('login_username');
    let loginPassword = document.getElementById('login_password');
    // console.log("test " + loginUsername.value + loginPassword.value);
    const response = await fetch("/user/login", {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
            //  "Content-Type": "application/x-www-form-urlencoded"
             },
        body: JSON.stringify({
            'username': loginUsername.value,
            'password': loginPassword.value

        }),
       
    });
    const data = await response.json();
    if(data.message != 'success') {
        document.getElementById('messageLogin').innerHTML = data.message;
    }
    else{
        window.location.href= '/home/video.html';
    }
})

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let registerName = document.getElementById('register_fullname');
    let registerUserName = document.getElementById('register_username');
    let registerPassword = document.getElementById('register_password');
    let confirmPassword = document.getElementById('register_confirm_password');
    console.log("thong tin dang ky " + registerName.value + registerUserName.value + registerPassword.value + confirmPassword.value);
    const response = await fetch("/user/register", {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
            //  "Content-Type": "application/x-www-form-urlencoded"
             },
        body: JSON.stringify({
            "name" : registerName.value,
            "username" :  registerUserName.value,
            "password":  registerPassword.value,
            "confirmPassword" : confirmPassword.value
        }),
       
    });
    const data = await response.json();
    if(data.message != 'success') {
        document.getElementById('messageRegister').innerHTML = data.message;
    }
    else{
        window.location.href= '/home/video.html';
    }
})