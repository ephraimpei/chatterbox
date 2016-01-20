import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";
import SearchActions from "../actions/search_actions.js";

class ApiUserUtil {
  create (formData, success, failure) {
    $.ajax({
      url: "/api/users/post",
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

  fetchUsersForAutocomplete (username) {
    $.ajax({
      url: "/api/users/get",
      method: "GET",
      contentType: "application/json",
      dataType: "json",
      data: { username: username },
      success: function (data) {
        SearchActions.receiveUsers(data.users);
      }
    });
  }
}

export default new ApiUserUtil();
