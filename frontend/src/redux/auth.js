export const SIGNIN = "SIGNIN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNOUT = "SIGNOUT";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const WHO_AM_I = "WHO_AM_I";
export const WHO_AM_I_SUCCESS = "WHO_AM_I_SUCCESS";

export const signout = () => ({
  type: SIGNOUT,
});

export const signin = (data) => ({
  type: SIGNIN,
  payload: data,
});

export const signup = (data) => ({
  type: SIGNUP,
  payload: data,
});

export const editProfile = ({ data }) => ({
  type: EDIT_PROFILE,
  payload: { data },
});

export const deleteUser = ({ user_id }) => ({
  type: DELETE_USER,
  payload: { user_id },
});

const initialState = {
  email: "",
  name: "",
  position: "customer",
};

export default function auth(state, action) {
  switch (action.type) {
    case WHO_AM_I_SUCCESS:
      return {
        ...action.payload,
      };
    case SIGNOUT:
      document.cookie = "";
      window.location.assign("/restaurants/all");
      return initialState;
    default:
      return state || initialState;
  }
}
