document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedIn');
    if (loggedInUser) {
        window.location.href = 'index.html';
        alert("anda harus logout dulu")
    }
});

// fungsi ini mengubah uint8array menjadi huruf lalu baru ke base64
function toBase64(byteArray) {
    // String.fromCharCode() digunakan untuk mengonversi nilai-nilai numerik menjadi karakter yang sesuai berdasarkan kode Unicode.
    // btoa() mengubah string jadi base64
    return btoa(String.fromCharCode(...byteArray));
}

function storeUser(username, password) {
    // membuat instance baru dari TextEncoder
    const encoder = new TextEncoder();

    // username dan passwordBytes jadi BytesUint8Array
    // contoh utf8: Uint8Array(5) [ 72, 101, 108, 108, 111 ] 
    const usernameBytes = encoder.encode(username);
    const passwordBytes = encoder.encode(password);


    // mengambil panjang byte username dan password
    // +1 karena Menambahkan satu untuk menyisakan ruang bagi sebuah byte pemisah (dalam hal ini, byte null atau 0) antara username dan password.
    // username dan password digabung di combinedBytes, usernameBytes.length + passwordBytes.length agar cukup dan  +1 adalah pemisah
    // jika usernameBytes.length 4 dan passwordBytes.length 4 combinedBytes akan memiliki panjang 4 + 4 + 1 = 9
    const combinedBytes = new Uint8Array(usernameBytes.length + passwordBytes.length + 1);

    // combinedBytes sudah disesuaikan luasnya maka tinggal di isi
    combinedBytes.set(usernameBytes); // combinedBytes = [117, 115, 101, 114, ?, ?, ?, ?, ?]
    combinedBytes[usernameBytes.length] = 0; // combinedBytes = [117, 115, 101, 114, 0, ?, ?, ?, ?].
    combinedBytes.set(passwordBytes, usernameBytes.length + 1); // combinedBytes = [117, 115, 101, 114, 0, 112, 97, 115, 115].

    // berubah jadi base64
    const base64String = toBase64(combinedBytes);

    // localstorage hanya bisa menyimpan string jadi di parse dulu ke object js, di local storage datanya adalah array of object
    // ambil user yang sudah ada dulu karena nanti akan digabung dengan user yang baru daftar, kalo ga ada jadi array kosong aja
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // existingUsers adalah array maka ada method push
    // push base64String ke existingUsers
    existingUsers.push(base64String); 

    // set existingUsers ke local storage dengan key users dengan value data string
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