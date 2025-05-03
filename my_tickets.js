document.addEventListener("DOMContentLoaded", () => {
    const currentEmail = localStorage.getItem("currentUserEmail");
    if (!currentEmail) {
        alert("Пользователь не авторизован");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")).users;
    const user = users.find(u => u.email === currentEmail);
    if (!user) {
        alert("Пользователь не найден");
        return;
    }

    const userId = users.indexOf(user);
    const tickets = JSON.parse(localStorage.getItem("tickets")).tickets;
    const seanses = JSON.parse(localStorage.getItem("seanses")).seanses;
    const films = JSON.parse(localStorage.getItem("films")).films;
    const days = JSON.parse(localStorage.getItem("days")).days;

    const userTickets = tickets.filter(t => t.user == userId);

    const seansMap = {};

    // Группируем билеты по сеансам
    userTickets.forEach(ticket => {
        if (!seansMap[ticket.seans]) seansMap[ticket.seans] = [];
        seansMap[ticket.seans].push(ticket);
    });

    const container = document.body;
    const existingBlocks = document.querySelectorAll(".film-block");
    existingBlocks.forEach(b => b.remove()); // Удалим шаблонные билеты

    for (const seansId in seansMap) {
        const seans = seanses.find(s => s.id == seansId);
        if (!seans) continue;

        const film = films.find(f => f.id == seans.film_id);
        const day = days.find(d => d.id == seans.day_id);
        const time = seans.time;

        const filmBlock = document.createElement("div");
        filmBlock.className = "film-block";

        filmBlock.innerHTML = `
            <div class="information">
                <img src="${film.image}">
                <div>
                    <p style="font-weight: bolder;">${film.title}</p>
                    <p>Кинозал "Морошка"</p>
                    <p>${day.title} <span style="background-color: #EDEDED; padding: 1px 5px; border-radius: 4px; font-size: 14px;">${time}</span></p>
                </div>
            </div>
            <div class="places"></div>
        `;

        const placesDiv = filmBlock.querySelector(".places");

        seansMap[seansId].forEach(ticket => {
            const placeDiv = document.createElement("div");
            placeDiv.className = "place";

            const placeSpan = document.createElement("span");
            placeSpan.style = "background-color: #EDEDED; padding: 2px 7px; border-radius: 5px; font-size: 15px;";
            placeSpan.textContent = `Ряд ${ticket.row}, место ${ticket.place} --- 10 руб.`;

            const cancelBtn = document.createElement("button");
            cancelBtn.style = "background-color: #EDEDED; padding: 2px 7px; border-radius: 5px; font-size: 15px;";
            cancelBtn.textContent = "Отменить";

            cancelBtn.addEventListener("click", () => {
                // Удаляем билет
                const index = tickets.indexOf(ticket);
                if (index !== -1) {
                    tickets.splice(index, 1);
                    localStorage.setItem("tickets", JSON.stringify({ tickets }));
                    placeDiv.remove();
                }
            });

            placeDiv.appendChild(placeSpan);
            placeDiv.appendChild(cancelBtn);
            placesDiv.appendChild(placeDiv);
        });

        container.insertBefore(filmBlock, document.querySelector("nav"));
    }
});
