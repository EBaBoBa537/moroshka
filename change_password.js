document.querySelectorAll('button')[0].addEventListener('click', () => {
    const oldPassword = document.querySelector('input[name="password-old"]').value.trim();
    const newPassword = document.querySelector('input[name="password-new"]').value.trim();
    const confirmPassword = document.querySelector('input[name="password-new-2"]').value.trim();
    const currentUserEmail = localStorage.getItem('currentUserEmail');

    if (!currentUserEmail) {
        alert('Пользователь не найден. Пожалуйста, войдите заново.');
        return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Новые пароли не совпадают.');
        return;
    }

    fetch('users.json')
        .then(res => res.json())
        .then(data => {
            const users = JSON.parse(localStorage.getItem('users')) || data.users;

            const userIndex = users.findIndex(user => user.email === currentUserEmail);

            if (userIndex === -1) {
                alert('Пользователь не зарегистрирован.');
                return;
            }

            if (users[userIndex].password !== oldPassword) {
                alert('Старый пароль неверен.');
                return;
            }

            users[userIndex].password = newPassword;

            localStorage.setItem('users', JSON.stringify(users));
            alert('Пароль успешно изменён.');
            window.location.href = 'activity_profile.html'; // переход на профиль
        })
        .catch(error => {
            console.error('Ошибка при смене пароля:', error);
            alert('Произошла ошибка. Попробуйте позже.');
        });
});

// Кнопка "Отмена"
document.querySelectorAll('button')[1].addEventListener('click', () => {
    history.back();
});
