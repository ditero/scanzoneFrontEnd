const getToken = async function(req, aisURL) {
//    var state = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
 let resp = await $.ajax({
    url: aisURL + "/jderest/v2/tokenrequest",
    data: JSON.stringify(req),
    type: "post",
    dataType: "JSON",
    contentType: "application/json",
    fail: function(xhr, textStatus, errorThrow) { //if the request fail print the error
      console.log(xhr, textStatus, errorThrow);
        return false;
    }
  }).done(function(results) { //if successful print the token
    console.log(results.userInfo.token);
//    return results.userInfo.token
    localStorage.setItem("token", results.userInfo.token);
    localStorage.setItem("username", results.userInfo.username);
      
     return true;
  });
}
