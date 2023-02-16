/**
 * Factory that takes a tag as parameter and returns an object with a function
 * that will generate the DOM element for the filter list element
 *
 * @param {string} tag - The tag that will be displayed in the filter list element
 * @returns {object} - An object with a function that returns a DOM element.
 */
export function filterListItemFactory(tag) {
  /**
   * Generates the DOM element for the filter list element
   *
   * @returns {object} - An object with the DOM element
   */
  function getFilterListItemDOM() {
    const filterListItem = document.createElement("li");

    filterListItem.classList.add("form-filter-list-item");
    filterListItem.textContent = tag;

    return filterListItem;
  }

  return { getFilterListItemDOM };
}
