import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudent.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('infoStudent')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnFiltrarCreditos: HTMLElement = document.getElementById("btnFiltrarCreditos")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputValorMin: HTMLInputElement = <HTMLInputElement>document.getElementById("rango-min")!;
const inputValorMax: HTMLInputElement = <HTMLInputElement>document.getElementById("rango-max")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnFiltrarCreditos.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentsInTable(students: Student[]): void {
  students.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Codigo</td>
                           <td>${c.codigo}</td>`;
    studentsTbody.appendChild(trElement);
  });

  students.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Cedula</td>
                           <td>${c.cedula}</td>`;
    studentsTbody.appendChild(trElement);
  });

  students.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Edad</td>
                           <td>${c.edad}</td>`;
    studentsTbody.appendChild(trElement);
  });

  students.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Direccion</td>
                           <td>${c.direccion}</td>`;
    studentsTbody.appendChild(trElement);
  });

  students.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Numero</td>
                           <td>${c.telefono}</td>`;
    studentsTbody.appendChild(trElement);
  });
}


function getTotalCredits(courses: Course[]): number 
{
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}


function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() {
  let valorMin = inputValorMin.value;
  let valorMax = inputValorMax.value;
  //text = (text == null) ? '' : text;
  if (valorMin == '') {
    valorMin = '0';
  }
  if (valorMax == '') {
    valorMax = '0';
  }
  clearCoursesInTable();
  let coursesFiltered: Course[] = filtrarCreditos(valorMin, valorMax, dataCourses);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
  renderCoursesInTable(coursesFiltered);
}


function filtrarCreditos(valorMin: string, valorMax: string, courses: Course[]) {
  let cursosFiltrados = [];
  for (let i = 0; i < courses.length; i++) {
    if (Number(courses[i].credits) >= Number(valorMin) && Number(courses[i].credits) <= Number(valorMax)) 
    {
      cursosFiltrados.push(courses[i]);
    }
  }
  return cursosFiltrados;
}


function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter(c =>
    c.name.match(nameKey));
}


function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}

