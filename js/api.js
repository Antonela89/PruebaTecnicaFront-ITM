//funcion asincrona que se encargue de hacer la peticion a la api
//empleo de bloque trychatch para manejo de errores
const requestApi = async () => {
    try {
        //conexion a la api
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

//funcion para cargar usuarios
const loadUsers = async (number) => {
    //array vacio
    let users = [];
    try {
        //bucle para cargar cada usuario obtenido en la peticion a la api al array
        for(let i = 0; i < number; i++) {
            const user = await requestApi();
            if (user) {
                users.push(user);
            }
        }
    } catch (error) {
        console.log(error.message)
    }
    //se retorna el array
    return users;
}

// Función para cargar usuarios y actualizar CardUser
const loadAndDisplayUser = async (number) => {
    let users = [];
    try {
        const users = await loadUsers(number);
        console.log('usuarios:', users);
        const listUser = document.querySelector('.listUsers');
        const CardUser = document.querySelector('.CardUser');

        //Funcion para buscador
        const FindUser = () => {
            const buscador = document.querySelector('.headerUser_input')
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
        
        FindUser();

        // Función para actualizar CardUser con los datos del usuario seleccionado de la lista
        const updateCardUser = (user) => {
            const genero = user.gender === 'male' ? 'masculino' : 'femenino';
            CardUser.innerHTML = `
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
            CardUser.addEventListener('click',(e) => handleCardUserClick(e, user));
        };

        // Función manejadora de clic en CardUser
        const handleCardUserClick = (e, user) => {
            const cardDatos = document.querySelector('.card_datos');
            if (e.target.classList.contains('card_iconos_icono')) {
                if (e.target.classList.contains('fa-square-phone')) {
                    cardDatos.innerHTML = `<p class="card_datos_p">Teléfono: ${user.phone}</p>`;
                } else if (e.target.classList.contains('fa-square-envelope')) {
                    cardDatos.innerHTML = `<p class="card_datos_p">Email: ${user.email}</p>`;
                } else if (e.target.classList.contains('fa-map-location-dot')) {
                    const location = user.location;
                    cardDatos.innerHTML =`
                        <p class="card_datos_p">Ciudad: ${location.city}</p>
                        <p class="card_datos_p">Estado: ${location.state}</p>
                        <p class="card_datos_p">País: ${location.country}</p>`;
                } else if (e.target.classList.contains('fa-calendar-day')) {
                    const dob = user.dob.date;
                    const formattedDate = new Date(dob).toLocaleDateString();
                    cardDatos.innerHTML = `<p class="card_datos_p">Fecha de Nacimiento: ${formattedDate}</p>`;
                } else if (e.target.classList.contains('fa-user-plus')) {
                    const modalNombre = document.querySelector('.modalNombre');
                    //const modalContent = document.querySelector('.modalContent');
                    const imgUser = document.getElementById('imgUser_modal');
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

                    //const genero = user.gender === 'male' ? 'masculino' : 'femenino';

                    modalNombre.textContent  = `${user.name.title} ${user.name.first} ${user.name.last}` 
                    imgUser.src = `${user.picture.medium}`
                    phone.textContent = `Teléfono: ${user.phone}`
                    cell.textContent = `Celular: ${user.cell}`
                    email.textContent = `Email: ${user.email}`
                    street.textContent = `Calle: ${user.location.street.name} ${user.location.street.number}`
                    postcode.textContent = `CP: ${user.location.postcode}`
                    city.textContent = `Ciudad: ${user.location.city}`
                    state.textContent = `Estado: ${user.location.state}`
                    country.textContent = `País: ${user.location.country}`
                    nacionalidad.textContent = `Nacionalidad: ${user.nat}`
                    age.textContent = `Edad: ${user.dob.age}`
                    gender.textContent = `Genero: ${user.gender}`
                    fechaNacimiento.textContent = `Fecha de Nacimiento: ${user.dob.date}`
                    registro.textContent = `Fecha de Registro: ${user.registered.date}`
                    antiguedad.textContent = `Antiguedad: ${user.registered.age}`
                    //frase.textContent = ``

                    const modal = document.getElementById('modal');
                    modal.classList.add('is-visible');
                }
            }
        };

        // Función para cerrar el modal
        const closeModal = () =>  {
            const modal = document.getElementById('modal');
            modal.classList.remove('is-visible');
        }


        // Función manejadora para eventos en el modal
        function handleModalEvents(e) {
            const modal = document.getElementById('modal');
            const closeButton = document.querySelector('.close-modal');
    
            if (e.target === closeButton || e.target === modal) {
                closeModal();
            }

            if (e.key === 'Escape') {
                closeModal();
            }
        }       

        // evento de clic para abrir modal
        // const openButton = document.querySelector('[data-open]');
        // openButton.addEventListener('click', openModal);

        // Agregar evento manejador para eventos en el modal
        document.addEventListener('click', handleModalEvents);

        // agregar evento manejador fuera del modal
        //document.addEventListener('keyup', handleModalEvents);


        // Agregar usuarios a listUser
        users.forEach((user, index) => {
            const userElement = document.createElement('div');
            userElement.classList.add('listUsers_card');
            userElement.innerHTML = `
                <img class="cardUser_img" src="${user.picture.thumbnail}"/>
                <h3 class="cardUser_nombre">${user.name.first} ${user.name.last}</h3>`;

            userElement.addEventListener('click', () => {
                // Remover la clase 'selected' de todos los elementos antes de agregarla al clickeado
                const allUserElements = document.querySelectorAll('.listUsers_card');
                allUserElements.forEach((element) => {
                    element.classList.remove('selected');
                });

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
    } catch (error) {
        console.log(error.message);
    }
}

// Llamar a la función para cargar y mostrar usuarios
loadAndDisplayUser(10);

//otra forma de formatear la fecha
//     const fechaNacimiento = users[0].dob.date;

//     // Crear un objeto Date con la fecha proporcionada
//     const fecha = new Date(fechaNacimiento);

//     // Obtener el día, mes y año
//     const dia = fecha.getDate(); // Retorna el día del mes (1-31)
//     const mes = fecha.getMonth() + 1; // Retorna el mes (0-11), + 1 para obtener el mes real (1-12)
//     const año = fecha.getFullYear(); // Retorna el año con cuatro dígitos

//     // Formatear la fecha como una cadena "dd/mm/yyyy"
//     const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;
//     //console.log(fechaFormateada);
