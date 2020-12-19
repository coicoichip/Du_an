export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
;

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

const initialState = [];

export default function Categories(state, action) {
  switch (action.type) {

    default:
      return state || initialState;
  }
}
