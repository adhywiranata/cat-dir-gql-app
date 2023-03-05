import { request, gql } from "graphql-request";

const ENDPOINT = "http://localhost:3000";

const allCatsQuery = gql`
  query {
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

const addCatMutationQuery = gql`
  mutation CreateCart($name: String!, $ownerId: ID!) {
    createCat(name: $name, owner_id: $ownerId) {
      name
    }
  }
`;

export const addCommentMutation = async () => {
  try {
    request(ENDPOINT, addCatMutationQuery, {
      name: "Yono",
      ownerId: 123,
    }).then((data) => console.log(data));
  } catch (e) {}
};

(function () {
  addEventListener("DOMContentLoaded", (event) => {
    const addBtn = document.querySelector("#add-cat");

    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addCommentMutation();
      });
    }
  });
})();

export const fetchCats = async () => {
  try {
    const data = await request(ENDPOINT, allCatsQuery);
    console.log(data);

    const cardList = document.querySelector("#cats");

    const cardsFragment = data.allCats
      .map((cat) => {
        return `
        <div class="card">
          <img src="http://placekitten.com/200/200">
          <h2>${cat.name}</h2>
          <p>maung is a fun cat</p>
          <div>Owner: ${cat.Owner.name}</div>
          <ul>
            ${cat.Comments.map((comment) => `<li>${comment.text}</li>`).join(
              ""
            )}
          </ul>
          <button>See Details</button>
        </div>
      `;
      })
      .join("");

    cardList.innerHTML = cardsFragment;
  } catch (e) {}
};
