
// Función para cargar la configuración
const loadConfig = async () => {
    try {
        const response = await fetch('../config.json');

        if (response.ok) {
        const config = await response.json();
        const api_key = config.API_KEY_THESAIDSO;
        return api_key; // Devuelve el valor de la api_key
        //console.log('api_key: ',api_key);
        } else {
        console.error('Error al cargar la configuración:', response.statusText);
        }
        } catch (error) {
        console.error('Error al cargar la configuración:', error.message);
        }
    };


const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
const requestApi2 = async (retryCount = 0) => {
    try {
        //guardo el valor de la api_key en una variable para reutilizarla
        const api_key = await loadConfig();
        const servidorProxy = 'http://127.0.0.1:8080/';
        
        if (!api_key) {
            console.error('API key no disponible');
            return;
        }

        //Configuración de la solicitud con el encabezado CORS
        const requestOptions = {
            method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'origin': 'x-requested-with'
            },
        };

        const response = await fetch(`${servidorProxy}http://quotes.rest/quote/random.json?api_key=${api_key}`, requestOptions);

        console.log('apiFrases:', response);

        if (response.status === 200) {
            const data = await response.json();
            const user = data.contents;
            return user;
        } else if (response.status === 429 && retryCount < 3) {
            console.error('Demasiadas solicitudes. Esperando antes de intentar nuevamente.');
            await wait(3600000); // Espera 1 hora antes de intentar nuevamente (3600000 milisegundos)
            await requestApi2(retryCount + 1); // Vuelve a intentar la solicitud con un contador de reintentos
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error(error.message);
    }
};

// Llama a la función para realizar la solicitud
requestApi2();


// const api_key = await loadConfig();
// const servidorProxy = 'http://127.0.0.1:8080/'

// function get_quote_of_the_day() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
// 	        if (this.readyState == 4 && this.status == 200) {
// 	     // Access the result here
// 	        console.log(this.responseText);
// 	    }
//     };
//     xhttp.open("GET", `${servidorProxy}https://quotes.rest/qod?category=inspire`, true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.setRequestHeader("X-Theysaidso-Api-Secret", `${api_key}`);
//     xhttp.send();
// }

// get_quote_of_the_day()

