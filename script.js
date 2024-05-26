"use strict";
import courses from './courses.json' with { type: 'json' };

const $ = (selector) => document.getElementById(selector);

const activeContainer = $('category-visualization-section-active-cards');
const inactiveContainer = $('category-visualization-section-inactive-cards');
const search = $('category-visualization-section-filter-input');
const addCategoryButton = $('category-visualization-section-create-button');
const optionsButton = $('card-options');

class CardComponent extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'No title';
        const lessonCount = this.getAttribute('lesson-count') || 0;
        const instructor = this.getAttribute('instructor') || 'Jhon Doe';
        const instructorDate = this.getAttribute('instructor-date') || '9999-99-99';
        const editor = this.getAttribute('editor') || 'Jhon Doe';
        const editorDate = this.getAttribute('editor-date') || '9999-99-99';


        this.innerHTML = `
        <div class="card" style="max-width: 387px; max-height: 420px;">
            <img src="img/card.png" class="card-img-top" alt="Imagen de curso">
            <div class="card-body"
                style="position:relative; display: flex; flex-direction: column; gap: 20px;">
                <h5 class="card-title" style="text-align: center;">${title}</h5>
                <button id="card-options-${title}" height="24px" width="24px"style="position: absolute; right: 10px;">
                    <img src="img/dots.svg" alt="dots" >
                </button>
                
                <div id="myMenu-${title}" class="options-menu">
                    <a href="#">Editar</a>
                    <a href="#">Deshabilitar</a>
                </div>

                <div style="display: flex; align-items: center; gap: 5px;">
                    <img src="img/card.png" alt="Icon unknown" width="30px" height="30px">
                    <p style="width: 100%; margin: 0;">${lessonCount} lecciones</p>
                </div>
                <div style="display: flex; align-items: center; gap:5px;">
                    <img src="img/card.png" alt="Icon unknown" width="30px" height="30px">
                    <p style="width: 100%; margin: 0;">${instructor} - ${instructorDate}</p>
                </div>
                <p style="text-align: end;">${editor} - ${editorDate}</p>
            </div>
        </div>
        `;
    }
}

function showCards() {
    courses.forEach(course => {
        const card = document.createElement('card-component');
        card.setAttribute('title', course.title);
        card.setAttribute('lesson-count', course.lessonCount);
        card.setAttribute('instructor', course.instructor);
        card.setAttribute('instructor-date', course.instructorDate);
        card.setAttribute('editor', course.editor);
        card.setAttribute('editor-date', course.editorDate);
        if (course.status) {
            activeContainer.appendChild(card);
        } else {
            inactiveContainer.appendChild(card);
        }
        const button = $(`card-options-${course.title}`);
        button.addEventListener('click', () => {
            showMenu(course.title);
        })
    })
}

function showMenu(title) {
    var menu = document.getElementById(`myMenu-${title}`);
    if (menu.style.display === "none") {
        menu.style.display = "block";
        menu.style.left = event.pageX + "px";
        menu.style.top = event.pageY + "px";
    } else {
        menu.style.display = "none";
    }
}


function filterCourses() {
    activeContainer.innerHTML = '';
    inactiveContainer.innerHTML = '';
    courses.forEach(course => {
        if (course.title.toLowerCase().includes(search.value.toLowerCase())) {
            const card = document.createElement('card-component');
            card.setAttribute('title', course.title);
            card.setAttribute('lesson-count', course.lessonCount);
            card.setAttribute('instructor', course.instructor);
            card.setAttribute('instructor-date', course.instructorDate);
            card.setAttribute('editor', course.editor);
            card.setAttribute('editor-date', course.editorDate);
            if (course.status) {
                activeContainer.appendChild(card);
            } else {
                inactiveContainer.appendChild(card);
            }
        }
    })

}

function addCategory() {
    const title = prompt("Enter the category title:");
    const lessonCount = prompt("Enter the number of lessons:");
    const instructor = prompt("Enter the instructor:");
    const instructorDate = prompt("Enter the instructor date:");
    const editor = prompt("Enter the editor:");
    const editorDate = prompt("Enter the editor date:");

    const card = document.createElement('card-component');
    card.setAttribute('title', title);
    card.setAttribute('lesson-count', lessonCount);
    card.setAttribute('instructor', instructor);
    card.setAttribute('instructor-date', instructorDate);
    card.setAttribute('editor', editor);
    card.setAttribute('editor-date', editorDate);
    activeContainer.appendChild(card);

    alert("Category added successfully");
}

customElements.define('card-component', CardComponent);
document.addEventListener('DOMContentLoaded', showCards);
search.addEventListener('input', filterCourses);
addCategoryButton.addEventListener('click', () => {
    addCategory();
})