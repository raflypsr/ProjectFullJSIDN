document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedIn');
    if (loggedInUser) {
        window.location.href = 'index.html';
        alert("anda harus logout dulu")
    }
});

function toBase64(byteArray) {
    return btoa(String.fromCharCode(...byteArray));
}

function storeUser(username, password) {
    const encoder = new TextEncoder();
    const usernameBytes = encoder.encode(username);
    const passwordBytes = encoder.encode(password);

    // username dan password menjadi satu byte array
    const combinedBytes = new Uint8Array(usernameBytes.length + passwordBytes.length + 1);
    combinedBytes.set(usernameBytes);
    combinedBytes[usernameBytes.length] = 0; // Separator
    combinedBytes.set(passwordBytes, usernameBytes.length + 1);

    const base64String = toBase64(combinedBytes);

    // Ambil akun yang sudah ada (kalo ga ada ya kosong aja)
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(base64String); // Tambahkan akun baru
    localStorage.setItem('users', JSON.stringify(existingUsers));
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    storeUser(username, password);
    alert('Registration successful!');
    window.location.href = 'login.html';
});