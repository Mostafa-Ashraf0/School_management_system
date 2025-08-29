import { createListItems } from "./createListItems/createTeachersListItems.js";
import { formDisplay } from "./formOfAddNewDisplay.js";
import { drawTeacherProfile } from "./teacherProfile.js";

let teachersData = JSON.parse(localStorage.getItem("teachersData")) || [];

//display Add new teacher form
const teacherBtn = document.querySelector(".add-teacher");
const teachersForm = document.querySelector(".teachers-list form");
formDisplay(teacherBtn, teachersForm);

//fetch initial data
async function fetchData() {
  try {
    const response = await fetch("teachers_10.json");
    const data = await response.json();
    if (teachersData.length === 0) {
      teachersData = data;
      localStorage.setItem("teachersData", JSON.stringify(teachersData));
    }
    createListItems();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}
fetchData();

//draw teacher profile
drawTeacherProfile();

// add new student
const teacherForm = document.querySelector(".teachers-list form");
teacherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const teachersList = document.querySelector(".list");
  const newTeacher = {};
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const age = document.querySelector("#age").value;
  const gender = document.querySelector("#gender").value;
  newTeacher.id = teachersData[teachersData.length - 1].id + 1;
  newTeacher.name = firstName + " " + lastName;
  newTeacher.age = parseInt(age);
  newTeacher.gender = gender;
  teachersData.push(newTeacher);
  localStorage.setItem("teachersData", JSON.stringify(teachersData));
  teachersList.innerHTML = "";
  createListItems();
  teacherForm.reset();
});

//delete teacher
const teacherList = document.querySelector(".list");

teacherList.addEventListener("click", (e) => {
  const teacherId = parseInt(e.target.getAttribute("data-id"));
  if (e.target.classList.contains("delete")) {
    teachersData = teachersData.filter((teacher) => teacher.id !== teacherId);
    localStorage.setItem("teachersData", JSON.stringify(teachersData));
    createListItems();
  } else if (e.target.classList.contains("edit")) {
    //change in data will reflect in studentsData due to shared reference
    data = teachersData.find((teacher) => teacher.id === teacherId);
    profile.classList.remove("hidden");
    profile.innerHTML = `
                  <div class="profile-card w-[700px] h-[500px] bg-white rounded-3xl shadow-lg p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <i class="fa-solid fa-circle-xmark text-2xl text-blue-500 cursor-pointer absolute top-4 right-4" id="close-profile"></i>
                    <div class="img">
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="profile" class="w-[100px] h-[100px] object-cover rounded-full mx-auto mb-4">
                    </div>
                    <div className="info">
                      <label>Name:</label>
                      <input type="text" value="${data.name}" id="name"  class="w-[100%] h-[35px] outline-none rounded-sm pl-2 bg-stone-100" required>
                      <label>Age:</label>
                      <input type="text" value="${data.age}" id="age" class="w-[100%] h-[35px] outline-none rounded-sm pl-2 bg-stone-100" required>
                      <label>Gender:</label>
                      <input type="text" value="${data.gender}" id="gender" class="w-[100%] h-[35px] outline-none rounded-sm pl-2 bg-stone-100" required>
                      <button class="save w-[50%] h-[35px] outline-none rounded-sm pl-2 bg-blue-500 text-white font-bold cursor-pointer">Add</button>
                    </div>
                  </div>`;
    const name = profile.querySelector("#name");
    const age = profile.querySelector("#age");
    const gender = profile.querySelector("#gender");
    const save = profile.querySelector(".save");
    save.addEventListener("click", () => {
      data.name = name.value;
      data.age = age.value;
      data.gender = gender.value;
      localStorage.setItem("teachersData", JSON.stringify(teachersData));
      profile.classList.add("hidden");
      createListItems();
    });

    const closeProfile = document.querySelector("#close-profile");
    closeProfile.addEventListener("click", () => {
      profile.classList.add("hidden");
    });
  }
});
