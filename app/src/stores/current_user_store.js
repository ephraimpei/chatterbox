import AppDispatcher from '../dispatcher/dispatcher.js';
import CurrentUserConstants from "../constants/current_user_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class CurrentUserStore extends EventEmitter {
  constructor() {
    super();
    this.currentUser = {};
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getCurrentUser() {
    return Object.assign({}, this.currentUser);
  }

  isLoggedIn() {
    if (Object.keys(this.currentUser).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }
}

const currentUserStore = new CurrentUserStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      currentUserStore.setCurrentUser(payload.currentUser);
      currentUserStore.emit(CHANGE_EVENT);
      break;
  }
});

export default currentUserStore;
