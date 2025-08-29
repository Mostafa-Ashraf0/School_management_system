import { createListItems } from "./createListItems/createStudentsListItems.js";
import { formDisplay } from "./formOfAddNewDisplay.js";
import { drawStudentProfile } from "./studentProfile.js";
let studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
let teachersData = JSON.parse(localStorage.getItem("teachersData")) || [];

//display Add new student form
const studentAddBtn = document.querySelector(".add-student");
const studentForm = document.querySelector(".students-list form");
formDisplay(studentAddBtn, studentForm);

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

//draw student profile on click
drawStudentProfile();

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

//delete student / edit /assign
const studentsList = document.querySelector(".list");
studentsList.addEventListener("click", (e) => {
  const studentId = parseInt(e.target.getAttribute("data-id"));
  //delete student
  if (e.target.classList.contains("delete")) {
    studentsData = studentsData.filter((student) => student.id !== studentId);
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
    createListItems();
    //edit student
  } else if (e.target.classList.contains("edit")) {
    //change in data will reflect in studentsData due to shared reference
    data = studentsData.find((student) => student.id === studentId);
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
      localStorage.setItem("studentsData", JSON.stringify(studentsData));
      profile.classList.add("hidden");
      createListItems();
      console.log(studentsData);
    });

    const closeProfile = document.querySelector("#close-profile");
    closeProfile.addEventListener("click", () => {
      profile.classList.add("hidden");
    });
    //assign student to teacher
  } else if (e.target.classList.contains("add")) {
    const form = document.querySelector(".assign-student");
    const course = document.querySelector("#course");
    const teacher = document.querySelector("#teacher");
    const classSection = document.querySelector("#class");
    // create object contains course and each teaher for it
    const teacherByCourse = teachersData.reduce((acc, t) => {
      if (!acc[t.course]) acc[t.course] = [];
      acc[t.course].push(t.name);
      return acc;
    }, {});
    const assignForm = document.querySelector(".assign");
    assignForm.classList.remove("hidden");
    //after selecting course, a list of all teachers appear
    course.addEventListener("change", (e) => {
      teacher.innerHTML = `<option value="#" selected>Select Teacher</option>`;
      const selected = course.value;
      teacherByCourse[selected].forEach((t) => {
        const option = document.createElement("option");
        option.value = t;
        option.textContent = t;
        teacher.appendChild(option);
      });
    });
    teacher.addEventListener("change", () => {
      const selectedTeacher = teacher.value;
      const teacherClasses = teachersData.find(
        (t) => t.name === selectedTeacher
      ).classes;
      classSection.innerHTML = `<option value="#" selected>Select Class</option>`;
      Object.entries(teacherClasses).forEach(([key, value]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        classSection.appendChild(option);
      });
    });

    function assignStudent() {
      const selectedTeacher = teacher.value;
      const subTeacher = teachersData.find(
        (teacher) => teacher.name === selectedTeacher
      );
      //selected student
      const subStudent = studentsData.find(
        (student) => student.id === studentId
      );
      if (subTeacher) {
        const selectedClass = classSection.value;
        const subClass = subTeacher.classes[selectedClass];
        const exists = subClass.some((student) => student.id === subStudent.id);

        if (!exists) {
          subClass.push(subStudent);
        } else {
          console.log("Student already exists in this class");
        }
      }
      const updatedTeachers = teachersData.map((teacher) =>
        teacher.id === subTeacher.id ? subTeacher : teacher
      );
      localStorage.setItem("teachersData", JSON.stringify(updatedTeachers));
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      //selected teacher
      assignStudent();
    });
  }
});
