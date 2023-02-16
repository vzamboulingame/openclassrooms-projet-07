export function formTagSpanFactory(tag, color) {
  // Function that will generate the DOM element for the form tag span
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
