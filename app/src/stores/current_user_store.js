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

  currentUser() {
    return $.extend({}, _currentUser);
  }

  isLoggedIn() {
    return (typeof _currentUser.username !== "undefined");
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
