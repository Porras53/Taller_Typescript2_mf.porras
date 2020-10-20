import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBox1 = document.getElementById("search-box1");
var inputSearchBox2 = document.getElementById("search-box2");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando información estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.campo + "</td>\n                             <td>" + student.valor + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var text = Number(inputSearchBox1.value);
    var text2 = Number(inputSearchBox2.value);
    text = (isNaN(text)) ? 0 : text;
    text2 = (isNaN(text2)) ? 0 : text2;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(text, text2, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(minCre, maxCre, courses) {
    return minCre < 0 || maxCre < 0 ? dataCourses : courses.filter(function (c) {
        return (c.credits >= minCre && c.credits <= maxCre);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
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
