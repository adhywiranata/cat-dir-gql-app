import { request, gql } from "graphql-request";

const ENDPOINT = "http://localhost:3000";

const GET_ALL_CATS_QUERY = gql`
  query AllCats {
    allCats {
      name
      Owner {
        name
      }
      Comments {
        text
      }
    }
  }
`;

/**
 * Fetch API and Render the Cat List to HTML
 */
export async function renderCatList() {
  const catListDOM = document.querySelector("#cats");

  try {
    const response = await request(ENDPOINT, GET_ALL_CATS_QUERY);

    // map all cats data by applying to the template
    const catCardsHTML = response.allCats.map(renderCatCardTemplate).join("");

    // set the cat cards HTML string as the innerHTML of card list
    catListDOM.innerHTML = catCardsHTML;
  } catch (e) {}
}

/**
 * Renders the HTML Template to display Cat Card
 *
 * @param {object} cat
 * @param {string} cat.name
 * @param {object} cat.Owner
 * @param {string} cat.Owner.name
 * @param {Array<{ text: string }>} cat.Comments
 * @returns
 */
function renderCatCardTemplate(cat) {
  return `
  <div class="card">
    <img src="http://placekitten.com/200/200">
    <h2>${cat.name}</h2>
    <p class="passive">Owner: ${cat.Owner.name}</p>
    <ul>
    ${cat.Comments.map((comment) => `<li>${comment.text}</li>`).join("")}
    </ul>
  </div>
`;
}
