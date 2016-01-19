import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";

class ApiSessionUtil {
  login(formData, success, failure) {
    $.ajax({
      url: "/api/session/post",
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

  logout(success) {
    $.ajax({
      url: '/api/session/delete',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        CurrentUserActions.receiveCurrentUser({});
        success && success();
      }
    });
  }

  fetchCurrentUser() {
    $.ajax({
      url: '/api/session/get',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        debugger;
        CurrentUserActions.receiveCurrentUser(data.user);
      }
    });
  }
}

export default new ApiSessionUtil();
