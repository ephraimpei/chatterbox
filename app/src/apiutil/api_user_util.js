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
        CurrentUserActions.receiveCurrentUser(data);
        success(data.username);
      },
      error: function (data) {
        failure(JSON.parse(data.responseText));
      }
    });
  }
}

export default new ApiUserUtil();
