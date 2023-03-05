import "./style.css";

import { renderCatList } from "./src/catList";
import { generateNewCat } from "./src/addCat";

/**
 * Mounts initial HTML to the app container.
 */
function renderApp() {
  document.querySelector("#app").innerHTML = `
    <div>
      <h1>🐱 Cat Directory</h1>
      <div id="cats" class="card-list"></div>
      <button id="add-cat">Add Cat</button>
    </div>
  `;
}

/**
 * On Page Load should be called when HTML already done loaded.
 *
 * 1. start fetching cat data via GQL query and update DOM once it is ready
 * 2. attaches click handler to the add button which will calls GQL mutation
 */
function onPageLoad() {
  renderCatList();

  const addBtn = document.querySelector("#add-cat");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      generateNewCat();
      renderCatList();
    });
  }
}

window.addEventListener("DOMContentLoaded", onPageLoad);
renderApp();
