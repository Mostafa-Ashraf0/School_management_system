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
