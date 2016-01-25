import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";
import SearchActions from "../actions/search_actions.js";

class ApiUserUtil {
  create (formData, success, failure) {
    $.ajax({
      url: "/users/api",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data.user);
        success(data.message, data.user.username);
      },
      error: function (data) {
        failure(data.responseJSON.errors);
      }
    });
  }

  fetchUsersForAutocomplete (username, isAutoCompleteSelection) {
    let mode = isAutoCompleteSelection ? "autocomplete" : "index";

    $.ajax({
      url: "/users/api/" + username + "/" + isAutoCompleteSelection,
      method: "GET",
      contentType: "application/json",
      success: function (data) {
        SearchActions.receiveUsers(data.users, isAutoCompleteSelection);
      }
    });
  }
}

export default new ApiUserUtil();
