import "./style.css";
import { fetchCats } from "./cat.js";

fetchCats();

document.querySelector("#app").innerHTML = `
  <div>
    <h1>🐱 Cat Directory</h1>
    <div id="cats" class="card-list">
      loading...
    </div>
    <button id="add-cat">Add Cat</button>
  </div>
`;

setupCounter(document.querySelector("#counter"));
