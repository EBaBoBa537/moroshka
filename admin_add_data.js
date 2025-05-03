function loadData() {
    const data = localStorage.getItem('daysData');
    return data ? JSON.parse(data) : { days: [] };
}

function saveData(data) {
    localStorage.setItem('daysData', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input[name="data"]');
    const addButton = document.querySelectorAll('button')[0]; // первый "Добавить дату"
    const cancelButton = document.querySelectorAll('button')[1]; // второй "Отмена"

    addButton.addEventListener('click', () => {
        const value = input.value.trim();
        if (value === "") {
            alert("Введите дату.");
            return;
        }

        const data = loadData();
        if (data.days.some(d => d.date === value)) {
            alert("Такая дата уже существует.");
            return;
        }

        data.days.push({ date: value });
        saveData(data);
        alert("Дата добавлена!");
        input.value = "";
    });

    cancelButton.addEventListener('click', () => {
        window.location.href = 'home.html';
    });
});
