const btn = document.querySelector(".page-main a");
const modal = document.querySelector(".modal-overlay");
const exit = document.querySelector("form a");

btn.addEventListener("click", () => {
    modal.classList.add("active");
});

exit.addEventListener("click", () => {
    modal.classList.remove("active");
})