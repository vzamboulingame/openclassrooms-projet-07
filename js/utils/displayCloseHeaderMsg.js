/**
 * Takes a text as parameter, insert it as the header message span text
 * and displays the header message span element
 *
 * @param {string} text - Text that will be inserted in the header message span
 */
export function displayHeaderMsg(text) {
  const headerMessage = document.querySelector(".header-message");
  headerMessage.textContent = text;
  headerMessage.setAttribute("aria-hidden", "false");
  headerMessage.style.display = "flex";
  headerMessage.style.opacity = "1";
}

/**
 * Resets the header message span text
 * and hides the header message span element
 */
export function closeHeaderMsg() {
  const headerMessage = document.querySelector(".header-message");
  headerMessage.textContent = "";
  headerMessage.setAttribute("aria-hidden", "true");
  headerMessage.style.display = "none";
  headerMessage.style.opacity = "0";
}
