import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";
import UsersActions from "../actions/user_actions.js";
import SearchActions from "../actions/search_actions.js";

class ApiUserUtil {
  create (formData, success, failure) {
    const receiveCurrentUser = (data) => {
      CurrentUserActions.receiveCurrentUser(data.user);
      success(data.message, data.user.username);
    };

    const receiveError = (data) => failure(data.responseJSON.errors);

    $.ajax({
      url: "/users/api",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData
    }).done(receiveCurrentUser).fail(receiveError);
  }

  fetchUsers (username, mode) {
    const urlUserAutoComplete = "/users/api/" + username + "/" + mode;

    const isAutoCompleteSelection = mode === "autocomplete-selection" ? true : false;

    const receiveUsers = mode === "loggedinusers" ? (data) => UsersActions.receiveLoggedInUsers(data.users)
      : (data) => SearchActions.receiveUsers(data.users, isAutoCompleteSelection);
      
    $.get(urlUserAutoComplete, receiveUsers);
  }
}

export default new ApiUserUtil();
