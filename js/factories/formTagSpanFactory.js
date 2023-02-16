/**
 * Factory that takes a tag and a color as parameters and returns a function
 * that will generate the DOM element for the form tag span
 *
 * @param {string} tag - The tag that will be displayed in the span
 * @param {string} color - The color of the form tag span
 * @returns {object} - An object with a function that returns a DOM element
 */
export function formTagSpanFactory(tag, color) {
  /**
   * Generates the DOM element for the form tag span and returns it as an object
   *
   * @returns {object} - An object with the DOM element
   */
  function getFormTagSpanDOM() {
    const formTagSpan = document.createElement("span");
    formTagSpan.classList.add("form-tag-span");
    formTagSpan.style.backgroundColor = color;

    const formTagText = document.createElement("p");
    formTagText.classList.add("form-tag-text");
    formTagText.textContent = tag;

    const formTagIcon = document.createElement("em");
    formTagIcon.classList.add("form-tag-icon");
    formTagIcon.classList.add("fa-regular");
    formTagIcon.classList.add("fa-circle-xmark");

    formTagSpan.append(formTagText);
    formTagSpan.append(formTagIcon);

    return formTagSpan;
  }

  return { getFormTagSpanDOM };
}
