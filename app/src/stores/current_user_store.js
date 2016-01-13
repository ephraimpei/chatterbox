import AppDispatcher from '../dispatcher/dispatcher.js';

const EventEmitter = require('eventemitter3');

const CHANGE_EVENT = "change";

let _currentUser = {username: "ephdawg"};

let CurrentUserStore = Object.assign(EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  currentUser: function () {
    return $.extend({}, _currentUser);
  },

  isLoggedIn: function () {
    return (typeof _currentUser.username !== "undefined");
  },
});

// AppDispatcher.register(function (payload) {
//   switch (payload.actionType) {
//     case CurrentUserConstants.RECEIVE_CURRENT_USER:
//       _currentUser = payload.currentUser;
//       CurrentUserStore.emit(CHANGE_EVENT);
//       break;
//   }
// });

export default CurrentUserStore;
