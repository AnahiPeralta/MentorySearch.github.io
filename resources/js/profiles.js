const dataContainer = document.getElementById('dataContainer');
const searchInput = document.getElementById('searchInput');
const showAllButton = document.getElementById('showAllButton');
const showMentorsButton = document.getElementById('showMentors');
const showMenteesButton = document.getElementById('showMentees');
const jsonFile = './data.json';
let originalData = [];
let currentRole = '';

function removeAccents(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function removeDuplicatesByNameAndLastName(data) {
  const unique = new Map();
  const result = [];

  data.forEach(item => {
    const mentorData = item.mentor;
    const key = mentorData.name + mentorData.last_name;

    if (!unique.has(key)) {
      unique.set(key, true);
      result.push(item);
    }
  });

  return result;
}

function showAllData(data) {
  dataContainer.innerHTML = '';

  data.forEach(item => {
    const mentorData = item.mentor;
    const menteeData = item.mentee;

    if (mentorData) {
      const element = document.createElement('div');
      element.innerHTML = `
        <div class="card-container">
          <div class="header-card"></div>
          <div class="body-card">
            <div class="img-container">
              <img src="${mentorData.profile}" alt="${mentorData.name}">
            </div>
            <div class="info-perf">
              <p>${mentorData.role}</p>
              <h3>${mentorData.name} ${mentorData.last_name}</h3> 
            </div>
            <div class="link-redes">
              <a href="${mentorData.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
              <a href="" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      `;
      dataContainer.appendChild(element);
    }

    if (menteeData) {
      const element = document.createElement('div');
      element.innerHTML = `
        <div class="card-container">
          <div class="header-card"></div>
          <div class="body-card">
            <div class="img-container">
              <img src="${menteeData.profile}" alt="${menteeData.name}">
            </div>
            <div class="info-perf">
              <p>${menteeData.role}</p>
              <h3>${menteeData.name} ${menteeData.last_name}</h3>
            </div>
            <div class="link-redes">
              <a href="${menteeData.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
              <a href="" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
              <a href="" target="_blank"><i class="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>
      `;
      dataContainer.appendChild(element);
    }
  });
}

function filterData(role = currentRole) {
  const searchQuery = removeAccents(searchInput.value.toLowerCase());

  const filteredData = originalData.filter(item => {
    const mentorFullName = item.mentor
      ? removeAccents(`${item.mentor.name} ${item.mentor.last_name}`).toLowerCase()
      : '';
    const menteeFullName = item.mentee
      ? removeAccents(`${item.mentee.name} ${item.mentee.last_name}`).toLowerCase()
      : '';

    return (
      (role === '' || (role === 'mentor' && item.mentor) || (role === 'mentee' && item.mentee)) &&
      (mentorFullName.includes(searchQuery) || menteeFullName.includes(searchQuery))
    );
  });

  return filteredData;
}

function displayData(data) {
  dataContainer.innerHTML = '';

  const filteredData = filterData();

  filteredData.forEach(item => {
    const roleData = currentRole === 'mentor' ? item.mentor : item.mentee;

    if (roleData) {
      const element = document.createElement('div');
      element.innerHTML = `
        <div class="card-container">
          <div class="header-card"></div>
          <div class="body-card">
            <div class="img-container">
              <img src="${roleData.profile}" alt="${roleData.name}">
            </div>
            <div class="info-perf">
              <p>${roleData.role}</p>
              <h3>${roleData.name} ${roleData.last_name}</h3>
            </div>
            <div class="link-redes">
              <a href="${roleData.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
              <a href="" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
              <a href="" target="_blank"><i class="fa-brands fa-github"></i></a>
            </div>
          </div>
        </div>
      `;
      dataContainer.appendChild(element);
    }
  });
}

searchInput.addEventListener('input', () => {
  displayData(originalData);
});

showAllButton.addEventListener('click', () => {
  currentRole = '';
  showAllData(originalData); // Mostrar todos los datos
});

showMentorsButton.addEventListener('click', () => {
  currentRole = 'mentor';
  displayData(filterData('mentor')); // Filtrar por mentor
});

showMenteesButton.addEventListener('click', () => {
  currentRole = 'mentee';
  displayData(filterData('mentee')); // Filtrar por mentee
});

// Utiliza fetch para cargar el archivo JSON
fetch(jsonFile)
  .then(response => response.json())
  .then(data => {
    originalData = removeDuplicatesByNameAndLastName(data);
    showAllData(originalData); // Mostrar todos los datos al cargar
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
