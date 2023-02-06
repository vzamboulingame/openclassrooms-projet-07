export function filterListItemFactory(tag) {
  // Function that will generate the DOM element for the filter list option
  function getFilterListItemDOM() {
    const filterListItem = document.createElement("li");

    filterListItem.classList.add("form-filter-list-item");
    filterListItem.textContent = tag;

    return filterListItem;
  }

  return { getFilterListItemDOM };
}
