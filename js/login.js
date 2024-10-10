document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedIn');
    if (loggedInUser) {
        window.location.href = 'index.html';
        alert("anda harus logout dulu")
    }
});

function fromBase64(base64) {
    const binaryString = atob(base64);
    return new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
}

function getUsers() {
    const usersData = localStorage.getItem('users');
    if (usersData) {
        return JSON.parse(usersData);
    }
    return [];
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    let isValidUser = false;

    for (const user of users) {
        const userBytes = fromBase64(user);
        const decoder = new TextDecoder();

        // Temukan separator (0)
        const separatorIndex = userBytes.indexOf(0);
        const storedUsername = decoder.decode(userBytes.subarray(0, separatorIndex));
        const storedPassword = decoder.decode(userBytes.subarray(separatorIndex + 1));

        // Cek kredensial
        if (storedUsername === username && storedPassword === password) {
            isValidUser = true;
            localStorage.setItem('loggedIn', username); // Simpan username yang login
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect ke halaman dashboard
            break;
        }
    }

    if (!isValidUser) {
        alert('Invalid credentials!');
    }
});