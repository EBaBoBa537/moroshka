const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const films = JSON.parse(localStorage.getItem('films'))?.films || [];
const days = JSON.parse(localStorage.getItem('days'))?.days || [];
const seanses = JSON.parse(localStorage.getItem('seanses'))?.seanses || [];

const film = films[id - 1];
if (!film) {
  document.getElementById('film-name').textContent = 'Фильм не найден';
  throw new Error('Фильм не найден');
}

// Заполняем карточку
document.getElementById('film-image').src = `drawable/${film.image}`;
document.getElementById('film-name').textContent = film.name;
document.getElementById('film-category').textContent = film.category;
document.getElementById('film-age').textContent = film.age_limit;
document.getElementById('film-description').textContent = film.description;

document.getElementById('film-info').innerHTML = `
  <span><span style="color: #A6A6A6;">Страна: </span>${film.country}</span><br>
  <span><span style="color: #A6A6A6;">Год: </span>${film.year}</span><br>
  <span><span style="color: #A6A6A6;">Режиссеры: </span>${film.directors}</span><br>
  <span><span style="color: #A6A6A6;">В ролях: </span>${film.actors}</span><br>
  <span><span style="color: #A6A6A6;">Длительность: </span>${film.duration}</span><br>
  <span><span style="color: #A6A6A6;">Возрастное ограничение: </span>${film.age_limit}</span><br>
  <span><span style="color: #A6A6A6;">Жанр: </span>${film.category}</span>
`;

// Заполняем расписание
const container = document.getElementById('seanses-container');
days.slice(0, 5).forEach((day, index) => {
  const daySeanses = seanses.filter(s => s.film == id && s.data == index + 1);
  const dateStr = new Date(day.date.split('.').reverse().join('-')).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
  const p1 = document.createElement('p');
  p1.style.cssText = "font-size: 16px; margin-top: 15px;";
  p1.textContent = `${day.date}, ${dateStr}   ${film.price} руб.`;
  container.appendChild(p1);

  const p2 = document.createElement('p');
  if (daySeanses.length > 0) {
    daySeanses.forEach(s => {
      const span = document.createElement('span');
      span.className = 'grey';
      span.textContent = s.time;
      p2.appendChild(span);
    });
  } else {
    const span = document.createElement('span');
    span.className = 'no-grey';
    span.textContent = 'Нет сеансов';
    p2.appendChild(span);
  }
  container.appendChild(p2);
});