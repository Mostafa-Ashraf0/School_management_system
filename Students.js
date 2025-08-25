let studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];

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

//hide form onclick
const closeIcon = document.querySelector("#close");
closeIcon.addEventListener("click", () => {
  form.classList.add("hidden");
  addStudentBtn.classList.remove("hidden");
});

form.addEventListener("submit", () => {
  form.classList.add("hidden");
  addStudentBtn.classList.remove("hidden");
});

async function fetchData() {
  try {
    const response = await fetch("students_50.json");
    const data = await response.json();
    if (studentsData.length === 0) {
      studentsData = data;
      localStorage.setItem("studentsData", JSON.stringify(studentsData));
    }
    createListItems();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}
fetchData();

function createListItems() {
  const studentsList = document.querySelector(".list");
  const studentsStore = JSON.parse(localStorage.getItem("studentsData")) || [];
  const studentsItems = studentsStore
    .map((student) => {
      return `
      <div class="item flex items-center justify-between py-3 px-4 border-b-1 border-stone-200 hover:bg-blue-300">
        <span class="text-center w-[25%]">${student.id}</span>
        <span class="text-center w-[25%]">${student.name}</span>
        <span class="text-center w-[25%]">${student.age}</span>
        <span class="text-center w-[25%]">${student.gender}</span>
        <span class="text-center w-[25%]">${student.total_hours}</span>
        <span class="text-center w-[25%]"><i class="delete fa-solid fa-trash cursor-pointer" data-id = ${student.id}></i>  <i class="fa-solid fa-pen"></i></span>
      </div>`;
    })
    .join("");
  studentsList.innerHTML = studentsItems;
}

// add new student
const addStudentForm = document.querySelector(".students-list form");
addStudentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const studentsList = document.querySelector(".list");
  const newStudent = {};
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const age = document.querySelector("#age").value;
  const gender = document.querySelector("#gender").value;
  newStudent.id = studentsData[studentsData.length - 1].id + 1;
  newStudent.name = firstName + " " + lastName;
  newStudent.age = parseInt(age);
  newStudent.gender = gender;
  newStudent.total_hours = 0;
  newStudent.grades = {};
  studentsData.push(newStudent);
  localStorage.setItem("studentsData", JSON.stringify(studentsData));
  studentsList.innerHTML = "";
  createListItems();
  addStudentForm.reset();
});

const studentsList = document.querySelector(".list");

studentsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const studentId = parseInt(e.target.getAttribute("data-id"));
    studentsData = studentsData.filter((student) => student.id !== studentId);
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
    createListItems();
  }
});
