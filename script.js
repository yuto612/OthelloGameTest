document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('result');

    // 認証処理
    if (username === 'user' && password === 'password') {
        resultDiv.textContent = 'Success';
        resultDiv.style.color = 'green';
        window.location.href = '/OthelloGameTest/OthelloGame/index.html';
    } else {
        resultDiv.textContent = 'Invalid username or password';
        resultDiv.style.color = 'red';
    }
});
