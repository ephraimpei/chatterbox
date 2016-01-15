import AppDispatcher from '../dispatcher/dispatcher.js';
import CurrentUserConstants from "../constants/current_user_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class CurrentUserStore extends EventEmitter {
  constructor() {
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
}

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case CurrentUserConstants.RECEIVE_CURRENT_USER:
      _currentUser = payload.currentUser;
      CurrentUserStore.emit(CHANGE_EVENT);
      break;
  }
});

export default new CurrentUserStore();
