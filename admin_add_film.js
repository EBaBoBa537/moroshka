// Загрузка/сохранение списка фильмов из localStorage
function loadFilms() {
    const raw = localStorage.getItem('filmsData');
    return raw ? JSON.parse(raw) : { films: [] };
}
function saveFilms(data) {
    localStorage.setItem('filmsData', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', () => {
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
    
    // Кнопки +/– для цены и сам спан
    const plusBtn  = document.querySelector('button.plus-minus');
    const minusBtn = document.querySelectorAll('button.plus-minus')[1];
    const priceSpan = plusBtn.nextElementSibling;
    
    // Кнопки "Добавить фильм" и "Отмена"
    const [ addBtn, cancelBtn ] = Array.from(
        document.querySelectorAll('button:not(.plus-minus)')
    );
    
    // Логика изменения цены
    function getPrice() {
        return parseInt(priceSpan.innerText.replace(/\D+/g, ''), 10);
    }
    function setPrice(val) {
        if (val < 0) val = 0;
        priceSpan.innerText = val + ' руб.';
    }
    plusBtn.addEventListener('click', () => setPrice(getPrice() + 1));
    minusBtn.addEventListener('click', () => setPrice(getPrice() - 1));
    
    // Клик "Добавить фильм"
    addBtn.addEventListener('click', () => {
        const name      = nameInput.value.trim();
        const image     = imageSelect.value;
        const category  = categorySelect.value;
        const age_limit = ageSelect.value;
        const year      = yearInput.value.trim();
        const duration  = durationInput.value.trim();
        const price     = getPrice().toString();
        const description = descInput.value.trim();
        const country     = countryInput.value.trim();
        const directors   = dirsInput.value.trim();
        const actors      = actorsInput.value.trim();
        
        if (!name || image === '-' || !year || !duration) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }
        
        const store = loadFilms();
        store.films.push({
            name, image, category, age_limit,
            year, duration, price,
            description, country, directors, actors
        });
        saveFilms(store);
        
        alert('Фильм добавлен!');
        // Сброс формы
        nameInput.value = '';
        imageSelect.value = '-';
        categorySelect.selectedIndex = 0;
        ageSelect.selectedIndex = 0;
        yearInput.value = '';
        durationInput.value = '';
        descInput.value = '';
        countryInput.value = '';
        dirsInput.value = '';
        actorsInput.value = '';
        setPrice(10);  // вернуть к дефолту
    });
    
    // Клик "Отмена"
    cancelBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
    });
});
