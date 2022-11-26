window.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("popstate", sh);
    document.getElementById("fm").addEventListener("click", function () {
        history.pushState({ "form": true }, "", "?form=true");
        sh();
    });
    sh();
    document.querySelectorAll(".save-to-storage").forEach(function (input) { input.addEventListener("input", function () {localStorage.setItem (this.id, this.value)}); });
    document.getElementById("bt").addEventListener("click", place);
});


function sh() {
    let popup = document.getElementById("w");
    if (history.state != null && history.state.form === true) {
        popup.style.display = "block";
        popup.style.position = "absolute";
        document.querySelectorAll(".save-to-storage").forEach(function (input) { input.value = localStorage.getItem(input.id); });
    } else
        popup.style.display = "none";
}

function place() {
    let name = document.getElementById("nm").value;
    let email = document.getElementById("em").value;
    let message = document.getElementById("msg").value;
    let checkbox = document.getElementById("fg");
    let result = document.getElementById("res");
    if (name != "" && message != "" && checkbox.checked && validateEmail(email) != null) {
        let sendRequest = new XMLHttpRequest();
        sendRequest.open('POST', 'https://formcarry.com/s/cB6SsjsbV');
        sendRequest.setRequestHeader('Content-Type', 'application/json');
        sendRequest.setRequestHeader('Accept', 'application/json');
        let popupForm = { "nm": name, "em": email, "msg": message };
        sendRequest.send(JSON.stringify(popupForm));
        document.getElementById("nm").value = "";
        document.getElementById("em").value = "";
        document.getElementById("msg").value = "";
        checkbox.checked = false;
        sendRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
                localStorage.clear();
                result.style.color = "green";
                result.innerHTML = "Успешно отправлено";
            }
        }
    }
    else {
        result.style.color = "red";
        result.innerHTML = "Полностью заполните форму";
    }
}

const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};