const name = "mennobuggenhout";
const mailSuffix = "@gmail.com";
const submittedTextAlert = "Het bericht is verstuurd!";

setUpContactForm();

function setUpContactForm() {
    let form = document.body.getElementsByTagName("form")[0];

    form.onsubmit = function onsubmit() {
        alert(submittedTextAlert);
        let mail = name + mailSuffix;

        window.open('mailto:test@example.com?subject=subject&body=body');
    }
}