document.querySelector('button').addEventListener('click', () => {
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const confirm = document.querySelector('input[name="confirm"]').value.trim();

    if (!email || !password || !confirm) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    if (password !== confirm) {
        alert('Пароли не совпадают.');
        return;
    }

    // Загружаем текущих пользователей из localStorage или users.json
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users;

            // Проверка, существует ли уже такой email
            const exists = users.some(u => u.email === email);
            if (exists) {
                alert('Пользователь с таким email уже зарегистрирован.');
                return;
            }

            // Добавляем нового пользователя в localStorage (эмуляция добавления в файл)
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Регистрация прошла успешно!');
            window.location.href = 'login.html'; // перенаправление на страницу входа
        })
        .catch(error => {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации. Попробуйте позже.');
        });
});
