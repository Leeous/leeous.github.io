export {fadeIn, fadeOut}
var fadeOut = function fadeOut(elToHide, callback, transitionTime) {
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
