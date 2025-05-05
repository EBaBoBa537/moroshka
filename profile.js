// Проверка авторизации
const currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);

// Если пользователь не авторизован или зашёл администратор — отправляем на login
if (isNaN(currentUserId) || currentUserId === -1 || currentUserId === -2) {
    alert("Вы не вошли в аккаунт как пользователь.");
    window.location.href = "login.html";
}

// Получаем всех пользователей
const users = JSON.parse(localStorage.getItem("users")) || [];

// Находим текущего пользователя по ID
const currentUser = users.find(user => user.id === currentUserId);

if (!currentUser) {
    alert("Пользователь не найден.");
    window.location.href = "login.html";
}

// Заполняем поля на странице
document.querySelector('input[name="email"]').value = currentUser.email;
document.querySelector('input[name="password"]').value = currentUser.password;

// Кнопка "Сменить пароль"
document.querySelectorAll("button")[0].addEventListener("click", () => {
    const newPassword = prompt("Введите новый пароль:");
    if (newPassword && newPassword.trim().length >= 4) {
        currentUser.password = newPassword.trim();

        // Обновляем пользователя в массиве
        const updatedUsers = users.map(u => u.id === currentUserId ? currentUser : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Обновляем отображаемый пароль
        document.querySelector('input[name="password"]').value = newPassword.trim();

        alert("Пароль обновлён");
    } else {
        alert("Пароль должен быть не менее 4 символов");
    }
});

// Кнопка "Выйти из аккаунта"
document.querySelectorAll("button")[1].addEventListener("click", () => {
    localStorage.setItem("currentUserId", "-1");
    window.location.href = "login.html";
});

// Кнопка "Удалить аккаунт"
document.querySelectorAll("button")[2].addEventListener("click", () => {
    const confirmDelete = confirm("Вы уверены, что хотите удалить аккаунт?");
    if (confirmDelete) {
        const updatedUsers = users.filter(u => u.id !== currentUserId);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUserId", "-1");
        alert("Аккаунт удалён");
        window.location.href = "login.html";
    }
});
