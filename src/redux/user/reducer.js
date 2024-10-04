import { handleActions } from "redux-actions";

const initialState = {
  isLoggedIn: false,
  userId: null,
  username: ""
};


export default handleActions({
  updateAuthUser: (state, action) => ({ ...state, ...action.payload.user }),
  clearAuthUser: (state, action) => initialState,
}, initialState);
