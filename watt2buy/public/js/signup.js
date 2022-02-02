
// javascript implementation of String.hashCode() from Java
function hashCode(s){
  var hash = 0, i, chr;
  for (i = 0; i < s.length; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function AddUser(){
    var userName = document.getElementById("inputUserame").value;
    var email = document.getElementById("inputEmail").value;
    var password1 = document.getElementById("inputPassword").value;
    var password2 = document.getElementById("inputConfirmPassword").value;

    var hash;
    if(password1 == password2){
        hash = hashCode(password2);
    }else {
        alert("Given passwords do not match!");
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/nodejs/signup?userName="+userName+"&email="+email+"&hash="+hash, false);
    xhttp.send();

    if (xhttp.status != 200) {
      alert("Failed creating new user!");
      return;  
    }else {
      alert("Successfully created new user.");
    }

    //redirect the user after they have logged in 
    window.location.href = '/index';
    console.log("past href");
}

