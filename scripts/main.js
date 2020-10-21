import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudent.js';
let coursesTbody = document.getElementById('courses');
let studentsTbody = document.getElementById('infoStudent');
const btnfilterByName = document.getElementById("button-filterByName");
const btnFiltrarCreditos = document.getElementById("btnFiltrarCreditos");
const inputSearchBox = document.getElementById("search-box");
const inputValorMin = document.getElementById("rango-min");
const inputValorMax = document.getElementById("rango-max");
const totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = () => applyFilterByName();
btnFiltrarCreditos.onclick = () => applyFilterByCredits();
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`;
function renderCoursesInTable(courses) {
    courses.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
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
function getTotalCredits(courses) {
    let totalCredits = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}
function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered = searchCourseByName(text, dataCourses);
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
    let coursesFiltered = filtrarCreditos(valorMin, valorMax, dataCourses);
    totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`;
    renderCoursesInTable(coursesFiltered);
}
function filtrarCreditos(valorMin, valorMax, courses) {
    let cursosFiltrados = [];
    for (let i = 0; i < courses.length; i++) {
        if (Number(courses[i].credits) >= Number(valorMin) && Number(courses[i].credits) <= Number(valorMax)) {
            cursosFiltrados.push(courses[i]);
        }
    }
    return cursosFiltrados;
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(c => c.name.match(nameKey));
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
