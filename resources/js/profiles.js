const dataContainer = document.getElementById('dataContainer');
const searchInput = document.getElementById('searchInput');
const showAllButton = document.getElementById('showAllButton');
const showMentorsButton = document.getElementById('showMentors');
const showMenteesButton = document.getElementById('showMentees');
const jsonFile = './data.json';
let originalData = [];
let currentRole = '';

// Utiliza fetch para cargar el archivo JSON

  fetch(jsonFile)
  .then(response => response.json())
  .then(data => {
    originalData = data;
    showAllData(originalData); // Mostrar todos los datos al cargar
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
  
  
function removeAccents(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function showAllData(data) {
  dataContainer.innerHTML = '';

  data.forEach(item => {
    const mentorData = item.mentor;
    const menteeData = item.mentee;

    if (mentorData) {
      const element = document.createElement('div');
      element.innerHTML = `
        <h2>${mentorData.name} ${mentorData.last_name}</h2>
        <p>Role: ${mentorData.role}</p>
        <p>LinkedIn: <a href="${mentorData.linkedin}" target="_blank">${mentorData.linkedin}</a></p>
        <img src="${mentorData.profile}" alt="${mentorData.name}">
      `;
      dataContainer.appendChild(element);
    }

    if (menteeData) {
      const element = document.createElement('div');
      element.innerHTML = `
        <h2>${menteeData.name} ${menteeData.last_name}</h2>
        <p>Role: ${menteeData.role}</p>
        <p>LinkedIn: <a href="${menteeData.linkedin}" target="_blank">${menteeData.linkedin}</a></p>
        <img src="${menteeData.profile}" alt="${menteeData.name}">
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

  console.log("Current Role:", currentRole);
  const filteredData = filterData();

  console.log("Filtered Data:", filteredData);

  filteredData.forEach(item => {
    const roleData = currentRole === 'mentor' ? item.mentor : item.mentee;

    if (roleData) {
      const element = document.createElement('div');
      element.innerHTML = `
        <h2>${roleData.name} ${roleData.last_name}</h2>
        <p>Role: ${roleData.role}</p>
        <p>LinkedIn: <a href="${roleData.linkedin}" target="_blank">${roleData.linkedin}</a></p>
        <img src="${roleData.profile}" alt="${roleData.name}">
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
