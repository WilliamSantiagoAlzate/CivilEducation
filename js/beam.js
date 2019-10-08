const flexure = document.getElementById("flexure")
const shear = document.getElementById("shear")
const torsion = document.getElementById("torsion")
const detail = document.getElementById("detail")

flexure.addEventListener("click", function(){saveValues(flexure)});
shear.addEventListener("click", function(){saveValues(shear)});
torsion.addEventListener("click", function(){saveValues(torsion)});
detail.addEventListener("click", function(){saveValues(detail)});

function saveValues(course) {
  sessionStorage.setItem("course", course.getAttribute("id") + ".html");
  sessionStorage.setItem("title_course", course.innerHTML);
}
