  
function submitForm(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phone").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/nodejs/contactForm?name="+name+"&email="+email+"&phoneNumber="+phoneNumber+"&subject="+subject+"&message="+message, false);
    xhttp.send();

    if (xhttp.status != 200) {
        alert("Submission Failed.");
        return;
    }else {
        alert("Submission Successful.");
    }

    window.location.href = '/index';
}