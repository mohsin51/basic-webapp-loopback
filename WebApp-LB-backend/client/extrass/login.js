function submitFunc(e) {
    e.preventDefault(); // prevent it from refreshing
  
    let Email = document.getElementById('email').value;
    let Pass = document.getElementById('pwd').value;
   
  
  
    console.log("Email is  " + Email);
    console.log("password is " + Pass);
  
   
  
      let body = {
        email: Email,
        password: Pass
      };
      var http = new XMLHttpRequest();
      var url = "http://localhost:3000/api/users/login";
      http.open("POST", url, true);
  
      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/json");
  
      http.onreadystatechange = function () 
      {
        console.log(http.response); //Outputs a DOMString by default
        let parsedRes = JSON.parse(http.response);
        if (!parsedRes.error) {
          document.getElementById('msg').innerHTML = "user is logged in with token : " + parsedRes.id;
        } else {
          document.getElementById('msg').innerHTML = "user is not added Error " + parsedRes.error.message;
        }
      }
      http.send(JSON.stringify(body));
  
   
  }
  
  (function () {
  
    //equal to ready()
  
  
  })();
  
  