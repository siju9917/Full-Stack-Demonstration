
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
  
function login(){
    var userName = document.getElementById("inputUserame").value;
    var password = document.getElementById("inputPassword").value;

    var hash;
    hash = hashCode(password);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/nodejs/login?userName="+userName+"&hash="+hash, false);
    xhttp.send();

    if (xhttp.status != 200) {
        alert("Login Failed.");
        return;
    }else {
        alert("Login Successful.");
    }

    console.log(userName + " Logged in.");
    //redirect the user after they have logged in 
    window.location.href = '/index';
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}