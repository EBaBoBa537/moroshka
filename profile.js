// Получение всех пользователей из localStorage или создание по умолчанию
let users = JSON.parse(localStorage.getItem("users"));
if (!users) {
    users = [
        {
            email: "user@gmail.com",
            password: "1234"
        },
        {
            email: "user2@gmail.com",
            password: "1234"
        }
    ];
    localStorage.setItem("users", JSON.stringify(users));
}

// Получаем email текущего пользователя
const currentUserEmail = localStorage.getItem("currentUserEmail");
if (!currentUserEmail) {
    alert("Вы не вошли в систему");
    window.location.href = "login.html";
}

// Находим текущего пользователя
let currentUserIndex = users.findIndex(user => user.email === currentUserEmail);
if (currentUserIndex === -1) {
    alert("Пользователь не найден");
    window.location.href = "login.html";
}

const currentUser = users[currentUserIndex];

// Заполняем форму
document.querySelector('input[name="email"]').value = currentUser.email;
document.querySelector('input[name="password"]').value = currentUser.password;

// Кнопка "Сменить пароль"
document.querySelectorAll("button")[0].addEventListener("click", () => {
    const newPassword = prompt("Введите новый пароль:");
    if (newPassword && newPassword.trim().length >= 4) {
        users[currentUserIndex].password = newPassword.trim();
        localStorage.setItem("users", JSON.stringify(users));
        document.querySelector('input[name="password"]').value = newPassword.trim();
        alert("Пароль обновлён");
    } else {
        alert("Пароль должен быть не менее 4 символов");
    }
});

// Кнопка "Выйти из аккаунта"
document.querySelectorAll("button")[1].addEventListener("click", () => {
    localStorage.removeItem("currentUserEmail");
    window.location.href = "login.html";
});

// Кнопка "Удалить аккаунт"
document.querySelectorAll("button")[2].addEventListener("click", () => {
    const confirmDelete = confirm("Вы уверены, что хотите удалить аккаунт?");
    if (confirmDelete) {
        users.splice(currentUserIndex, 1);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem("currentUserEmail");
        alert("Аккаунт удалён");
        window.location.href = "login.html";
    }
});
