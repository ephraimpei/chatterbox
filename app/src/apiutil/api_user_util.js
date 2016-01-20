import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";

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

  fetchUsers (username, success) {
    $.ajax({
      url: '/api/users/get',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      data: { username: username },
      success: function (data) {
        UserActions.receiveUsers(data.users);
      }
    });
  }
}

export default new ApiUserUtil();
