document.addEventListener("DOMContentLoaded", () => {
    const currentUserId = parseInt(localStorage.getItem("currentUserId"), 10);

    if (isNaN(currentUserId) || currentUserId === -1 || currentUserId === -2) {
        alert("Вы не вошли в систему как пользователь");
        window.location.href = "login.html";
        return;
    }

    // Получаем данные
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const seanses = JSON.parse(localStorage.getItem("seanses")) || [];
    const films = JSON.parse(localStorage.getItem("films")) || [];
    const days = JSON.parse(localStorage.getItem("days")) || [];

    // Фильтруем билеты текущего пользователя
    const userTickets = tickets.filter(t => t.user === currentUserId);

    // Группируем билеты по ID сеанса
    const seansMap = {};
    userTickets.forEach(ticket => {
        if (!seansMap[ticket.seans]) seansMap[ticket.seans] = [];
        seansMap[ticket.seans].push(ticket);
    });

    // Очищаем старые блоки
    const existingBlocks = document.querySelectorAll(".film-block");
    existingBlocks.forEach(b => b.remove());

    const container = document.body;

    for (const seansId in seansMap) {
        const seans = seanses.find(s => s.id === parseInt(seansId));
        if (!seans) continue;

        const film = films.find(f => f.id === seans.film_id);
        const day = days.find(d => d.id === seans.day_id);
        if (!film || !day) continue;

        const filmBlock = document.createElement("div");
        filmBlock.className = "film-block";

        filmBlock.innerHTML = `
            <div class="information">
                <img src="${film.image}">
                <div>
                    <p style="font-weight: bolder;">${film.title}</p>
                    <p>Кинозал "Морошка"</p>
                    <p>${day.title} <span style="background-color: #EDEDED; padding: 1px 5px; border-radius: 4px; font-size: 14px;">${seans.time}</span></p>
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
                const index = tickets.findIndex(t => t.id === ticket.id);
                if (index !== -1) {
                    tickets.splice(index, 1);
                    localStorage.setItem("tickets", JSON.stringify(tickets));
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
