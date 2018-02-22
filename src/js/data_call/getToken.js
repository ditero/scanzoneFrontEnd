const getToken = async function(req, aisURL) {
//    var state = false;
 let resp = await $.ajax({
    url: aisURL + "/scanZone",
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

//const getToken = async function(req, aisURL){
//    var state = false
//    let resp = await $.ajax({
//    url: aisURL +'/scanZone', // "http://localhost:3001/login", // <<- ScanZone API token service
//    type: 'post', // <<- the method that we using
//    data: JSON.stringify(req), // <<- JSON of our request obj
//    contentType: 'application/json', // <<- telling server how we are going to communicate
//    fail: function(xhr, textStatus, errorThrown) {
//
//      console.log(errorThrown, textStatus, xhr); //  <<- log any http errors to the console
//        return false;  
//    }
//  }).done(function(data, textStatus, xhr) {
//    console.log(data);
//      return data
//    if (data.role === 'manager') {
//      oj.Router.rootInstance.go('dashboard');
//
//    } else if (data.role === 'picker') {
//      console.log("Your HTML view is still under development");
//    } else if (data.role === 'developer') {
//        console.log('YOU ARE A DEVELOPER')
//    }
////    req = {}
//
//    if (data.hasOwnProperty('userInfo')) { // <<- see example response below
//
//      var token = data.userInfo.token;
//      localStorage.setItem('token', token);
//       document.dispatchEvent(event);
//      // console.log("Login Token: "+token);
//    }
//        return true
//  });
//}