// Загружаем список фильмов из localStorage
function loadFilms() {
    const raw = localStorage.getItem('filmsData');
    return raw ? JSON.parse(raw) : { films: [] };
}

document.addEventListener('DOMContentLoaded', () => {
    const store = loadFilms();  // сделали загрузку — получили объект { films: [...] }
    const container = document.querySelector('.films');
    container.innerHTML = '';   // очистили контейнер под динамические элементы

    // сделали перебор массива — создали и вставили блоки фильмов
    store.films.forEach((film, idx) => {
        const link = document.createElement('a');
        link.href = `activity_edit_film.html?index=${idx}`;  // передаём индекс в URL
        link.className = 'film';

        const img = document.createElement('img');
        img.src = `drawable/${film.image}`;
        img.alt = film.name;

        const title = document.createElement('p');
        title.className = 'name-film';
        title.textContent = film.name;

        link.appendChild(img);
        link.appendChild(title);
        container.appendChild(link);
    });

    // сделали выбор кнопки — получили навигацию на страницу добавления
    const addBtn = document.querySelector('button');
    addBtn.addEventListener('click', () => {
        window.location.href = 'activity_add_film.html';
    });
});
