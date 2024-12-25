function showHidePassword(inputField,eyeIcon){
    let inputPass = document.getElementById(inputField);
    if(eyeIcon.classList.contains('fa-eye')){
        inputPass.type = "text";
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
    else if(eyeIcon.classList.contains('fa-eye-slash')){
        inputPass.type = "password"
        eyeIcon.classList.add('fa-eye');
        eyeIcon.classList.remove('fa-eye-slash');
    }
}

document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Retrieve form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:8080/accounts/adminlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Proper Content-Type for form data
        },
        body: new URLSearchParams({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (response.ok) {
            window.location.href="/AdminDashboard.html"
            //toastr.success('Login successfully');
            alert('Login successfully');
        } else {
            //toastr.error('login failed Invalid credentials');
            alert("Invalid Credentials");
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
})