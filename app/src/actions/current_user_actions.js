import AppDispatcher from '../dispatcher/dispatcher.js';
import CurrentUserConstants from "../constants/current_user_constants.js";

export default new class {
  receiveCurrentUser (user) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  }
}();
