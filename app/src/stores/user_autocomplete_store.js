import AppDispatcher from '../dispatcher/dispatcher.js';
import SearchConstants from "../constants/search_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class UserSearchAutoCompleteStore extends EventEmitter {
  constructor () {
    super();
    this.users = [];
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  get () {
    return this.users.slice();
  }

  set (users) {
    this.users = users;
  }
}

const userSearchAutoCompleteStore = new UserSearchAutoCompleteStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case SearchConstants.RECEIVE_USERS:
      userSearchAutoCompleteStore.set(payload.users);

      if (!payload.isAutoCompleteSelection) {
        userSearchAutoCompleteStore.emit(CHANGE_EVENT);
      }
      break;
  }
});

export default userSearchAutoCompleteStore;
