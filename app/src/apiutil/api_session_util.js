import $ from "jquery";
import CurrentUserActions from "../actions/current_user_actions.js";

class ApiSessionUtil {
  login(credentials, success, failure) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      contentType: "application/json",
      data: JSON.stringify({ user: credentials }),
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success();
      },
      error: function (data) {
        failure(JSON.parse(data.responseText));
      }
    });
  }

  logout(success) {
    $.ajax({
      url: '/api/session',
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
