import AppDispatcher from '../dispatcher/dispatcher.js';
import SearchConstants from "../constants/search_constants.js";

export default new class {
  receiveUsers (users, isAutoCompleteSelection) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_USERS,
      users: users,
      isAutoCompleteSelection: isAutoCompleteSelection
    });
  }
}();
