// Register User
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sing_up");

registerBtn.addEventListener("click", register);

function register(e) {
  e.preventDefault();
  if (username.value === "" || email.value === "" || password.value === "") {
    alert("Please Fil Data");
  } else {
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    setTimeout(() => {
      window.location = "login.html";
    }, 1500);
  }
}