export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENT = "GET_COMMENT";
export const GET_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const RATE = "RATE";
export const RATE_SUCCESS = "RATE_SUCCESS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const RESET_COMMENTS = "RESET_COMMENTS";
export const RESET_COMMENTS_SUCCESS = "RESET_COMMENTS_SUCCESS";

export const getComments = ({ resId }) => ({
  type: GET_COMMENTS,
  payload: { resId },
});

export const getComment = ({ resId, billId }) => ({
  type: GET_COMMENT,
  payload: { resId, billId },
});

export const createComment = ({ resId, data }) => ({
  type: CREATE_COMMENT,
  payload: { resId, data },
});

export const rateRes = ({ resId, data }) => ({
  type: RATE,
  payload: { resId, data },
});

export const deleteComment = () => ({
  type: DELETE_COMMENT,
});

export const resetComments = () => ({
  type: RESET_COMMENTS,
});

const initialState = [
  {
    id: 1,
    user_id: 1,
    content: "abcyz",
    restaurant_id: 1,
    create_time: Date.now(),
  },
];

export default function comments(state, action) {
  switch (action.type) {
    case RESET_COMMENTS:
      return initialState;
    default:
      return state || initialState;
  }
}
