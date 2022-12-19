// Obtener todos los elementos necesarios
const input = document.getElementById('inputQuehacer');
const btnAgregar = document.getElementById('btnAgregarQuehacer');
const lista = document.querySelector('.listaQuehaceres');

// URL base para realizar las peticiones
const url = `${location.origin}`;

// Evento en botón para agregar
btnAgregar.addEventListener('click', (e) => {
    // Obtener el valor del input, removiendo los espacios en blanco
    const valorInput = input.value.trim();

    // Evaluar si se ingresó el nombre
    if (valorInput.length > 0) {
        // Llamado a función para agregar
        agregarQuehacer(valorInput);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Ingrese el nombre de un quehacer.',
        });
    }
});

// Evento en input para agregar por medio de enter
input.addEventListener('keyup', (e) => {
    // Obtener el valor del input, removiendo los espacios en blanco
    const valorInput = input.value.trim();

    // Evaluar si se presionó enter
    if (e.key === 'Enter') {
        // Evaluar si se ingresó el nombre
        if (valorInput.length > 0) {
            // Llamado a función para agregar
            agregarQuehacer(valorInput);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Ingrese el nombre de un quehacer.',
            });
        }
    }
});

/**
 * Función para guardar un nuevo quehacer
 * @param {string} nombreQuehacer
 */
const agregarQuehacer = (nombreQuehacer) => {
    // Realizar petición
    axios
        .post(`${url}/api/agregarQuehacer`, {
            tarea: nombreQuehacer,
        })
        .then(function (response) {
            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: `${response.data.mensaje}`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${response.data.mensaje}`,
                });
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${error.response.data.mensaje}`,
            });
        });
};
