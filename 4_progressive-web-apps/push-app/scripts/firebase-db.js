// firebase-db.js
var db = firebase.database();

function sendDeviceKeytoFirebase(key) {
    return db.ref('users/browserKey-' + getID()).set({
        key: key,
        time: getCurrentTime()
    }).then(function () {
        console.log("The key has been sent to Firebase DB");
    }).catch(function () {
        console.error('Sending a key to server has been failed');
    });
}

// firebase-db.js
function getID() {
    var date = new Date();
    return date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
}

function getCurrentTime() {
    return new Date().toLocaleString();
}