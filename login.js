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

    // Правильный вывод всех ключей
    console.log('LocalStorage содержимое после загрузки:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
    }
})
.catch(err => console.error('Ошибка при загрузке данных:', err));

// Авторизация
document.querySelector('button').addEventListener('click', () => {
    const email = document.querySelector('input[name="admin-kod"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
        alert('Пожалуйста, введите email и пароль.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Вы успешно вошли!');
        window.location.href = 'home.html';
    } else {
        alert('Неверный email или пароль.');
    }
});
