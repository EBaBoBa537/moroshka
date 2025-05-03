function loadData() {
    const data = localStorage.getItem('daysData');
    return data ? JSON.parse(data) : { days: [] };
}

function saveData(data) {
    localStorage.setItem('daysData', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('data');
    const deleteButton = document.querySelectorAll('button')[0];
    const cancelButton = document.querySelectorAll('button')[1];

    const data = loadData();

    // Очищаем и добавляем актуальные даты
    select.innerHTML = '<option value="-">-</option>';
    data.days.forEach(d => {
        const option = document.createElement('option');
        option.value = d.date;
        option.textContent = d.date;
        select.appendChild(option);
    });

    deleteButton.addEventListener('click', () => {
        const selected = select.value;
        if (selected === "-" || !selected) {
            alert("Выберите дату для удаления.");
            return;
        }

        const newData = {
            days: data.days.filter(d => d.date !== selected)
        };

        saveData(newData);
        alert("Дата удалена.");
        window.location.reload(); // обновляем список
    });

    cancelButton.addEventListener('click', () => {
        window.location.href = 'home.html';
    });
});
