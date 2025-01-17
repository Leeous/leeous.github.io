export { fadeIn, fadeOut, paginate }

/**
 *  Paginates array and creates pages for elements
 * 
 *  **DOES NOT PLACE ELEMENTS**
 *  @param {Array} array - array to paginate
 *  @param {Number} itemLimit - number of elements per page
 *  @param {Boolean} reverse - Reverse array data?
 *  @param {String} pageContainer - Selector where data will be placed
 *  @param {String} pageTagName - string that we'll use to navigate pages
 *  @returns {Array} items chunked based on itemLimit
 */

var paginate = function paginate(array, itemLimit, reverse, pageContainer, pageTagName) {
  let itemsPaginated = [];

  reverse ? array.reverse() : null;

  // Number of pages generated based on posts.length
  let pagesGenerated = 0;
  // Chucks array based on 
  let currentItemCount = 0;
  // Ticks up to posts.length
  let overallItemCount = 0;

  // If posts exceeds pageLimit, begin pagination logic
  for (let i = 0; i < array.length; i += itemLimit) {
    currentItemCount++;
    overallItemCount++;
    // Tick page gen
    pagesGenerated++;

    // Create page
    let page = document.createElement("div");
    page.setAttribute("class", `page-${pagesGenerated == 1 ? `${pageTagName}-${pagesGenerated} active-${pageTagName}-page` : `${pageTagName}-${pagesGenerated}`}`);

    // Append page
    document.querySelector(pageContainer).appendChild(page);

    // Insert current posts into page
    itemsPaginated.push(array.slice(i, i + itemLimit));
  }

  // Insert pagination control elements
  document.querySelector(pageContainer).insertAdjacentHTML("beforeend", `
    <div class="page-controls">
      <button class="button-normal ${pageTagName}-previous-page">&lt;</button>
      <div class="pages-${pageTagName}"></div>
      <button class="button-normal ${pageTagName}-next-page">&gt;</button>
    </div>
  `);

  // Insert page numbers based on pagesGenerated
  for (let i = 1; i < itemsPaginated.length + 1; i++) {
    document.querySelector(`.pages-${pageTagName}`).insertAdjacentHTML("beforeend", `<p class="page-${pageTagName}-click ${i == 1 ? "active-" + pageTagName + "-page-indicator" : ""}" data-page="${i}">${i}</p>`)
  }

  // Add click handling
  document.querySelectorAll(`.page-${pageTagName}-click`).forEach(element => {
    element.addEventListener("click", (event) => {
      // If page == active, return
      if (event.target.classList.contains(`active-${pageTagName}-page-indicator`)) { return; }
      // Get page number from data atturbite 
      let pageRequested = Number(event.target.dataset.page);
      console.log(pageRequested)
      // Remove active tags from page and page indicator
      document.querySelector(`.active-${pageTagName}-page-indicator`).classList.remove(`active-${pageTagName}-page-indicator`);
      console.log(document.querySelector(`.page-${pageTagName}-${pageRequested}`));
      
      document.querySelector(`.active-${pageTagName}-page`).classList.remove(`active-${pageTagName}-page`);
      // Fade out current active page
      // fadeOut(`.active-${pageTagName}-page`, () => {
        // Add active tags and fade in requested page
        console.log(`
          Page request: ${pageRequested}
          Page tag name: ${pageTagName}
          `);
        document.querySelector(`.page-${pageTagName}-${pageRequested}`).classList.add(`active-${pageTagName}-page`);
        document.querySelector(`.page-${pageTagName}-click[data-page="${pageRequested}"]`).classList.add(`active-${pageTagName}-page-indicator`);
        // fadeIn(`.page-${pageRequested}`, null, 3);});
    });
  });

  // Previous page
  document.querySelector(`.${pageTagName}-previous-page`).addEventListener("click", (event) => {
    let currentPage = document.querySelector(`.active-${pageTagName}-page-indicator`);
    if (currentPage.previousElementSibling == null) { return; }
    currentPage.previousElementSibling.click();
  });

  // Next page
  document.querySelector(`.${pageTagName}-next-page`).addEventListener("click", (event) => {
    let currentPage = document.querySelector(`.active-${pageTagName}-page-indicator`);
    if (currentPage.nextElementSibling == null) { return; }
    currentPage.nextElementSibling.click();
  });

  return itemsPaginated;
}

/**
 *  Fade out DOM element
 *  @param {string} elToHide - element to hide
 *  @param {Number} transitionTime - fade duration in ms
 *  @param {Function} callback - function to call after transition is finished
 * 
 */

var fadeOut = function fadeOut(elToHide, callback, transitionTime) {
  if (elToHide == "" || elToHide == null) { return console.error("No selector for fade out") }
  if (!elToHide instanceof HTMLObjectElement) {
    console.error(elToHide + " is not a valid HTML object.")
    return;
  }
  if (!transitionTime) { let transitionTime = 25; }
  let fadeOutOpacity = 1;
  const timer = setInterval(() => {
    if (fadeOutOpacity <= 0.1) {
      // Done with animation
      clearInterval(timer);
      document.querySelectorAll(elToHide).forEach((element) => {
        element.style.display = 'none';
      });
      if (callback != null) { callback(); }
    }
    document.querySelectorAll(elToHide).forEach((element) => {
      element.style.opacity = fadeOutOpacity;
      fadeOutOpacity -= 0.10;
    });
  }, transitionTime);
}

/**
 *  Fade in DOM element
 *  @param {string} elToShow - element to show
 *  @param {Number} transitionTime - fade duration in ms
 *  @param {Function} callback - function to call after transition is finished
 * 
 */
var fadeIn = function fadeIn(elToShow, callback, transitionTime) {
  if (elToShow == "" || elToShow == null) { return console.error("No selector for fade in") }
  if (!elToShow instanceof HTMLObjectElement) {
    console.log(elToShow instanceof HTMLObjectElement)
    console.error(elToHide + " is not a valid HTML object.")
    return;
  }
  if (!transitionTime) { const transitionTime = 25 }
  let fadeInOpacity = 0.0;
  document.querySelectorAll(elToShow).forEach((element) => {
    element.style.opacity = 0;
    element.style.display = 'block';
  });
  const timer = setInterval(() => {
    if (fadeInOpacity >= 1) {
      // Done with animation
      clearInterval(timer);
      if (callback != null) { callback(); }
    }
    document.querySelectorAll(elToShow).forEach((element) => {
      element.style.opacity = fadeInOpacity;
      fadeInOpacity += 0.05;
    });
  }, transitionTime);
}