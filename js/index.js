const loggedInUser = localStorage.getItem('loggedIn');

document.addEventListener("DOMContentLoaded", () => {
    if (!loggedInUser) {    
        setTimeout(function() {
            window.location.replace('D:/ProjectFullJSIDN/login.html');
            alert('You must log in first!');
        }, 200);
    } else {
        document.getElementById('welcomeMessage').innerText = `Welcome, ${loggedInUser}!`;
    }
})

document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    alert('Logged out!');
    window.location.href = 'login.html';
});