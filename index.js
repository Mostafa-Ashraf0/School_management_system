let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
});

let user = document.querySelector("#username");
let password = document.querySelector("#password");

form.addEventListener("submit", () => {
  if (user.value === "" || password.value === "") {
    alert("Please fill in all fields.");
    return;
  }
  //store username and password in localStorage
  localStorage.setItem("username", user.value);
  localStorage.setItem("password", password.value);
  localStorage.setItem("isLoggedIn", "true");
  alert("Form submitted successfully!");
  window.location.href = "Dashboard.html";
});

//if the user is already logged in, and reload or undo to login page keep them on the dashboard
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "Dashboard.html";
}

//sidebar main style
localStorage.setItem("bg-color", "bg-blue-500");
localStorage.setItem("color", "text-white");
