import AppDispatcher from '../dispatcher/dispatcher.js';
import UserConstants from "../constants/user_constants.js";
import EventEmitter from 'eventemitter3';

const CHANGE_EVENT = "change";

class LoggedInUsersStore extends EventEmitter {
  constructor () {
    super();
    this.loggedInUsers = [];
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  get () {
    return this.loggedInUsers.slice();
  }

  add (username) {
    const findUser = this.loggedInUsers.find((el) => el === username);

    if (typeof findUser === 'undefined') { this.loggedInUsers.push(username); }

    this.emit(CHANGE_EVENT);
  }

  remove (username) {
    const userIdx = this.loggedInUsers.indexOf(username);

    if (userIdx !== -1) { this.loggedInUsers.splice(userIdx, 1);}

    this.emit(CHANGE_EVENT);
  }

  set (users) {
    debugger;
    this.loggedInUsers = users;
  }
}

const loggedInUsersStore = new LoggedInUsersStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_LOGGED_IN_USERS:
      loggedInUsersStore.set(payload.users);
      loggedInUsersStore.emit(CHANGE_EVENT);
      break;
  }
});

export default loggedInUsersStore;
