const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const allCards = []; 

function loadCards() {
    fetch('../cards.json')
        .then(response => response.json())
        .then(data => {
            allCards.push(...data); 
            displayCards(allCards); 
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function displayCards(cards) {
    const cardsHTML = cards.map(card => createCardHTML(card)).join('');
    cardsContainer.innerHTML = cardsHTML;
}

function createCardHTML(card) {
    return `
    <div class="card-mentoring">
        <div class="mentor">
            <a href="${card.mentor.linkedin}" target="_blank">
                <img class="img-perfil" src="${card.mentor.profile}" class="card-img-top" alt="${card.mentor.name}">
            </a>
            <div class='info-mentor'>
                <span>${card.mentor.role}</span>
                <h4 class="card-title">${card.mentor.name} ${card.mentor.last_name}</h4>
            </div>
        </div>
        <div class="hall">
            <p class="text-hall">Hall ${card.mentor.hall}</p>
        </div>
        <div class="mentee">
            <div class='info-mentee'>
                <span>${card.mentee.role}</span>
                <h4 class="card-title">${card.mentee.name} ${card.mentee.last_name}</h4>
            </div>
            <a href="${card.mentee.linkedin}" target="_blank">
                <img class="img-perfil" src="${card.mentee.profile}" class="card-img-top" alt="${card.mentee.name}">
            </a>
        </div>
    </div>`;
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
