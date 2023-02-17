/**
 * Takes a text as parameter, insert it as the header message text
 * and displays the header message div element
 *
 * @param {string} text - Text that will be inserted in the header message text element
 * @returns {void}
 */
export function displayHeaderMsg(text) {
  const headerMessage = document.querySelector(".header-message");
  const headerMessageText = document.querySelector(".header-message-text");
  headerMessageText.textContent = text;
  headerMessage.setAttribute("aria-hidden", "false");
  headerMessage.style.display = "flex";
  headerMessage.style.opacity = "1";
}

/**
 * Resets the header message text and hides the header message div element
 *
 * @returns {void}
 */
export function closeHeaderMsg() {
  const headerMessage = document.querySelector(".header-message");
  const headerMessageText = document.querySelector(".header-message-text");
  headerMessageText.textContent = "";
  headerMessage.setAttribute("aria-hidden", "true");
  headerMessage.style.display = "none";
  headerMessage.style.opacity = "0";
}
