// Imports
import { fadeIn, fadeOut } from "./Util.js";


// Static variables
const safeHashArray = ['#about', '#projects', '#blog'];

// Variables
let clickSafe = null;

// DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
  const lastUpdated = document.getElementById('pageLastUpdated');
  let projects = new Object();
  // checkHash();
  // Display last update to website in footer
  fetch('https://api.github.com/repos/Leeous/Leeous.github.io/commits').then(res => {
      if (!res.ok) {
        throw new Error();
      } else {
        return res.json();
      }
    }).then(data => {
      console.log(data);
      lastUpdated.innerHTML = 
        `page last updated <a href="${data[0]['html_url']}" target="_blank">${moment(data[0]['commit']['author']['date']).startOf('hour').fromNow()}</a><br/>
        <span class="update_desc">${data[0]['commit']['message']}</span></span>`; 
    }).catch( error => {
      console.log(error);
    });

  // Projects request
  fetch('resource/js/data.json')
    .then((resp) => resp.json())
    .then(function (projectData) {
      populateProjects(projectData.addons);
      populateProjects(projectData.projects);
    })
    .catch(function (error) {
      console.log(error);
    });

  // Parses the JSON file with project data
  function populateProjects(projectData) {
    Object.keys(projectData).forEach(function (key) {
      // ${projectData[key].source ? `<button class='padding-small source open_project' data-link='${projectData[key].source}'>Source</button>` : ""}
      // ${projectData[key].github ? `<button class='padding-small github open_project' data-link='${projectData[key].github}'>GitHub</button>` : ""}
      // ${projectData[key].steam ? `<button class='padding-small steam open_project' data-link='${projectData[key].steam}'>Steam</button>` : ""}
      const projectTemplate = `
        <div class="project" projectData-id="${projectData[key].id}">
        <h3 class="project_title">${projectData[key].name}</h3>
        <!--<p class="project_last_update">updated <i>102 days ago</i></p>-->
        <p class="project_desc">${projectData[key].desc}</p>
        <div class="project_links">${projectData[key].links.source ? projectData[key].links.source : ''}${projectData[key].links.github ? projectData[key].links.github : ''}${projectData[key].links.steam ? projectData[key].links.steam : ''}</div>
        </div>
      `;
      document.querySelector('#index_main #projects').insertAdjacentHTML('afterbegin', projectTemplate);
      // TODO: Add detailed animation to display projects details
    });
  }

  // Navagation bar
  const navElements = document.querySelectorAll('.nav_link');
  if (!window.location.hash || !safeHashArray.includes(window.location.hash)) {
    fadeIn('#about', null, 10); // Fade in initnal page - unless there's an anchor tag
    document.querySelector('[data-fadein="#about"').classList.add('active_page');
  } else {
    fadeIn(window.location.hash, null, 10); // Fade in initnal page - unless there's an anchor tag
    document.querySelector(`[data-fadein="${window.location.hash}"`).classList.add('active_page');
  }

  // Slideshow logic
  const slideshows = document.querySelectorAll('.slideshow');
  slideshows.forEach((slideshow) => {
    let slideshow_controls = slideshow.querySelector(".slideshow_controls");
    let slideshow_display = slideshow.querySelector(".slideshow_display");
    // console.log(slideshow_controls, slideshow_display);
    for (let i = 0; i < slideshow_controls.children.length; i++)
    {
      let control = slideshow_controls.children[i];
      control.dataset.order = i;
      control.addEventListener("click", (e) => {
        if (control.classList.contains("active_thumbnail")) { return; }
        let order = control.dataset.order;
        let new_slide = control.parentElement.parentElement.querySelector(`img[data-order="${order}"]`);
        let active_thumbnail = control.parentElement.querySelector(".active_thumbnail");
        let active_slide = control.parentElement.parentElement.querySelector(".active_slide");
        // Remove active classes
        active_thumbnail.classList.remove("active_thumbnail");
        active_slide.classList.remove("active_slide");
        // Add classes to new slide
        control.classList.add("active_thumbnail");
        new_slide.classList.add("active_slide");
        // console.log(slideshow_display.children[control.dataset.order].classList.add("active_slide"));
      });
    }

    for (let i = 0; i < slideshow_display.children.length; i++)
    {
      let display = slideshow_display.children[i];
      display.dataset.order = i;
    }
  });

  // Handles class switching for the navagation bar
  navElements.forEach((key) => {
    key.addEventListener('click', () => {
      clickSafe = false;
      if (key.classList.contains('active_page') || clickSafe) { return; }
      fadeOut(document.querySelector('.active_page').dataset.fadein, () => {
        fadeIn(key.dataset.fadein, () => {
          clickSafe = true;
        });
      });
      document.querySelector('.active_page').classList.remove('active_page');
      key.classList.add('active_page');
    });
  });

  // Add event listener for link click
  document.querySelectorAll('.open_project').forEach((e) => { e.addEventListener('click', () => { window.open(e.dataset.link) })});
});