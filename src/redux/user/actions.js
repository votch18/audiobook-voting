import { createActions } from "redux-actions";

export const {
  updateAuthUser,
  clearAuthUser
} = createActions({
  updateAuthUser: (user) => ({ user }),
  clearAuthUser: () => ({}),
});
