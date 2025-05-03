document.querySelector('button').addEventListener('click', () => {
    const email = document.querySelector('input[name="admin-kod"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
        alert('Пожалуйста, введите email и пароль.');
        return;
    }

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('Вы успешно вошли!');
                // Переход на главную страницу после входа
                window.location.href = 'home.html';
            } else {
                alert('Неверный email или пароль.');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке users.json:', error);
            alert('Ошибка при авторизации. Попробуйте позже.');
        });
});
