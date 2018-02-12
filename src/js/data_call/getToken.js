const getToken = function(req, aisURL) {
  $.ajax({
    url: aisURL + "/jderest/v2/tokenrequest",
    data: JSON.stringify(req),
    type: "post",
    dataType: "JSON",
    contentType: "application/json",
    fail: function(xhr, textStatus, errorThrow) { //if the request fail print the error
      console.log(xhr, textStatus, errorThrow);
    }
  }).done(function(results) { //if successful print the token
    console.log(results.userInfo.token);
    return results.userInfo.token
    localStorage.setItem("token", results.userInfo.token);
  });
}
