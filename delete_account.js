document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.querySelectorAll("button")[0];
    const cancelBtn = document.querySelectorAll("button")[1];

    // Удаление аккаунта
    deleteBtn.addEventListener("click", () => {
        const currentEmail = localStorage.getItem("currentUserEmail");
        if (!currentEmail) {
            alert("Ошибка: пользователь не найден.");
            return;
        }

        // Получаем пользователей
        const usersData = JSON.parse(localStorage.getItem("users"));
        if (!usersData || !Array.isArray(usersData.users)) {
            alert("Ошибка: данные пользователей повреждены.");
            return;
        }

        // Удаляем текущего пользователя
        usersData.users = usersData.users.filter(u => u.email !== currentEmail);

        // Сохраняем обновлённый список
        localStorage.setItem("users", JSON.stringify(usersData));
        localStorage.removeItem("currentUserEmail");

        alert("Аккаунт удалён.");
        window.location.href = "login.html";
    });

    // Отмена
    cancelBtn.addEventListener("click", () => {
        window.history.back();
    });
});
