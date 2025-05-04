document.querySelector('button').addEventListener('click', () => {
    const kod = document.querySelector('input[name="admin-kod"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!kod || !password) {
        alert('Пожалуйста, введите код и пароль администратора.');
        return;
    }

    fetch('admin.json')
        .then(response => response.json())
        .then(data => {
            if (data.admin.admin_kod === kod && data.admin.password === password) {
                localStorage.setItem('adminLoggedIn', 'true');
                alert('Вход выполнен как администратор!');
                // Перенаправление на админ-панель
                window.location.href = 'admin_film_list.html';
            } else {
                alert('Неверный код или пароль администратора.');
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке admin.json:', error);
            alert('Ошибка авторизации администратора.');
        });
});
