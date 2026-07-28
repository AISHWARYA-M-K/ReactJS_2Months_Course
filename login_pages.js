const username = document.getElementById("username");
const passkey = document.getElementById("password");
const btn = document.getElementById("result-btn");
const result_page = document.getElementById("resultPage");

let error = document.getElementById("error");

btn.addEventListener("click",login_functionality);

function login_functionality(event){
    event.preventDefault();

    const enteredName = username.value.trim();
    const enteredPassword = passkey.value;

if(fixedName == enteredName && pass == enteredPassword){
    error.textContent = "Login Successsfull";
}else if( fixedName !== enteredName){
    error.textContent = "Invalid UserName";
}else{
    error.textContent="Invalid Password";
}
}