let studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];

export function drawStudentProfile() {
  const list = document.querySelector(".list");
  const profile = document.querySelector(".profile");

  list.addEventListener("click", (e) => {
    const item = e.target.closest(".item");
    if (!item) return;
    if (
      !e.target.classList.contains("delete") &
      !e.target.classList.contains("edit") &
      !e.target.classList.contains("add")
    ) {
      const itemId = parseInt(item.getAttribute("data-id"));
      const student = studentsData.find((student) => student.id === itemId);
      profile.classList.remove("hidden");
      profile.innerHTML = `
                  <div class="profile-card w-[700px] h-[500px] bg-white rounded-3xl shadow-lg p-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <i class="fa-solid fa-circle-xmark text-2xl text-blue-500 cursor-pointer absolute top-4 right-4" id="close-profile"></i>
                    <div class="img">
                        <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="profile" class="w-[100px] h-[100px] object-cover rounded-full mx-auto mb-4">
                    </div>
                    <h2 class="text-2xl font-bold mb-4">${student.name}</h2>
                    <div class="lower flex flex-col items-center justify-between w-[100%] py-5 px-10 gap-10">
                      <div class="info w-[100%] flex items-center justify-center gap-10">
                        <p class="bg-red-500 py-1 px-3 text-base font-normal text-white rounded-3xl">Student ID: <span class="font-bold text-base">${student.id}</span></p>
                        <p class="bg-red-500 py-1 px-3 text-base font-normal text-white rounded-3xl">Age: <span class="font-bold text-base">${student.age}</span></p>
                        <p class="bg-red-500 py-1 px-3 text-base font-normal text-white rounded-3xl">Total Hours: <span class="font-bold text-base">${student.total_hours}</span></p>
                      </div>
                      <ul class="w-[100%] flex flex-col items-start gap-5">
                              <li class="font-medium text-base">Math: <span class="bg-blue-500 py-1 px-3 text-base font-normal text-white rounded-3xl">${student.grades.Math}</span></li>
                              <li class="font-medium text-base">English: <span class="bg-blue-500 py-1 px-3 text-base font-normal text-white rounded-3xl">${student.grades.English}</span></li>
                              <li class="font-medium text-base">Physics: <span class="bg-blue-500 py-1 px-3 text-base font-normal text-white rounded-3xl">${student.grades.Physics}</span></li>
                              <li class="font-medium text-base">Chemistry: <span class="bg-blue-500 py-1 px-3 text-base font-normal text-white rounded-3xl">${student.grades.Chemistry}</span></li>
                              <li class="font-medium text-base">Biology: <span class="bg-blue-500 py-1 px-3 text-base font-normal text-white rounded-3xl">${student.grades.Biology}</span></li>
                      </ul>
                    </div>
                </div>`;
      const closeProfile = document.querySelector("#close-profile");
      closeProfile.addEventListener("click", () => {
        profile.classList.add("hidden");
      });
    }
  });
}
