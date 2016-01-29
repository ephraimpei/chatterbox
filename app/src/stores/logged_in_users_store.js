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

  add (user) {
    debugger;
    const findUser = this.loggedInUsers.find(user => user.username === user.username);

    if (typeof findUser === 'undefined') { this.loggedInUsers.push(user); }
  }

  remove (user) {
    const userIdx = this.loggedInUsers.findIndex(user => user.username === user.username);

    if (typeof userIdx === -1) { this.loggedInUsers.splice(userIdx, 1);}
  }
}

const loggedInUsersStore = new LoggedInUsersStore();

export default loggedInUsersStore;
