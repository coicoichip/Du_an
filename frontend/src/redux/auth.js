export const SIGNIN = "SIGNIN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNOUT = "SIGNOUT";

export const signout = () => ({
  type: SIGNOUT,
});

export const signin = (data) => ({
  type: SIGNIN,
  payload: data
});

const initialState = {
  email: "",
  name: "",
};

export default function auth(state, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        email: "Fake",
        name: "Fake",
        _id: 'fake'
      };
    case SIGNOUT:
      return initialState;
    default:
      return state || initialState;
  }
}
