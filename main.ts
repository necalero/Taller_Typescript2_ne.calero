import { Course } from './Course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './Student.js';
import { dataStudent } from './dataStudent.js';

let studentTbody: HTMLElement = document.getElementById('student_data')!;
let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentName: HTMLElement = document.getElementById('student_name')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const minCredits: HTMLOptionElement = <HTMLOptionElement> document.getElementById("exampleFormControlSelect1_min")!;
const maxCredits: HTMLOptionElement = <HTMLOptionElement> document.getElementById("exampleFormControlSelect1_max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => {
  applyFilterByName();
  filtrarPorCreditos();
}

renderStudent(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = ` ${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudent(student: Student): void {
  console.log('Desplegando estudiante');
  let h1element = document.createElement("h1");
  h1element.innerHTML = `${student.nombre}`;
  studentName.appendChild(h1element);
  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Codigo</td>
                         <td>${student.codigo}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Cedula</td>
                         <td>${student.cedula}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Edad</td>
                         <td>${student.edad}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Direccion</td>
                         <td>${student.direccion}</td>`;
  studentTbody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Telefono</td>
                         <td>${student.telefono}</td>`;
  studentTbody.appendChild(trElement);
}



function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function filtrarPorCreditos() {
  let min: any = minCredits.value;
  let max: any = maxCredits.value;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCoursesWithinCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCoursesWithinCredits(min: number, max: number, courses: Course[]) {
  let cursosARetornar: Course[] = [];
  if (min <= max) {
    cursosARetornar = courses.filter(function(courseX){
      return courseX.credits>=min && courseX.credits<=max; 
    });
  }
  return cursosARetornar;
  
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);

    }
  }
}