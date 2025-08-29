//logout button functionality
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "index.html";
});
