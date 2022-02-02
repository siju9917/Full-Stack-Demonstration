function subscribe(){
    var email = document.getElementById("email").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/nodejs/subscribe?email="+email, false);
    xhttp.send();

    if (xhttp.status != 200) {
        alert("Subscription Failed.");
        return;
    }else {
        alert("Subscription Successful.");
    }
}