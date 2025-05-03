// Подгрузка users.json (в реальности через fetch — эмулируем загрузку)
const users = {
    "users": [
        {
            "email": "user@gmail.com",
            "password": "1234"
        },
        {
            "email": "user2@gmail.com",
            "password": "1234"
        }
    ]
};

// Получаем email текущего пользователя из localStorage
const currentUserEmail = localStorage.getItem("currentUserEmail");

// Найдём пользователя
let currentUser = users.users.find(u => u.email === currentUserEmail);

// Если не найден — перенаправляем
if (!currentUser) {
    alert("Вы не вошли в систему");
    window.location.href = "login.html"; // или другой адрес входа
}

// Подставим данные
document.querySelector('input[name="email"]').value = currentUser.email;
document.querySelector('input[name="password"]').value = currentUser.password;

// Кнопка "Сменить пароль"
document.querySelectorAll("button")[0].addEventListener("click", () => {
    const newPassword = prompt("Введите новый пароль:");
    if (newPassword) {
        currentUser.password = newPassword;
        document.querySelector('input[name="password"]').value = newPassword;
        alert("Пароль обновлён");
        // В реальном приложении — сохраняем на сервере или в localStorage
    }
});

// Кнопка "Выйти из аккаунта"
document.querySelectorAll("button")[1].addEventListener("click", () => {
    localStorage.removeItem("currentUserEmail");
    window.location.href = "login.html"; // обратно на страницу входа
});

// Кнопка "Удалить аккаунт"
document.querySelectorAll("button")[2].addEventListener("click", () => {
    const confirmDelete = confirm("Вы уверены, что хотите удалить аккаунт?");
    if (confirmDelete) {
        users.users = users.users.filter(u => u.email !== currentUser.email);
        localStorage.removeItem("currentUserEmail");
        alert("Аккаунт удалён");
        window.location.href = "login.html";
        // В реальности — обновляем файл или отправляем запрос на сервер
    }
});
