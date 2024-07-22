let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutBtn = document.querySelector("#logout");
let realLogoutBtn = document.querySelector("#realLogout");

let username = localStorage.getItem("username");
if (username) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.innerHTML = username;
} else {
  window.location = "login.html";
}

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // localStorage.clear();
  setTimeout(() => {
    window.location = "logout.html";
  }, 1500);
});

if (realLogoutBtn) {
  realLogoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    setTimeout(() => {
      window.location = "register.html";
    }, 1500);
  });
}
