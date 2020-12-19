export const GET_RESTAURANTS = "GET_RESTAURANTS";
export const GET_RESTAURANTS_SUCCESS = "GET_RESTAURANTS_SUCCESS";
export const GET_RESTAURANT = "GET_RESTAURANT";
export const GET_RESTAURANT_SUCCESS = "GET_RESTAURANT_SUCCESS";
export const EDIT_RESTAURANT = "EDIT_RESTAURANT";
export const EDIT_RESTAURANT_SUCCESS = "EDIT_RESTAURANT_SUCCESS";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";
export const DELETE_RESTAURANT_SUCCESS = "DELETE_RESTAURANT_SUCCESS";
export const CREATE_RESTAURANT = "CREATE_RESTAURANT";
export const CREATE_RESTAURANT_SUCCESS = "CREATE_RESTAURANT_SUCCESS";

export const getRestaurants = () => ({
  type: GET_RESTAURANTS,
});

export const getRestaurant = ({ resID }) => ({
  type: GET_RESTAURANT,
  payload: { resID },
});

export const editRestaurant = ({ resID, data }) => ({
  type: EDIT_RESTAURANT,
  payload: { resID, data },
});

export const deleteRestaurant = ({ resID }) => ({
  type: DELETE_RESTAURANT,
  payload: { resID },
});

export const createRestaurant = ({ data }) => ({
  type: CREATE_RESTAURANT,
  payload: { data },
});

const initialState = [];

export default function restaurants(state, action) {
  switch (action.type) {
    case GET_RESTAURANTS_SUCCESS: {
      return action.payload;
    }
    default:
      return state || initialState;
  }
}
