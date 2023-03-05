import { request, gql } from "graphql-request";

const ENDPOINT = "http://localhost:3000";

const ADD_CAT_MUTATION = gql`
  mutation CreateCat($name: String!, $ownerId: ID!) {
    createCat(name: $name, owner_id: $ownerId) {
      name
    }
  }
`;

const CAT_NAME_LIST = [
  "Bowie",
  "Mike",
  "Maung",
  "Miau",
  "Douglas",
  "Edward",
  "Orange",
];

/**
 * Randomly generates cat with randomized owner id
 */
export const generateNewCat = async () => {
  try {
    request(ENDPOINT, ADD_CAT_MUTATION, {
      name: CAT_NAME_LIST[
        Math.floor(Math.random() * (CAT_NAME_LIST.length - 1))
      ],
      ownerId: 123,
    }).then((data) => console.log(data));
  } catch (e) {}
};
