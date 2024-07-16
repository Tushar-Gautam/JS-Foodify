import * as model from './model';

import 'core-js/stable';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;
  try {
    recipeView.renderSpinner();
    // results view to mark selected search view
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id); // data being stored in state
    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  // add debouncing to search
  try {
    const query = searchView.getQuery();
    if (!query) return resultsView.renderError('Search bar is empty');
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    //render initial pagination view
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings(in state)
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHanlderRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // controlServings();
};
init();

// https://forkify-api.herokuapp.com/v2
