import { searchRecipesWithKeyword } from "./searchRecipesWithKeyword.js";
import { searchRecipesWithTag } from "./searchRecipesWithTag.js";

/**
 * Takes a keyword, a tagArray, and a recipesArray as parameters, then filters the recipesArray
 * based on the keyword and tags, and returns a filtered array of matching recipes
 *
 * @param {string} keyword - The keyword that the user is searching for
 * @param {array} tagArray - An array of tags to search with
 * @param {array} recipesArray - The array of recipes to search through
 * @returns {array} - An array of recipes that match the search criteria
 */
export function searchRecipesWithKeywordAndTag(
  keyword,
  tagArray,
  recipesArray
) {
  if (keyword != "") {
    const filteredRecipesWithKeyword = searchRecipesWithKeyword(
      keyword,
      recipesArray
    );
    const filteredRecipesWithTagAndKeyword = searchRecipesWithTag(
      tagArray,
      filteredRecipesWithKeyword
    );
    return filteredRecipesWithTagAndKeyword;
  } else {
    const filteredRecipesWithTag = searchRecipesWithTag(tagArray, recipesArray);
    return filteredRecipesWithTag;
  }
}
