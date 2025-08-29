export function createListItems() {
  const studentsList = document.querySelector(".list");
  const studentsStore = JSON.parse(localStorage.getItem("studentsData")) || [];
  const studentsItems = studentsStore
    .map((student) => {
      return `
      <div class="item flex items-center justify-between py-3 px-4 border-b-1 border-stone-200 hover:bg-blue-300" data-id = ${student.id}>
        <span class="text-center w-[25%]">${student.id}</span>
        <span class="text-center w-[25%]">${student.name}</span>
        <span class="text-center w-[25%]">${student.age}</span>
        <span class="text-center w-[25%]">${student.gender}</span>
        <span class="text-center w-[25%]">${student.total_hours}</span>
        <span class="text-center w-[25%]">
        <i class="delete fa-solid fa-trash cursor-pointer" data-id = ${student.id}></i> | 
        <i class="edit fa-solid fa-pen cursor-pointer" data-id = ${student.id}></i> |
        <i class="add fa-solid fa-plus cursor-pointer" data-id = ${student.id}></i>
        </span>
      </div>`;
    })
    .join("");
  studentsList.innerHTML = studentsItems;
}
