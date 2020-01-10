import { API } from './api.js'
import * as UI from './interfaz.js'

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //obtener datos
    const artista = document.querySelector("#artista").value;
    const cancion = document.querySelector("#cancion").value

    if (artista === '' || cancion === '') {
        // Mensaje de alerta
        UI.divMensaje.innerHTML = 'Todos los cambios son obligatorios';
        UI.divMensaje.classList.add('error');
        setTimeout(() => {
            UI.divMensaje.innerHTML = '';
            UI.divMensaje.remove('error');
        }, 3000)
    } else {
        // Hacer consulta
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if (data.respuesta.lyrics) {
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra
                } else {
                    // Mensaje de alerta
                    UI.divMensaje.innerHTML = 'La canción no exite, prueba con otra busqueda';
                    UI.divMensaje.classList.add('error');
                    setTimeout(() => {
                        UI.divMensaje.innerHTML = '';
                        UI.divMensaje.remove('error');
                        UI.formularioBuscar.reset();
                    }, 3000)
                }
            })
    }
})