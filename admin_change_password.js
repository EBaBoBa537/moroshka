document.querySelectorAll('button')[0].addEventListener('click', () => {
    const oldPassword = document.querySelector('input[name="password-old"]').value.trim();
    const newPassword = document.querySelector('input[name="password-new"]').value.trim();
    const confirmPassword = document.querySelector('input[name="password-new-2"]').value.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Новые пароли не совпадают.');
        return;
    }

    fetch('admin.json')
        .then(res => res.json())
        .then(data => {
            let storedAdmin = localStorage.getItem('admin');
            let admin = storedAdmin ? JSON.parse(storedAdmin) : data.admin;

            if (admin.password !== oldPassword) {
                alert('Неверный текущий пароль.');
                return;
            }

            admin.password = newPassword;
            localStorage.setItem('admin', JSON.stringify(admin));
            alert('Пароль успешно обновлён.');
            window.location.href = 'login_admin.html'; // можно изменить на другой путь
        })
        .catch(error => {
            console.error('Ошибка при смене пароля:', error);
            alert('Произошла ошибка. Попробуйте позже.');
        });
});

// Кнопка "Отмена" — возвращаемся назад
document.querySelectorAll('button')[1].addEventListener('click', () => {
    history.back();
});
