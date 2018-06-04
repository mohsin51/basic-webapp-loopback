function submitFunc(e) {
  e.preventDefault(); // prevent it from refreshing

  let Fname = document.getElementById('usrf').value;
  let Lname = document.getElementById('usrl').value;
  let Email = document.getElementById('email').value;
  let Pass = document.getElementById('pwd').value;
  let ConfirmPass = document.getElementById('cpwd').value;



  console.log("name is " + Fname);
  console.log("lastname is " + Lname);
  console.log("Email is  " + Email);
  console.log("password is " + Pass);
  console.log("Confirm password is " + ConfirmPass);

  if (Pass === ConfirmPass) {

    let body = {
      firstname: Fname,
      lastname: Lname,
      email: Email,
      password: Pass
    };
    var http = new XMLHttpRequest();
    var url = "http://localhost:3000/api/users";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {

      console.log(http.response); //Outputs a DOMString by default
      let parsedRes = JSON.parse(http.response);
      if (!parsedRes.error) {
        document.getElementById('msg').innerHTML = "user is added with id : " + parsedRes.id;
      } else {
        document.getElementById('msg').innerHTML = "user is not added Error " + parsedRes.error.message;
      }
    }
    http.send(JSON.stringify(body));

  } 
  else 
  {
    document.getElementById('msg').innerHTML = "password does not match";
  }
}

(function () {

  //equal to ready()


})();

