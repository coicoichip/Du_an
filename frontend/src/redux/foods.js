export const GET_FOODS = "GET_FOODS";
export const GET_FOODS_SUCCESS = "GET_FOODS_SUCCESS";
export const GET_FOODS_BY_RESID = "GET_FOODS_BY_RESID";
export const GET_FOODS_BY_RESID_SUCCESS = "GET_FOODS_BY_RESID_SUCCESS";
export const GET_FOOD = "GET_FOOD";
export const GET_FOOD_SUCCESS = "GET_FOOD_SUCCESS";
export const CREATE_FOOD = "CREATE_FOOD";
export const CREATE_FOOD_SUCCESS = "CREATE_FOOD_SUCCESS";
export const EDIT_FOOD = "EDIT_FOOD";
export const EDIT_FOOD_SUCCESS = "EDIT_FOOD_SUCCESS";
export const DELETE_FOOD = "DELETE_FOOD";
export const DELETE_FOOD_SUCCESS = "DELETE_FOOD_SUCCESS";
export const RESET_FOODS = 'RESET_FOODS'
export const getFoods = () => ({
  type: GET_FOODS,
});

export const getFoodsByResId = ({ resId }) => ({
  type: GET_FOODS_BY_RESID,
  payload: { resId },
});

export const getFood = ({ foodId }) => ({
  type: GET_FOOD,
  payload: { foodId },
});

export const createFood = ({ data }) => ({
  type: CREATE_FOOD,
  payload: { data },
});

export const editFood = ({ foodId, data }) => ({
  type: EDIT_FOOD,
  payload: { foodId, data },
});

export const deleteFood = ({ foodId, resId }) => ({
  type: DELETE_FOOD,
  payload: { foodId, resId },
});

export const resetFoods = () => ({
  type: RESET_FOODS,
});

const initialState = [];

export default function foods(state, action) {
  switch (action.type) {
    case GET_FOODS_BY_RESID_SUCCESS:
      return action.payload;
    case RESET_FOODS: 
      return initialState
    default:
      return state || initialState;
  }
}
