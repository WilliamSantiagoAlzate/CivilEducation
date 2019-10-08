var course = sessionStorage.getItem("course");
var title_course = sessionStorage.getItem("title_course");

document.getElementById("window-course").setAttribute("src", course)
document.getElementById("title-course").innerHTML = title_course
