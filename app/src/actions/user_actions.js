import UserConstants from "../constants/user_constants.js";
import AppDispatcher from '../dispatcher/dispatcher.js';

export default new class {
  receiveUsers (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USERS,
      users: users
    });
  }

  receiveSingleUser (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_SINGLE_USER,
      user: user
    });
  }

  receiveLoggedInUsers (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_LOGGED_IN_USERS,
      users: users
    });
  }

}();
