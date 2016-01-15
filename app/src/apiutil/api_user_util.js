import $ from "jquery";
import UserActions from "../actions/user_actions.js";

class ApiUserUtil {
  create (formData, success, failure) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: formData,
      success: function (data) {
        debugger;
        UserActions.receiveCurrentUser(data);
        success();
      },
      error: function (data) {
        failure(JSON.parse(data.responseText));
      }
    });
  }
}

export default ApiUserUtil;
