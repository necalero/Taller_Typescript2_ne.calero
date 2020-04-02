import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var studentTbody = document.getElementById('student_data');
var coursesTbody = document.getElementById('courses');
var studentName = document.getElementById('student_name');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var minCredits = document.getElementById("exampleFormControlSelect1_min");
var maxCredits = document.getElementById("exampleFormControlSelect1_max");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () {
    filtrar();
};
renderStudent(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = " " + getTotalCredits(dataCourses);
function filtrar() {
    var cursosFilPorNomb = applyFilterByName(dataCourses);
    var cursosFiltrados = filtrarPorCreditos(cursosFilPorNomb);
    renderCoursesInTable(cursosFiltrados);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudent(student) {
    console.log('Desplegando estudiante');
    var h1element = document.createElement("h1");
    h1element.innerHTML = "" + student.nombre;
    studentName.appendChild(h1element);
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Codigo</td>\n                         <td>" + student.codigo + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Cedula</td>\n                         <td>" + student.cedula + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Edad</td>\n                         <td>" + student.edad + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Direccion</td>\n                         <td>" + student.direccion + "</td>";
    studentTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Telefono</td>\n                         <td>" + student.telefono + "</td>";
    studentTbody.appendChild(trElement);
}
function applyFilterByName(cursos) {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, cursos);
    return coursesFiltered;
}
function filtrarPorCreditos(cursos) {
    var min = minCredits.value;
    var max = maxCredits.value;
    clearCoursesInTable();
    var coursesFiltered = searchCoursesWithinCredits(min, max, cursos);
    return coursesFiltered;
}
function searchCoursesWithinCredits(min, max, courses) {
    var cursosARetornar = [];
    if (min <= max) {
        cursosARetornar = courses.filter(function (courseX) {
            return courseX.credits >= min && courseX.credits <= max;
        });
    }
    return cursosARetornar;
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
