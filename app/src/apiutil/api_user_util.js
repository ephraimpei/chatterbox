import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";
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

  fetchUsersForAutocomplete (username, isAutoCompleteSelection) {
    const mode = isAutoCompleteSelection ? "autocomplete" : "index";
    const urlUserAutoComplete = "/users/api/" + username + "/" + isAutoCompleteSelection;
    const receiveUsers = (data) => SearchActions.receiveUsers(data.users, isAutoCompleteSelection);

    $.get(urlUserAutoComplete, receiveUsers);
  }
}

export default new ApiUserUtil();
