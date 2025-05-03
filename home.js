const filmsData = JSON.parse(localStorage.getItem('films'))?.films || [];
const seansesData = JSON.parse(localStorage.getItem('seanses'))?.seanses || [];

const todayContainer = document.getElementById('today-films');
const categoriesContainer = document.getElementById('categories-container');

// Определяем id фильмов, идущих сегодня (data === "1")
const todayFilmIds = new Set(
    seansesData
        .filter(seans => seans.data === "1")
        .map(seans => parseInt(seans.film))
);

const categories = {};

filmsData.forEach((film, index) => {
    const filmId = index + 1;

    // "Сегодня в кино"
    if (todayFilmIds.has(filmId)) {
        const link = document.createElement('a');
        link.href = `activity_film_detail.html?id=${filmId}`;
        link.className = 'film today-film';
        link.innerHTML = `<img src="drawable/${film.image}" /><p class="name-film">${film.name}</p>`;
        todayContainer.appendChild(link);
    }

    // Категории
    if (!categories[film.category]) {
        categories[film.category] = [];
    }
    categories[film.category].push({ ...film, id: filmId });
});

// Создаём блоки по категориям
Object.keys(categories).forEach(category => {
    const title = document.createElement('h4');
    title.textContent = category;
    categoriesContainer.appendChild(title);

    const row = document.createElement('div');
    row.className = 'films';
    categories[category].forEach(film => {
        const link = document.createElement('a');
        link.href = `activity_film_detail.html?id=${film.id}`;
        link.className = 'film small-film';
        link.innerHTML = `<img src="drawable/${film.image}" /><p class="name-film">${film.name}</p>`;
        row.appendChild(link);
    });

    categoriesContainer.appendChild(row);
});