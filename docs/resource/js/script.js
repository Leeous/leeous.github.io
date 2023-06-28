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
  // Last update to website
  fetch('https://api.github.com/repos/Leeous/Leeous.github.io/commits')
    .then(res => {
      if (!res.ok) {
        throw new Error();
      } else {
        console.log('data recieved');
        return res.json();
      }
    }).then(data => {
      lastUpdated.innerText = `page last updated ${moment(data[0]['commit']['author']['date']).startOf('day').fromNow()}`; 
    })
    .catch( error => {
      console.log(error);
    });

  // Fetch repo API data
  fetch('https://api.github.com/users/Leeous')
  //Convert the response to a JSON object
    .then(response => response.json()) 
    .then( data => document.body.append())
		.catch( error => {
      if (!response.ok) {
        console.error('Something went wrong!\n' + error);
      } else {
        console.log("Retrived repo API data!")
      }
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

  // Navagation bar
  const navElements = document.querySelectorAll('.nav_link');
  if (!window.location.hash || !safeHashArray.includes(window.location.hash)) {
    fadeIn('#about', null, 10); // Fade in initnal page - unless there's an anchor tag
    document.querySelector('[data-fadein="#about"').classList.add('active_page');
  } else {
    fadeIn(window.location.hash, null, 10); // Fade in initnal page - unless there's an anchor tag
    document.querySelector(`[data-fadein="${window.location.hash}"`).classList.add('active_page');
  }

  // window.onhashchange = () => {
  //   let currentHash = (window.location.hash).substring("#");
  //   console.log(currentHash)
  //   fadeOut(document.querySelector('.active_page'), null, 10);
  //   fadeIn(document.querySelector(currentHash));
  // }
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
    // TODO: Add detailed animation to display product details
  });
}

if (!window.location.hash || !safeHashArray.includes(window.location.hash)) {
  fadeIn('#about', null, 10); // Fade in initnal page - unless there's an anchor tag
  document.querySelector('[data-fadein="#about"').classList.add('active_page');
} else {
  fadeIn(window.location.hash, null, 10); // Fade in initnal page - unless there's an anchor tag
  document.querySelector(`[data-fadein="${window.location.hash}"`).classList.add('active_page');
}