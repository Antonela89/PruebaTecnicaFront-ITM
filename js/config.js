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

export default loadConfig
