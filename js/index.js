// mengambil key loggedIn di local storage 
// sebelumnya yang terjadi saat proses login ada pengesetan username user yang login, 
// nanti saat proses login username user yang login akan di set di local storage
// baca login.js
const loggedInUser = localStorage.getItem('loggedIn');

// saat event onDOMContentLoaded(tepat setelah dom di load semua) terjadi
document.addEventListener("DOMContentLoaded", () => {
    if (!loggedInUser) {    
        setTimeout(function() {
            window.location.href = 'login.html';
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