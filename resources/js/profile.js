const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const last_name = urlParams.get('last_name');
const profile = urlParams.get('profile');
const role = urlParams.get('role');

// Luego, puedes usar estos datos para mostrar la información en tu card
document.querySelector('.card-title').textContent = `${name} ${last_name}`;
document.querySelector('.img-profile').src = profile;
document.querySelector('.info-mentor span').textContent = role;