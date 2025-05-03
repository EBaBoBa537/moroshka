let filmsData = [];
let seansesData = [];
let selectedDayIndex = 0;

// Загрузка JSON-файлов
Promise.all([
    fetch('films.json').then(r => r.json()),
    fetch('seanses.json').then(r => r.json())
])
.then(([films, seanses]) => {
    filmsData = films.films;
    seansesData = seanses.seanses;
    renderFilms();
});

// Отрисовка фильмов по выбранному дню
function renderFilms() {
    const container = document.querySelector('.films');
    container.innerHTML = '';

    // Фильтруем сеансы по выбранному дню
    const todaySeanses = seansesData.filter(s => parseInt(s.data) === selectedDayIndex);

    // Получаем id фильмов, которые идут в этот день
    const filmIdsToday = [...new Set(todaySeanses.map(s => s.film))];

    // Отрисовываем каждый фильм
    filmIdsToday.forEach(filmId => {
        const film = filmsData[parseInt(filmId) - 1];
        const times = todaySeanses
            .filter(s => s.film === filmId)
            .map(s => s.time);

        const filmElement = document.createElement('div');
        filmElement.className = 'film';
        filmElement.innerHTML = `
            <img src="drawable/${film.image}">
            <div>
                <span style="margin-top: 0px;">
                    <div class="yelow-block">${film.category}</div>
                    <div class="yelow-block">${film.age_limit}</div>                    
                </span>
                <span><div>${film.name}</div></span>
                <span><div>${film.price} руб.</div></span>
                <span>
                    ${times.map(t => `<button class="time">${t}</button>`).join('')}
                </span>
            </div>
        `;
        container.appendChild(filmElement);
    });
}

// Навешиваем обработчики на кнопки дней
document.querySelectorAll('.day').forEach((button, index) => {
    button.addEventListener('click', () => {
        selectedDayIndex = index;
        renderFilms();
    });
});
