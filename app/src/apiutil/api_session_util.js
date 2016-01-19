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
        CurrentUserActions.receiveCurrentUser(data);
        success(data.message, data.username);
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
}

export default new ApiSessionUtil();
