document.addEventListener("DOMContentLoaded", async () => {
    const selects = document.querySelectorAll(".select-time");
    const dayButtons = document.querySelectorAll(".day");
    let selectedDateIndex = 0;

    // Загрузка фильмов
    const filmsData = await fetch("films.json").then(r => r.json());
    const films = filmsData.films;

    // Заполнение <select> элементами
    selects.forEach(select => {
        select.innerHTML = ""; // очистить старые
        films.forEach((film, index) => {
            const option = document.createElement("option");
            option.value = index + 1; // ID фильма как в seanses.json
            option.textContent = film.name;
            select.appendChild(option);
        });
    });

    // Обработка выбора дня
    dayButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            selectedDateIndex = index + 1;
            loadDaySchedule(selectedDateIndex);
        });
    });

    // Загрузка текущего расписания из localStorage
    const seanses = JSON.parse(localStorage.getItem("seanses")) || [];

    function loadDaySchedule(dayIndex) {
        selects.forEach((select, i) => {
            const hour = getHourByIndex(i);
            const seans = seanses.find(s => s.data == dayIndex && s.time == hour);
            select.value = seans ? seans.film : selects[0].options[0].value;
        });
    }

    function getHourByIndex(i) {
        return `${10 + i}:00`; // 10:00, 11:00, 12:00, 13:00
    }

    // Сохраняем расписание при изменении любого селекта
    selects.forEach((select, i) => {
        select.addEventListener("change", () => {
            const time = getHourByIndex(i);
            const filmId = select.value;

            const existingIndex = seanses.findIndex(s => s.data == selectedDateIndex && s.time == time);
            if (existingIndex !== -1) {
                seanses[existingIndex].film = filmId;
            } else {
                seanses.push({ film: filmId, data: selectedDateIndex, time: time });
            }

            localStorage.setItem("seanses", JSON.stringify(seanses));
        });
    });

    // Начальная загрузка для первой даты
    loadDaySchedule(selectedDateIndex + 1);
});
