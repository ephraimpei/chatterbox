import AppDispatcher from '../dispatcher/dispatcher.js';
import CurrentUserConstants from "../constants/current_user_constants.js";

export default new class {
  receiveCurrentUser (currentUser) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  }

  logoutCurrentUser (currentUser) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.LOG_OUT_CURRENT_USER,
      currentUser: currentUser
    });
  }
}();
