export function filterListItemFactory(tagName) {
  // Function that will generate the DOM element for the filter tag button
  function getfilterListItemDOM() {
    const filterListitem = document.createElement("li");
    filterListitem.classList.add("form-filter-list-item");

    const filterListButton = document.createElement("button");
    filterListButton.classList.add("form-filter-list-button");
    filterListButton.setAttribute("value", tagName);

    filterListitem.append(filterListButton);

    return filterListitem;
  }

  return { getfilterListItemDOM };
}
