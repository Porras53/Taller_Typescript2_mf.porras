import { Course } from './course.js';
import { Student } from './student.js';
import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudent.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox1: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box1")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);

renderStudentInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


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

function renderStudentInTable(students: Student[]): void {
    console.log('Desplegando información estudiante');
    students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${student.campo}</td>
                             <td>${student.valor}</td>`;
      studentsTbody.appendChild(trElement);
    });
  }

  function applyFilterByCredits() { 
    let text =Number(inputSearchBox1.value);
    let text2 =Number(inputSearchBox2.value);
    text = (isNaN(text)) ? 0 : text;
    text2 = (isNaN(text2)) ? 0 : text2;

    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(text,text2,dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  
  function searchCourseByCredits(minCre: number,maxCre: number ,courses: Course[]) {
    return minCre <0 || maxCre <0  ? dataCourses : courses.filter( c => 
      (c.credits >= minCre && c.credits <= maxCre));
  }


function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
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