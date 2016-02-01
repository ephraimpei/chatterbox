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
    const userIdx = this.loggedInUsers.findIndex(username);

    if (typeof userIdx === -1) { this.loggedInUsers.splice(userIdx, 1);}

    this.emit(CHANGE_EVENT);
  }
}

const loggedInUsersStore = new LoggedInUsersStore();

export default loggedInUsersStore;
