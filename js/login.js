// pengecekan siapa yang login
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedIn');
    if (loggedInUser) {
        window.location.href = 'index.html';
        alert("anda harus logout dulu")
    }
});

// fungsi mengubah base64 ke uint8array
// contoh: Uint8Array [ 72, 101, 108, 108, 111 ]
function fromBase64(base64) {
    const binaryString = atob(base64); // atob untuk decode dari base64 ke string

    // ... ini adalah spread operator
    // string di pisah pisah per huruf dan disimpan di array lalu di mapping dan diubah jadi ASCII
    // dan di taro masing masing data di Uint8Array sehingga tipe datanya menjadi
    // contoh: Uint8Array [ 65, 66, 67 ]
    return new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
}

// fungsi ngambil user di localStorage
function getUsers() {
    const usersData = localStorage.getItem('users');
    if (usersData) {
        return JSON.parse(usersData);
    }
    return [];
}

// dijalankan ketika onsubmit di loginForm
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    let isValidUser = false; // default false

    // perulangan data array of object
    for (const user of users) {
        // per 1 data diubah ke utf8
        const userBytes = fromBase64(user);

        // objeck yang memiliki fungsi pengubah utf8 ke string
        const decoder = new TextDecoder();

        // Temukan index separator (0), karena itu pemisah username dengan password
        const separatorIndex = userBytes.indexOf(0);

        // fungsi decode() untuk utf8 di ubah ke string
        // fungsi subarray(index awal, index akhir) mengambil data dari index yang ditentukan
        const storedUsername = decoder.decode(userBytes.subarray(0, separatorIndex));

        // untuk password index awal adalah separatorIndex+1 karena password ada setelah pemisah, parameter kedua ga perlu di isi karena sudah auto sampe akhir kalo ga diisi
        const storedPassword = decoder.decode(userBytes.subarray(separatorIndex + 1));

        // Cek kredensial
        if (storedUsername === username && storedPassword === password) {
            isValidUser = true; // set jadi true
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