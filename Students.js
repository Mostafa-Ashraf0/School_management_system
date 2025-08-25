let studentsData = [];

//logout button functionality
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "index.html";
});

//sidebar styling
const sidebarList = document.querySelectorAll(".Sidebar ul li a");

sidebarList.forEach((link) => {
  link.classList.add(
    "rounded-lg",
    "px-4",
    "flex",
    "w-full",
    "gap-4",
    "items-center",
    "p-2",
    "cursor-pointer"
  );
});

const currentLisItem = document.querySelector(".Sidebar ul li .current");
const bgColor = localStorage.getItem("bg-color");
const color = localStorage.getItem("color");
currentLisItem.classList.add(bgColor, color);

//display add student form onclick
const addStudentBtn = document.querySelector(".add-student");
const form = document.querySelector(".students-list form");
addStudentBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  addStudentBtn.classList.add("hidden");
});

form.addEventListener("submit", () => {
  form.classList.add("hidden");
  addStudentBtn.classList.remove("hidden");
});

async function fetchData() {
  try {
    const response = await fetch("students_50.json");
    const data = await response.json();
    studentsData = data;
    createListItems();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}
fetchData();

function createListItems() {
  const studentsList = document.querySelector(".list");
  const studentsItems = studentsData
    .map((student) => {
      return `
      <div class="item flex items-center justify-between py-3 px-8 border-b-1">
        <span class="text-center w-[25%]">${student.name}</span>
        <span class="text-center w-[25%]">${student.age}</span>
        <span class="text-center w-[25%]">${student.gender}</span>
        <span class="text-center w-[25%]">${student.total_hours}</span>
        <span class="text-center w-[25%]">delete / edit</span>
      </div>`;
    })
    .join("");
  studentsList.innerHTML += studentsItems;
}
