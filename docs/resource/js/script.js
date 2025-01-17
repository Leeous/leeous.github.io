// Imports
import { fadeIn, fadeOut, paginate } from "./Util.js";

// Static variables
const safeHashArray = ['#about', '#projects', '#blog'];
const titleElement = document.querySelector("#index-header .title");
const wipBannerEnabled = false;

// Variables
let pfpClicks = 0;
let clickSafe = null;
let range = 5;

// Pride Title
if (!is_touch_enabled()) {
	document.body.addEventListener('mousemove', (event) => {
		const x = Math.round(event.pageX * range / window.innerWidth) - range / 2;
		const y = Math.round(event.pageY * range / window.innerHeight) - range / 2;
		gsap.to(titleElement, {
			'--x': x,
			'--y': y,
		});
	});
} else {
	gsap.to(titleElement, {
		'--x': -1,
		'--y': -1
	})
}

// Check if touch device
function is_touch_enabled() {
	return ('ontouchstart' in window) ||
		(navigator.maxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0);
}

// Attach slideshow logic
function activateSlideshow() {
	const slideshows = document.querySelectorAll('.slideshow');
	slideshows.forEach((slideshow) => {
		let slideshow_controls = slideshow.querySelector(".slideshow-controls");
		let slideshow_display = slideshow.querySelector(".slideshow-display");
		for (let i = 0; i < slideshow_controls.children.length; i++) {
			let control = slideshow_controls.children[i];
			control.dataset.order = i;
			control.addEventListener("click", (e) => {
				if (control.classList.contains("active_thumbnail")) { return; }
				let order = control.dataset.order;
				let new_slide = control.parentElement.parentElement.querySelector(`img[data-order="${order}"]`);
				let active_thumbnail = control.parentElement.querySelector(".active_thumbnail");
				let active_slide = control.parentElement.parentElement.querySelector(".active-slide");
				// Remove active classes
				active_thumbnail.classList.remove("active_thumbnail");
				active_slide.classList.remove("active-slide");
				// Add classes to new slide
				control.classList.add("active_thumbnail");
				new_slide.classList.add("active-slide");
				// console.log(slideshow_display.children[control.dataset.order].classList.add("active-slide"));
			});
		}

		for (let i = 0; i < slideshow_display.children.length; i++) {
			let display = slideshow_display.children[i];
			display.dataset.order = i;
		}
	});
}


// DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
	// Check if WIP banner is enabled
	if (wipBannerEnabled) { document.querySelector("#wip-banner").style.display = "block" }

	const lastUpdated = document.getElementById('pageLastUpdated');
	// let projects = new Object();
	// Check if hash changes, update active page
	// TODO: FIX LATER
	// window.addEventListener('hashchange', (hash) => {
	//   let oldHash = hash.oldURL.substring(hash.oldURL.indexOf('#'));
	//   let newHash = hash.newURL.substring(hash.newURL.indexOf('#'));
	//   // Validate new hash
	//   if (!safeHashArray.includes(newHash)) { return; }
	//   // Check if old hash exists, if not, fade out active page
	//   if (hash.oldURL.indexOf('#') == -1) {
	//     fadeOut(document.querySelector('.active-page'));
	//     fadeIn(newHash);
	//   } else {
	//     // Fade out old hash, fade in new
	//     fadeOut(oldHash, () => {
	//       fadeIn(newHash);
	//     });
	//   }
	//   // Change highlighted nav element if hash is a on-site anchor
	//   document.querySelector(".active-page").classList.remove("active-page");
	//   document.querySelector(`.nav-link[href="${newHash}"]`).classList.add("active-page");
	// });

	// PFP easter egg logic
	document.querySelector('#pfp').addEventListener('click', (e) => {
		const vineBoom = new Audio('resource/audio/vine-boom.mp3');
		if (pfpClicks != 25) {
			pfpClicks++;

			console.info(`${pfpClicks}/25 clicks!`);
		} else {
			// Start easter egg
			document.querySelector(`body`).insertAdjacentHTML('beforebegin',
				`
					<div class="easter-egg">

						<img src="resource/imgs/profile_easter.jpg" alt="A drawing of me in the Family Guy art style.">
					</div>
				`
			);
			var animation = document.querySelector('.easter-egg img').animate([{ opacity: "0" }],
				{
					fill: "forwards",
					duration: 1250
				});
			animation.play();
			vineBoom.play();
			animation.onfinish = () => {
				document.querySelector('.easter-egg').remove();
			};
		}
	})

	// Display last update to website in footer
	fetch('https://api.github.com/repos/Leeous/Leeous.github.io/commits').then(res => {
		if (!res.ok) {
			throw new Error();
		} else {
			return res.json();
		}
	}).then(data => {
		lastUpdated.innerHTML =
			`page last updated <a href="${data[0]['html_url']}" target="_blank">${moment(data[0]['commit']['author']['date']).startOf('second').fromNow()}</a><br/>
				<span class="update-desc">${data[0]['commit']['message']}</span></span>`;
	}).catch(error => {
		console.log(error);
	});

	// Project data request
	fetch('resource/js/project_data.json')
		.then((resp) => resp.json())
		.then(projectData => populateProjects(projectData))
		.catch(error => console.log(error));

	// Project data request
	fetch('resource/js/blog_data.json')
		.then((resp) => resp.json())
		.then(blogData => { populateBlog(blogData) })
		.catch(function (error) {
			console.log(error);
		});


	let posts = [];
	// Parses the JSON file with blog data
	function populateBlog(blogData) {
		Object.keys(blogData["posts"]).forEach((key) => {
			// Push blogData into posts[]
			posts.push(blogData["posts"][key]);
		});

		if (posts.length > 4) {
			let postsPaginated = paginate(posts, 4, false, "#blog", "blog");
			let currentPage = 1;

			postsPaginated.forEach((array) => {
				for (let i = 0; i < array.length; i++) {
					let element = array[i];
					document.querySelector(`.page-blog-${currentPage}`).insertAdjacentHTML('beforeend', `
						<article class="post">
						<h1 class="title">${element["title"]}</h1>
						<h5 class="date">${element.published_date}</h5>
							<p>${element.content}</p>
							${element.images ? element.images : ""}
						</article>
					`);
				}
				// Advance current page once for loop completes
				currentPage++;
			});
		} else {
			posts.reverse();
			posts.forEach((array) => {
				document.querySelector(`#blog`).insertAdjacentHTML('beforeend', `
						<article class="post">
						<h1 class="title">${array["title"]}</h1>
						<h5 class="date">${array.published_date}</h5>
							<p>${array.content}</p>
							${array.images ? array.images : ""}
						</article>
					`);
			});
		}

		activateSlideshow();
	}

	let projects = [];
	// Parses the JSON file with project data
	function populateProjects(projectData) {

		Object.keys(projectData).forEach(function (key) {
			// Get Github data if project has a link for it
			if (projectData[key].links.github_api) {
				// populateGData(projectData[key].links.github_api, projectData[key].id); TEMP
			}
			projects.push(projectData[key])
		});

		console.log(projects)

		if (projects.length > 4) {
			
			let projectsPaginated = paginate(projects, 4, false, ".projects_container", "projects");
			let currentPage = 1;

			projectsPaginated.forEach((array) => {
				for (let i = 0; i < array.length; i++) {
					let element = array[i];
					console.log(element)
					document.querySelector(`.page-projects-${currentPage}`).insertAdjacentHTML('beforeend', `
							<div class="project" projectData-id="${projectData.id}">
								<h3 class="project_title">${element.name}</h3>
								${element.icon ? element.icon : ''}
								<!--<p class="project_last_update">updated <i>102 days ago</i></p>-->
								<p class="project_desc">${element.desc}</p>
								<div class="project_tags">${element.tags.archived ? element.tags.archived : ''}${element.tags.abandoned ? element.tags.abandoned : ''}${element.tags.finished ? element.tags.finished : ''}${element.tags.WIP ? element.tags.WIP : ''}
								<div class="project_gdata"></div>
								<div class="project_links">${element.links.source ? element.links.source : ''}${element.links.github ? element.links.github : ''}${element.links.steam ? element.links.steam : ''} ${element.links.nexus ? element.links.nexus : ''}</div>
							</div>
						`);
				}
				// Advance current page once for loop completes
				currentPage++;
			});
		} else {
			projects.forEach((array) => {
				document.querySelector(`#blog`).insertAdjacentHTML('beforeend', `
						<article class="post">
						<h1 class="title">${array["title"]}</h1>
						<h5 class="date">${array.published_date}</h5>
							<p>${array.content}</p>
							${array.images ? array.images : ""}
						</article>
					`);
			});
		}
	}

	function populateGData(url, id) {
		fetch(url).then(res => {
			if (!res.ok) {
				throw new Error();
			} else {
				return res.json();
			}
		}).then(data => {
			let gStars = data.stargazers_count;
			document.querySelector(`[projectData-id="${id}"] .project_gdata`).insertAdjacentHTML('beforeend', `
				<p class="stars">⭐ ${gStars}</p>
				`);
		})
	}

	// Navigation bar
	const navElements = document.querySelectorAll('.nav-link');
	if (!window.location.hash || !safeHashArray.includes(window.location.hash)) {
		fadeIn('#about', null, 10); // Fade in initnal page - unless there's an anchor tag
		document.querySelector('[data-fadein="#about"').classList.add('active-page');
	} else {
		fadeIn(window.location.hash, null, 10); // Fade in initnal page - unless there's an anchor tag
		document.querySelector(`[data-fadein="${window.location.hash}"`).classList.add('active-page');
	}

	// Handles class switching for the navigation bar
	navElements.forEach((key) => {
		key.addEventListener('click', () => {
			clickSafe = false;
			if (key.classList.contains('active-page') || clickSafe) { return; }
			fadeOut(document.querySelector('.active-page').dataset.fadein, () => {
				fadeIn(key.dataset.fadein, () => {
					clickSafe = true;
				});
			});
			document.querySelector('.active-page').classList.remove('active-page');
			key.classList.add('active-page');
		});
	});

	// Add event listener for link click
	document.querySelectorAll('.open_project').forEach((e) => { e.addEventListener('click', () => { window.open(e.dataset.link) }) });
});