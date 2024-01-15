const apiUsuarios = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/')
        //console.log(response)

        if (response.status === 200) {
            const data = await response.json()
            const user = data.results[0]
            return user
        }
    } catch (error) {
        console.log(error.message)
    }
}

const buscador = document.querySelector('.headerUser_input');
const listUser = document.querySelector('.listUsers');
const cardUser = document.querySelector('.CardUser');
const loader = document.querySelector('.loader');

const cargarUsuarios = async (number) => {
    let users = [];
    try {
        for(let i = 0; i < number; i++) {
            const user = await apiUsuarios();
            if (user) {
                users.push(user);
            }
        }
    } catch (error) {
        console.log(error.message)
    }
    return users;
}

const buscadorPorNombre = (users, listUser) => {
    buscador.addEventListener('input', (e)=> {
        const find = e.target.value.toLowerCase()
        
        const filteredUsers = users.filter(user => {
            const nombre = user.name.first.toLowerCase();
            const apellido = user.name.last.toLowerCase();
            return nombre.includes(find) || apellido.includes(find);
        });
        
        listUser.innerHTML = '';

        filteredUsers.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('listUsers_card');
            userElement.innerHTML = `
                <img class="cardUser_img" src="${user.picture.thumbnail}"/>
                <h3 class="cardUser_nombre">${user.name.first} ${user.name.last}</h3>`;
            userElement.addEventListener('click', () => updateCardUser(user));
            listUser.appendChild(userElement);
            });
        });
};

// Función para actualizar CardUser con los datos del usuario seleccionado de la lista
const updateCardUser = (user) => {
    const genero = user.gender === 'male' ? 'Masculino' : 'Femenino';
    cardUser.innerHTML = `
        <div class="CardUser_card">
            <div class="card_img">
                <img class="card_img_foto" src="${user.picture.large}"/>
            </div>
            <div class="card_informacion">
                <div class="card_iconos">
                    <i class="fa-solid fa-square-phone card_iconos_icono"></i>
                    <i class="fa-solid fa-square-envelope card_iconos_icono"></i>
                    <i class="fa-solid fa-map-location-dot card_iconos_icono"></i>
                    <i class="fa-solid fa-calendar-day card_iconos_icono"></i>
                </div>
                <div class="card_datos">
                    <p class="card_datos_p">${user.name.title} ${user.name.first} ${user.name.last}</p>
                    <p class="card_datos_p">Edad: ${user.dob.age}</p>
                    <p class="card_datos_p">Genero: ${genero} </p>
                </div>
                <button type="button" class="open-modal" data-open="modal">
                    <i class="fa-solid fa-user-plus card_iconos_icono card_iconos_icono--modal"></i>
                </button>
            </div>            
        </div>`;
    cardUser.addEventListener('click',(e) => handleCardUserClick(e, user));
};

const removeClass = (array, className) => {
    array.forEach((elemento) => {
        elemento.classList.remove(className)
    })
};

// Función manejadora de clic en CardUser
const handleCardUserClick = (e, user) => {
    const cardDatos = document.querySelector('.card_datos');
    const iconos = document.querySelectorAll('.card_iconos_icono');
    
    if (e.target.classList.contains('card_iconos_icono')) {
        if (e.target.classList.contains('fa-square-phone')) {
            removeClass(iconos,'selected');
            e.target.classList.add('selected');
            cardDatos.innerHTML = `<p class="card_datos_p">Teléfono: ${user.phone}</p>`;
        } else if (e.target.classList.contains('fa-square-envelope')) {
            removeClass(iconos,'selected');
            e.target.classList.add('selected');
            cardDatos.innerHTML = `<p class="card_datos_p">Email: ${user.email}</p>`;
        } else if (e.target.classList.contains('fa-map-location-dot')) {
            removeClass(iconos,'selected');
            e.target.classList.add('selected');
            const location = user.location;
            cardDatos.innerHTML =`
                <p class="card_datos_p">Ciudad: ${location.city}</p>
                <p class="card_datos_p">Estado: ${location.state}</p>
                <p class="card_datos_p">País: ${location.country}</p>`;
        } else if (e.target.classList.contains('fa-calendar-day')) {
            removeClass(iconos,'selected');
            e.target.classList.add('selected');
            const dob = user.dob.date;
            const formattedDate = new Date(dob).toLocaleDateString();
            cardDatos.innerHTML = `<p class="card_datos_p">Fecha de Nacimiento: ${formattedDate}</p>`;
        } else if (e.target.classList.contains('fa-user-plus')) {
            const modalNombre = document.querySelector('.modalNombre');
            const imgUser = document.getElementById('imgUser_modal');
            const username = document.getElementById('username_modal');
            const phone = document.getElementById('phone_modal');
            const cell = document.getElementById('cell_modal');
            const email = document.getElementById('email_modal');
            const postcode = document.getElementById('postcode_modal');
            const street = document.getElementById('street_modal');
            const city = document.getElementById('city_modal');
            const state = document.getElementById('state_modal');
            const country = document.getElementById('country_modal');
            const nacionalidad = document.getElementById('nacionalidad_modal');
            const age = document.getElementById('age_modal');
            const gender = document.getElementById('gender_modal');
            const fechaNacimiento = document.getElementById('fechaNacimiento_modal');
            const registro = document.getElementById('fechaRegistro_modal');
            const antiguedad = document.getElementById('antiguedadMiembro_modal');
            const frase = document.getElementById('frase_modal');
            const AutorFrase = document.getElementById('autorFrase_modal');

            modalNombre.textContent  = `${user.name.title} ${user.name.first} ${user.name.last}` 
            imgUser.src = `${user.picture.medium}`

            frase.textContent = `frase desde api`
            AutorFrase.textContent = `autor frase desde api`
            username.value = `${user.login.username}`
            phone.value = `${user.phone}`
            cell.value = `${user.cell}`
            email.value = `${user.email}`
            street.value = `${user.location.street.name} ${user.location.street.number}`
            postcode.value = `${user.location.postcode}`
            city.value = `${user.location.city}`
            state.value = `${user.location.state}`
            country.value = `${user.location.country}`
            nacionalidad.value = `${user.nat}`
            age.value = `${user.dob.age}`

            const genero = user.gender === 'male' ? 'Masculino' : 'Femenino'
            gender.value = `${genero}`

            const fechaNac =  new Date(user.dob.date).toLocaleDateString()
            fechaNacimiento.value = `${fechaNac}`

            const fechaReg =  new Date(user.registered.date).toLocaleDateString()
            registro.value = `${fechaReg}`

            antiguedad.value = `${user.registered.age}`

            // Inicializa el mapa
            const map = L.map('map').setView([0, 0], 2); // La vista inicial puede ser ajustada

            // Añade una capa de mapa (puedes usar diferentes proveedores)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            const marker = L.marker([user.location.coordinates.latitude, user.location.coordinates.longitude]).addTo(map);
            marker.bindPopup('<b>' + user.name.first + '</b>').openPopup();
            //frase.value = ``

            const modal = document.getElementById('modal');
            modal.classList.add('is-visible');
        }
    }
};

// Agregar usuarios a listUser
const listadoUsuarios = (users, listUser) => {
    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.classList.add('listUsers_card');
        userElement.innerHTML = `
            <img class="cardUser_img" src="${user.picture.thumbnail}"/>
            <h3 class="cardUser_nombre">${user.name.first} ${user.name.last}</h3>`;
        userElement.addEventListener('click', () => {
            // Remover la clase 'selected' de todos los elementos antes de agregarla al clickeado
            const allUserElements = document.querySelectorAll('.listUsers_card');
            removeClass(allUserElements,'selected');
            // Agregar la clase 'selected' al elemento clickeado
            userElement.classList.add('selected');
            updateCardUser(user);
        });
        //agregar class selected al primer elemento porque es el que se muestra por default
        if (index === 0) {
            userElement.classList.add('selected');
        }
        listUser.appendChild(userElement);
    });
    // Actualizar CardUser con los datos del primer usuario al cargar la página
    updateCardUser(users[0]);
}

// Función para cargar usuarios y actualizar CardUser
const loadAndDisplayUser = async (number) => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    let users = [];
    try {
        const users = await cargarUsuarios(number);
        loader.style.display = 'none';
        console.log('usuarios:', users);
        listadoUsuarios(users, listUser);
        buscadorPorNombre(users, listUser);

    } catch (error) {
        // En caso de error, asegúrate de ocultar el loader
        loader.style.display = 'none';
        console.log(error.message);
    }
}

// Llamar a la función para cargar y mostrar usuarios
loadAndDisplayUser(10);

// Función para cerrar el modal
const closeModal = () =>  {
    const modal = document.getElementById('modal');
    modal.classList.remove('is-visible');
}

// Función manejadora para eventos en el modal
const handleModalEvents = (e) => {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-modal');

    if (e.target === closeButton || e.target === modal) {
        closeModal();
    }

    if (e.key === 'Escape') {
        closeModal();
    }
}

// Agregar evento manejador para eventos en el modal
document.addEventListener('click', handleModalEvents);
modal.addEventListener('click', handleModalEvents);
closeButton.addEventListener('click', handleModalEvents);
