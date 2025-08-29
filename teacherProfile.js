let teachersData = JSON.parse(localStorage.getItem("teachersData")) || [];

export function drawTeacherProfile() {
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
}
