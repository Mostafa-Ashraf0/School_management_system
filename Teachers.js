let teachersData = JSON.parse(localStorage.getItem("teachersData")) || [];

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

//display add teachers form onclick
const addTeacherBtn = document.querySelector(".add-teacher");
const form = document.querySelector(".teachers-list form");
addTeacherBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  addTeacherBtn.classList.add("hidden");
});

//hide form onclick
const closeIcon = document.querySelector("#close");
closeIcon.addEventListener("click", () => {
  form.classList.add("hidden");
  addTeacherBtn.classList.remove("hidden");
});

form.addEventListener("submit", () => {
  form.classList.add("hidden");
  addTeacherBtn.classList.remove("hidden");
});

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

function createListItems() {
  const teachersList = document.querySelector(".list");
  const teachersStore = JSON.parse(localStorage.getItem("teachersData")) || [];
  const teachersItems = teachersStore
    .map((teacher) => {
      return `
      <div class="item flex items-center justify-between py-3 px-4 border-b-1 border-stone-200 hover:bg-blue-300" data-id = ${teacher.id}>
        <span class="text-center w-[25%]">${teacher.id}</span>
        <span class="text-center w-[25%]">${teacher.name}</span>
        <span class="text-center w-[25%]">${teacher.age}</span>
        <span class="text-center w-[25%]">${teacher.gender}</span>
        <span class="text-center w-[25%]"><i class="delete fa-solid fa-trash cursor-pointer" data-id = ${teacher.id}></i> | <i class="edit fa-solid fa-pen cursor-pointer" data-id = ${teacher.id}></i></span>
      </div>`;
    })
    .join("");
  teachersList.innerHTML = teachersItems;
}

//view profile onclick
// select the list because items are generated dynamically and not found on initial load
const list = document.querySelector(".list");
const profile = document.querySelector(".profile");
list.addEventListener("click", (e) => {
  const item = e.target.closest(".item");
  if (!item) return;
  if (!e.target.classList.contains("delete")) {
    const itemId = parseInt(item.getAttribute("data-id"));
    const teacher = teachersData.find((teacher) => teacher.id === itemId);
    profile.classList.remove("hidden");
    profile.innerHTML = `
                  <div class="profile-card w-[700px] h-[500px] bg-white rounded-3xl shadow-lg p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <i class="fa-solid fa-circle-xmark text-2xl text-blue-500 cursor-pointer absolute top-4 right-4" id="close-profile"></i>
                    <div class="img">
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="profile" class="w-[100px] h-[100px] object-cover rounded-full mx-auto mb-4">
                    </div>
                    <h2 class="text-2xl font-bold mb-4">${teacher.name}</h2>
                    <div class="lower flex flex-col items-center justify-between w-[100%] py-5 px-10 gap-10">
                      <div class="info w-[100%] flex items-center justify-center gap-10">
                        <p class="bg-red-500 py-1 px-3 text-base font-normal text-white rounded-3xl">Student ID: <span class="font-bold text-base">${teacher.id}</span></p>
                        <p class="bg-red-500 py-1 px-3 text-base font-normal text-white rounded-3xl">Age: <span class="font-bold text-base">${teacher.age}</span></p>
                      </div>
                    </div>
                </div>`;
    const closeProfile = document.querySelector("#close-profile");
    closeProfile.addEventListener("click", () => {
      profile.classList.add("hidden");
    });
  }
});

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
