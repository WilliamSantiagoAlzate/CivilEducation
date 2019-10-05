var registro = localStorage.getItem("registro")
const modal = document.getElementById("modal")
const close = document.getElementById("close")

if (registro==1) {
  modal.style.display = "block";
}

close.addEventListener("click", () => {
  modal.style.display = "none";
})

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

// localStorage.setItem("registro",0);
