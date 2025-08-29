const isLoggedIn = localStorage.getItem("isLoggedIn");
let studentsData = [];
//prevent access to Dashboard if not logged in
if (isLoggedIn !== "true") {
  window.location.href = "index.html";
}

//data fetching
async function fetchData() {
  try {
    const response = await fetch("students_50.json");
    const data = await response.json();
    studentsData = data;
    drawGender();
    drawAge();
    drawHours();
    cardsStart();
    createListItems();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}
fetchData();

//cards data
const totalStudents = document.querySelector(".t-students");
const totalHours = document.querySelector(".t-hours");
const averageAge = document.querySelector(".a-age");
const averageHours = document.querySelector(".a-hours");

function setTotalStudents() {
  const total = studentsData.length;
  for (let i = 0; i <= total; i++) {
    setTimeout(() => {
      totalStudents.innerHTML = i.toFixed(0);
    }, i * 20);
  }
}

function setTotalHours() {
  const total = studentsData.reduce((total, e) => {
    return total + e.total_hours;
  }, 0);
  for (let i = 0; i <= total; i++) {
    setTimeout(() => {
      totalHours.innerHTML = i.toFixed(0);
    }, i * 0.4);
  }
}

function setAverageAge() {
  const total = studentsData.reduce((total, e) => {
    return total + e.age;
  }, 0);
  const average = total / studentsData.length;
  for (let i = 0; i <= average; i++) {
    setTimeout(() => {
      averageAge.innerHTML = i.toFixed(0);
    }, i * 20);
  }
}

function setAverageHours() {
  const total = studentsData.reduce((total, e) => {
    return total + e.total_hours;
  }, 0);
  const average = total / studentsData.length;
  for (let i = 0; i <= average; i++) {
    setTimeout(() => {
      averageHours.innerHTML = i.toFixed(0);
    }, i * 20);
  }
}

function cardsStart() {
  setTotalStudents();
  setTotalHours();
  setAverageAge();
  setAverageHours();
}

//data functions
function male(data) {
  return studentsData.filter((e) => e.gender === "Male").length;
}
function female(data) {
  return studentsData.filter((e) => e.gender === "Female").length;
}

//students list view
function createListItems() {
  const studentsList = document.querySelector(".list");
  const studentsItems = studentsData
    .map((student) => {
      return `
      <div class="item flex items-center justify-between py-1 px-1 border-b-1 border-stone-200">
        <span class="text-center w-[25%]">${student.name}</span>
        <span class="text-center w-[25%]">${student.age}</span>
        <span class="text-center w-[25%]">${student.gender}</span>
        <span class="text-center w-[25%]">${student.total_hours}</span>
      </div>`;
    })
    .join("");
  studentsList.innerHTML += studentsItems;
}

// gender chart
function drawGender() {
  const gender = document.getElementById("gender");
  const Male = male(studentsData);
  const Female = female(studentsData);

  new Chart(gender, {
    type: "doughnut",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "count",
          data: [Male, Female],
          borderWidth: 3,
          backgroundColor: ["#7a84e4ff", "#2410d8ff"],
        },
      ],
    },
    options: {
      responsive: true, // default: true
      maintainAspectRatio: false,
      scales: {
        y: {
          display: false,
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Gender Distribution of Students",
          align: "start",
          font: {
            size: 15,
            weight: "bold",
          },

          color: "#333",
          padding: { top: 5, bottom: 20 },
        },
      },
    },
  });
}

//Age chart
function drawAge() {
  const section1 = studentsData.filter(
    (e) => (e.age >= 18) & (e.age <= 20)
  ).length;
  const section2 = studentsData.filter(
    (e) => (e.age >= 21) & (e.age <= 23)
  ).length;
  const section3 = studentsData.filter(
    (e) => (e.age >= 24) & (e.age <= 26)
  ).length;
  const age = document.getElementById("age");
  new Chart(age, {
    type: "pie",
    data: {
      labels: ["18-20", "21-23", "24-26"],
      datasets: [
        {
          label: "count",
          data: [section1, section2, section3],
          borderWidth: 3,
          backgroundColor: ["#60A5FA", "#3444d3ff", "#5161e9ff"],
        },
      ],
    },
    options: {
      responsive: true, // default: true
      maintainAspectRatio: false,
      scales: {
        y: {
          display: false,
          beginAtZero: true,
        },
      },
      // enable title
      plugins: {
        title: {
          display: true,
          text: "Age Distribution of Students",
          align: "start",
          font: {
            size: 15,
            weight: "bold",
          },
          color: "#333",
          padding: { top: 5, bottom: 20 },
        },
      },
    },
  });
}

// hours chart
function drawHours() {
  const section1 = studentsData.filter(
    (e) => (e.total_hours >= 0) & (e.total_hours <= 50)
  ).length;
  const section2 = studentsData.filter(
    (e) => (e.total_hours >= 51) & (e.total_hours <= 80)
  ).length;
  const section3 = studentsData.filter(
    (e) => (e.total_hours >= 81) & (e.total_hours <= 100)
  ).length;
  const section4 = studentsData.filter(
    (e) => (e.total_hours >= 101) & (e.total_hours <= 130)
  ).length;
  const section5 = studentsData.filter(
    (e) => (e.total_hours >= 131) & (e.total_hours <= 160)
  ).length;
  const hours = document.getElementById("hours");
  new Chart(hours, {
    type: "bar",
    data: {
      labels: ["0-50", "51-80", "81-100", "101-130", "131-160"],
      datasets: [
        {
          label: "count",
          data: [section1, section2, section3, section4, section5],
          borderWidth: 1,
          backgroundColor: [
            "#60A5FA",
            "#3444d3ff",
            "#5161e9ff",
            "#2a36aaff",
            "#111433ff",
          ],
        },
      ],
    },
    options: {
      responsive: true, // default: true
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      // enable title
      plugins: {
        title: {
          display: true,
          text: "Hours Distribution of Students",
          align: "start",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
          padding: { top: 10, bottom: 30 },
        },
      },
    },
  });
}
