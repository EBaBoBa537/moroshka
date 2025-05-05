// Очистка и загрузка
localStorage.clear();
Promise.all([
    fetch('admin.json').then(res => res.json()),
    fetch('films.json').then(res => res.json()),
    fetch('days.json').then(res => res.json()),
    fetch('seanses.json').then(res => res.json()),
    fetch('tickets.json').then(res => res.json()),
    fetch('users.json').then(res => res.json())
])
.then(([admin, films, days, seanses, tickets, users]) => {
    localStorage.setItem('admin', JSON.stringify(admin.admin));
    localStorage.setItem('films', JSON.stringify(films.films));
    localStorage.setItem('days', JSON.stringify(days.days));
    localStorage.setItem('seanses', JSON.stringify(seanses.seanses));
    localStorage.setItem('tickets', JSON.stringify(tickets.tickets));
    localStorage.setItem('users', JSON.stringify(users.users));
})
.catch(err => console.error('Ошибка при загрузке данных:', err));

// ПРОВЕРКА LOCALSTORAGE
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
}


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

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.some(u => u.email === email);
    if (exists) {
        alert('Пользователь с таким email уже зарегистрирован.');
        return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация прошла успешно!');
    window.location.href = 'login.html';
});
