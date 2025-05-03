function loadFilms() {
    const raw = localStorage.getItem('filmsData');
    return raw ? JSON.parse(raw) : { films: [] };
}
function saveFilms(data) {
    localStorage.setItem('filmsData', JSON.stringify(data));
}

// Получаем параметр index из URL
function getFilmIndex() {
    const params = new URLSearchParams(window.location.search);
    const idx = parseInt(params.get('index'), 10);
    return Number.isInteger(idx) ? idx : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const idx = getFilmIndex();
    const store = loadFilms();

    if (idx === null || idx < 0 || idx >= store.films.length) {
        alert('Неверный фильм для редактирования');
        window.location.href = 'home.html';
        return;
    }

    const film = store.films[idx];

    // Поля формы
    const nameInput      = document.querySelector('input[name="name"]');
    const imageSelect    = document.getElementById('image');
    const categorySelect = document.getElementById('category');
    const ageSelect      = document.getElementById('age_limit');
    const yearInput      = document.querySelector('input[name="year"]');
    const durationInput  = document.querySelector('input[name="duration"]');
    const descInput      = document.querySelector('input[name="description"]');
    const countryInput   = document.querySelector('input[name="country"]');
    const dirsInput      = document.querySelector('input[name="directors"]');
    const actorsInput    = document.querySelector('input[name="actors"]');
    const [plusBtn, minusBtn] = Array.from(document.querySelectorAll('button.plus-minus'));
    const priceSpan      = plusBtn.nextElementSibling;
    const buttons        = Array.from(document.querySelectorAll('button:not(.plus-minus)'));
    const saveBtn        = buttons[0];
    const deleteBtn      = buttons[1];
    const cancelBtn      = buttons[2];

    // Вспомогательные функции для цены
    function getPrice() {
        return parseInt(priceSpan.textContent, 10) || 0;
    }
    function setPrice(val) {
        priceSpan.textContent = `${Math.max(0, val)} руб.`;
    }

    // Заполняем форму текущими значениями
    nameInput.value       = film.name;
    imageSelect.value     = film.image;
    categorySelect.value  = film.category;
    ageSelect.value       = film.age_limit;
    yearInput.value       = film.year;
    durationInput.value   = film.duration;
    descInput.value       = film.description;
    countryInput.value    = film.country;
    dirsInput.value       = film.directors;
    actorsInput.value     = film.actors;
    setPrice(parseInt(film.price, 10));

    // Инкремент/декремент цены
    plusBtn.addEventListener('click', () => setPrice(getPrice() + 1));
    minusBtn.addEventListener('click', () => setPrice(getPrice() - 1));

    // Сохранить изменения
    saveBtn.addEventListener('click', () => {
        const updated = {
            name:       nameInput.value.trim(),
            image:      imageSelect.value,
            category:   categorySelect.value,
            age_limit:  ageSelect.value,
            year:       yearInput.value.trim(),
            duration:   durationInput.value.trim(),
            price:      getPrice().toString(),
            description: descInput.value.trim(),
            country:     countryInput.value.trim(),
            directors:   dirsInput.value.trim(),
            actors:      actorsInput.value.trim()
        };

        if (!updated.name || updated.image === '-' || !updated.year || !updated.duration) {
            alert('Заполните все обязательные поля.');
            return;
        }

        store.films[idx] = updated;
        saveFilms(store);
        alert('Фильм сохранён.');
        window.location.href = 'home.html';
    });

    // Удалить фильм
    deleteBtn.addEventListener('click', () => {
        if (!confirm('Удалить этот фильм?')) return;
        store.films.splice(idx, 1);
        saveFilms(store);
        alert('Фильм удалён.');
        window.location.href = 'home.html';
    });

    // Отмена
    cancelBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
    });
});
