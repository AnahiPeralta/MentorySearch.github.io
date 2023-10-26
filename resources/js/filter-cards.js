const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const allCards = [];

function loadCards() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            allCards.push(...data);
            displayCards(allCards);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function displayCards(cards) {
    const cardsHTML = cards.map((card, index) => createCardHTML(card, index)).join('');
    cardsContainer.innerHTML = cardsHTML;
    addSeeMoreClickListeners();
}

function createCardHTML(card, index) {
    return `
    <div class="card-mentoring">
        <div class="header-card">
            <div class="hall">
                <p class="text-hall">Sala de Zoom N° ${card.mentor.hall}</p>
            </div>
        </div>
        <div class="content-card">
            <div class="mentor-container">
                <div class="container-img">
                    <a class="see_more" href="#" data-index="${index}" data-type="mentor">
                        <img class="img-profile" src="${card.mentor.profile}" class="card-img-top" alt="${card.mentor.name}">
                    </a>
                </div>
                <div class="info-mentor">
                    <span>${card.mentor.role}</span>
                    <h3 class="card-title">${card.mentor.name} ${card.mentor.last_name}</h3>
                </div>
            </div>
            <div class="mentee-container">
                <div class="container-img">
                    <a class="see_more" href="#" data-index="${index}" data-type="mentee">
                        <img class="img-profile" src="${card.mentee.profile}" class="card-img-top" alt="${card.mentee.name}">
                    </a>
                </div>
                <div class="info-mentee">
                    <span>${card.mentee.role}</span>
                    <h3 class="card-title">${card.mentee.name} ${card.mentee.last_name}</h3>
                </div>
            </div>
        </div>
    </div>`;
}

function addSeeMoreClickListeners() {
    const seeMoreLinks = document.querySelectorAll('.see_more');
    seeMoreLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const index = link.getAttribute('data-index');
            const cardType = link.getAttribute('data-type'); // Agregar un atributo data-type en el HTML para distinguir mentor de mentee

            if (cardType === 'mentor') {
                const userData = allCards[index].mentor;
                redirectToProfilePage(userData);
            } else if (cardType === 'mentee') {
                const userData = allCards[index].mentee;
                redirectToProfilePage(userData);
            }
        });
    });
}


function redirectToProfilePage(userData) {
    const params = new URLSearchParams(userData);
    window.location.href = `profile.html?${params.toString()}`;
}

function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkPartialMatch(searchQuery, fullName) {
    const searchWords = searchQuery.split(" ");
    return searchWords.every(word => fullName.includes(word));
}

searchInput.addEventListener('keyup', (e) => {
    const searchQuery = removeAccents(e.target.value).toLowerCase();
    const filteredCards = allCards.filter(card => {
        const mentorFullName = removeAccents(`${card.mentor.name} ${card.mentor.last_name}`).toLowerCase();
        const menteeFullName = removeAccents(`${card.mentee.name} ${card.mentee.last_name}`).toLowerCase();
        return (
            checkPartialMatch(searchQuery, mentorFullName) || checkPartialMatch(searchQuery, menteeFullName)
        );
    });

    displayCards(filteredCards);
});

loadCards();
