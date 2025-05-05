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

    // Добавляем текущего пользователя (-1 = никто не авторизован)
    localStorage.setItem('currentUserId', '-1');

    // Правильный вывод всех ключей
    console.log('LocalStorage содержимое после загрузки:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}:`, JSON.parse(localStorage.getItem(key)));
    }
})
.catch(err => console.error('Ошибка при загрузке данных:', err));


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

    // Назначаем ID (максимальный + 1 или 1, если список пуст)
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;

    // Создаем пользователя и сохраняем
    const newUser = { id: newId, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Устанавливаем текущего пользователя
    localStorage.setItem('currentUserId', String(newId));

    // alert('Регистрация прошла успешно!');
    window.location.href = 'login.html';
});
