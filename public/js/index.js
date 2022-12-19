// Obtener todos los elementos necesarios
const input = document.getElementById('inputQuehacer');
const btnAgregar = document.getElementById('btnAgregarQuehacer');
const lista = document.querySelector('.listaQuehaceres');

// URL base para realizar las peticiones
const url = `${location.origin}`;

// Cuando cargue el documento consultar los quehaceres
document.addEventListener('DOMContentLoaded', () => {
    obtenerQuehaceres();
});

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
            // Validar si se guardó
            if (response.status == 200) {
                // Limpiar input
                input.value = '';

                // Enviar respuesta a función para listar el quehacere
                listarQuehaceres([response.data.resultado]);

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

/**
 * Función para listar los quehaceres
 */
const obtenerQuehaceres = () => {
    // Realizar petición
    axios
        .get(`${url}/api/quehaceres`)
        .then(function (response) {
            // Si hay resultados
            if (response.status == 200) {
                // Enviar respuesta a función para listar los quehaceres
                listarQuehaceres(response.data.resultado)
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
                text:
                    error.message ||
                    `${error.response.data.mensaje}` ||
                    `${error.response.statusText}`,
            });
        });
};

/**
 * Función para adicionar un quehacer (li) a la lista (ul) en HTML.
 * @param {Array object} losQuehaceres 
 */
const listarQuehaceres = (losQuehaceres) => {
    // Realizar ciclo para mostrar cada quehacer
    losQuehaceres.forEach(quehacer => {
        // HTML para cada uno de los quehaceres
        let li = `<li data-id="${quehacer._id}" class="${quehacer.completado ? 'completado' : 'pendiente'}">
                    <div class="quehacer">
                        <div class="acciones">
                            ${!quehacer.completado ? '<span class="editar"><i class="fas fa-pen"></i></span>' : ''}
                            <span class="eliminar">
                                <i class="fas fa-trash"></i>
                            </span>
                        </div>
    
                        <label class="tarea">
                            <input type="checkbox" class="checkbox" ${quehacer.completado ? 'checked' : ''}>
                            <span class="nombreQuehacer">${quehacer.tarea}</span>
                        </label>
                    </div>
                   </li>`;

        // Insertar el quehacer a la lista
        lista.insertAdjacentHTML('beforeend', li);
    });

    contarPendientes();
}

/**
 * Función para contar los quehaceres
 */
const contarPendientes = () => {
    // Calcular quehaceres pendientes y mostrarlos
    let pendientes = document.querySelectorAll(".pendiente").length;
    const spanPendientes = document.getElementById('quehaceresPendientes');
    if (spanPendientes) {
        spanPendientes.remove();
    }
    lista.insertAdjacentHTML('beforeend', `<span id="quehaceresPendientes">${(pendientes > 0) ? `Tienes ${pendientes} quehaceres pendientes` : 'No hay quehaceres pendientes'}</span>`);
}