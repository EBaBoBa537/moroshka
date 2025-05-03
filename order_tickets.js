// Пример данных (в реальности нужно подгружать их через fetch)
const seansId = "2"; // например, получено из адресной строки

// Загрузка данных (в реальности используйте fetch, здесь сокращённый вариант)
const seanses = {
    "seanses": [
        { "film": "1", "data": "2", "time": "11:25" },
        { "film": "3", "data": "2", "time": "10:15" }
    ]
};
const tickets = {
    "tickets": [
        { "seans": "2", "row": "3", "place": "4", "user": "1" },
        { "seans": "2", "row": "3", "place": "5", "user": "1" }
    ]
};
const films = {
    "films": [
        {
            "name": "Брат",
            "image": "film_1.jpg",
            "category": "Драма",
            "age_limit": "16+",
            "year": "1997",
            "duration": "1 ч 36 мин",
            "price": "12",
            "description": "...",
            "country": "Россия",
            "directors": "...",
            "actors": "..."
        },
        {
            "name": "Чужой",
            "image": "film_3.jpg",
            "category": "Ужасы",
            "age_limit": "18+",
            "year": "1979",
            "duration": "1 ч 57 мин",
            "price": "15",
            "description": "...",
            "country": "США",
            "directors": "...",
            "actors": "..."
        }
    ]
};

// Найдём нужный сеанс
const seans = seanses.seanses[Number(seansId) - 1];
if (!seans) {
    document.getElementById('film-info').textContent = 'Сеанс не найден';
} else {
    const film = films.films[Number(seans.film) - 1];
    const price = film.price;

    // Вывод информации о фильме и сеансе
    document.getElementById('film-info').innerHTML = `
        <h2>${film.name}</h2>
        <img src="${film.image}" alt="${film.name}" style="width:200px;">
        <p><strong>Категория:</strong> ${film.category}</p>
        <p><strong>Возраст:</strong> ${film.age_limit}</p>
        <p><strong>Год:</strong> ${film.year}</p>
        <p><strong>Продолжительность:</strong> ${film.duration}</p>
        <p><strong>Цена билета:</strong> ${price} у.е.</p>
        <p><strong>Дата:</strong> День ${seans.data}</p>
        <p><strong>Время:</strong> ${seans.time}</p>
    `;

    // Отображение занятых мест
    const seansTickets = tickets.tickets.filter(t => t.seans === seansId && t.user !== "-1");
    const occupiedSeats = seansTickets.map(t => `ряд ${t.row}, место ${t.place}`).join("<br>");

    document.getElementById('seats-info').innerHTML = `
        <h3>Занятые места:</h3>
        ${occupiedSeats || "Пока все места свободны"}
    `;
}
