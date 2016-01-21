import React from 'react';
import $ from 'jquery';
import ApiUserUtil from '../../apiutil/api_user_util.js';
import userSearchAutoCompleteStore from '../../stores/user_autocomplete_store.js';

class UserSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleUserSearchInput = this.handleUserSearchInput.bind(this);
    this.handleUserSearchAutoComplete = this.handleUserSearchAutoComplete.bind(this);
    this.handleUserSearchSubmission = this.handleUserSearchSubmission.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.usernameInBounds = this.usernameInBounds.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.handleUserSearchInputFocus = this.handleUserSearchInputFocus.bind(this);
    this.addDOMListeners = this.addDOMListeners.bind(this);
    this.removeDOMListeners = this.removeDOMListeners.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.__onChange = this.__onChange.bind(this);
    this.state = { username: "", showUserSearchAutoCompleteList: false };
  }

  componentDidMount () {
    this.addDOMListeners();
    userSearchAutoCompleteStore.addChangeListener(this.__onChange);
  }

  componentWillUnmount () {
    this.removeDOMListeners();
    userSearchAutoCompleteStore.removeChangeListener(this.__onChange);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ username: "", showUserSearchAutoCompleteList: false });
  }

  addDOMListeners () {
    $("#content").on("click", (e) => {
      $(".selected").removeClass("selected");
      this.setState({showUserSearchAutoCompleteList: false});
    });

    $(".user-search-bar").on("click", (e) => e.stopPropagation() );
  }

  removeDOMListeners () {
    $("#content").off();
    $(".user-search-bar").off();
  }

  handleUserSearchInput (e, isAutoCompleteSelection) {
    let username = e.currentTarget.value || e.currentTarget.textContent;

    isAutoCompleteSelection = typeof isAutoCompleteSelection === "undefined" ?
      false : true;

    this.setState({ username: username });

    this.handleUserSearchAutoComplete(username, isAutoCompleteSelection);
  }

  handleUserSearchAutoComplete (username, isAutoCompleteSelection) {
    if (this.usernameInBounds(username)) {
      ApiUserUtil.fetchUsersForAutocomplete(username, isAutoCompleteSelection);
    } else {
      this.setState({ showUserSearchAutoCompleteList: false });
    }
  }

  handleUserSearchSubmission () {
    $(".user-search-submit").removeClass("pressed");
    this.props.successfulUserSearch(this.state.username);
  }

  selectUser (e) {
    this.handleUserSearchInput(e, true);
  }

  usernameInBounds (username) {
    if (username.length >= 4 && username.length <= 25) {
      return true;
    } else {
      return false;
    }
  }

  handleKeyDown (e) {
    switch (e.keyCode) {
      // Enter
      case 13:
        if ($(".user-search-autocomplete-list-item.selected").length > 0) {
          $(".user-search-autocomplete-list-item.selected")[0].click();
        } else if ($(".user-search-bar").is(":focus")) {
          $(".user-search-submit").addClass("pressed");
          this.handleUserSearchSubmission();
        }
        break;
      // Arrow Up Key
      case 38:
        e.preventDefault();
        this.moveUp();
        break;
      // Arrow Down Key
      case 40:
        e.preventDefault();
        this.moveDown();
        break;
    }
  }

  moveUp () {
    if ($(".selected").prev(".user-search-autocomplete-list-item").length > 0) {
      $(".selected")
        .removeClass("selected")
        .prev(".user-search-autocomplete-list-item")
        .addClass("selected")
        .focus();
    } else {
      $(".selected").removeClass("selected");
      $(".user-search-autocomplete-list-item")
        .last()
        .addClass("selected")
        .focus();
    }
  }

  moveDown () {
    if ($(".selected").next(".user-search-autocomplete-list-item").length > 0) {
      $(".selected")
        .removeClass("selected")
        .next(".user-search-autocomplete-list-item")
        .addClass("selected")
        .focus();
    } else {
      $(".selected").removeClass("selected");
      $(".user-search-autocomplete-list-item")
        .first()
        .addClass("selected")
        .focus();
    }
  }

  handleUserSearchInputFocus (e) {
    if (typeof e === "undefined") {
      this.setState({ showUserSearchAutoCompleteList: false });
    } else {
      if (this.usernameInBounds(this.state.username)) {
        this.setState({ showUserSearchAutoCompleteList: true });
      }
    }
  }

  __onChange () {
    this.setState({ showUserSearchAutoCompleteList: true });
  }

  render () {
    let users, userSearchAutoCompleteItems;
    let userSearchAutoCompleteListClass = "user-search-autocomplete-list ";

    users = userSearchAutoCompleteStore.getUsers();

    userSearchAutoCompleteItems = users.map( (user, idx) => {
      return <a key={ idx }
                className="user-search-autocomplete-list-item"
                onClick={ this.selectUser }>
                { user.username }
              </a>;
    });

    if (this.state.showUserSearchAutoCompleteList) {
      userSearchAutoCompleteListClass += "show";
    }

    return (
      <div className="user-search" onKeyDown={ this.handleKeyDown }>
        <label>Find User</label>

        <input className="user-search-bar"
          type="text"
          value={ this.state.username }
          placeholder="Search for username"
          onChange={ this.handleUserSearchInput }
          onFocus={ this.handleUserSearchInputFocus }
          />

        <button className="user-search-submit"
          onClick={ this.handleUserSearchSubmission }>🔍</button>

        <div className={ userSearchAutoCompleteListClass }>
          { userSearchAutoCompleteItems }
        </div>
      </div>
     );
  }
}

export default UserSearch;
