export function createListItems() {
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
