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