import CurrentUserConstants from "../constants/current_user_constants.js";
import AppDispatcher from '../dispatcher/dispatcher.js';

export default {
  receiveCurrentUser: function (user) {
    debugger;
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_SINGLE_USER,
      user: user
    });
  }
};
