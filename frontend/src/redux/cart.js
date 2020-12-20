export const ADD_ITEM = "ADD_ITEM";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const CHAGNE_QUANTITY = "CHAGNE_QUANTITY";
export const CHAGNE_QUANTITY_SUCCESS = "CHAGNE_QUANTITY_SUCCESS";
export const RESET_CART = "RESET_CART";
export const RESET_CART_SUCCESS = "RESET_CART_SUCCESS";

export const addItem = ({ item }) => ({
  type: ADD_ITEM,
  payload: { item },
});

export const removeItem = ({ item }) => ({
  type: REMOVE_ITEM,
  payload: { item },
});

export const changeQuantity = ({ id, quantity }) => ({
  type: CHAGNE_QUANTITY,
  payload: { id, quantity },
});

export const resetCart = () => ({
  type: RESET_CART,
});

const initialState = [];

export default function cart(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { item } = action.payload;
      localStorage.setItem("resId", item.restaurant_id);
      const existItem = state.find((s) => s.id === item.id);
      if (existItem) {
        existItem.quantity += 1;
      } else {
        item.quantity = 1;
        state.push(item);
      }
      return [...state];
    }
    case CHAGNE_QUANTITY: {
      const { id, quantity } = action.payload;
      const cartToChange = state.find((s) => s.id === id);
      if (cartToChange) cartToChange.quantity = quantity;
      return [...state];
    }
    case REMOVE_ITEM: {
      const { item } = action.payload;
      localStorage.clear("resId");
      return [...state.filter((s) => s.id !== item.id)];
    }
    case RESET_CART:
      return initialState;
    default:
      return state || initialState;
  }
}
