//display add student form onclick
export function formDisplay(btn, form) {
  btn.addEventListener("click", () => {
    form.classList.remove("hidden");
    btn.classList.add("hidden");
  });

  //hide form onclick
  const closeIcon = document.querySelector("#close");
  closeIcon.addEventListener("click", () => {
    form.classList.add("hidden");
    btn.classList.remove("hidden");
  });

  form.addEventListener("submit", () => {
    form.classList.add("hidden");
    btn.classList.remove("hidden");
  });
}
