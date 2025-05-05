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

    // Устанавливаем, что никто не авторизован
    localStorage.setItem('currentUserId', '-1');

    console.log('LocalStorage содержимое после загрузки:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
    }
})
.catch(err => console.error('Ошибка при загрузке данных:', err));

// Авторизация администратора
document.querySelector('button').addEventListener('click', () => {
    const kod = document.querySelector('input[name="admin-kod"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!kod || !password) {
        alert('Пожалуйста, введите код и пароль администратора.');
        return;
    }

    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin && admin.admin_kod === kod && admin.password === password) {
        localStorage.setItem('currentUserId', '-2');
        // alert('Вход выполнен как администратор!');
        window.location.href = 'admin_film_list.html';
    } else {
        alert('Неверный код или пароль администратора.');
    }
});
