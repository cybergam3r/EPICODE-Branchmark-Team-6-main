const checkProceed = document.getElementById('proceedCheck');

document.getElementById("proceedButton").addEventListener("click",function(e) {
    if(checkProceed.checked === true) {
        location.href= "exam.html";
        console.log(checkProceed.checked);
    }
    else {
        document.getElementById("errorProceded").classList.add("isDisplay");
        console.log("error");
    }
});