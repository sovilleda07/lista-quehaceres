// Obtener todos los elementos necesarios
const input = document.getElementById('inputQuehacer');
const btnAgregar = document.getElementById('btnAgregarQuehacer');
const lista = document.querySelector('.listaQuehaceres');
const divQuehaceres = document.getElementById('quehaceres');
const btnEliminarCompletados = document.getElementById('btnEliminarCompletados');
const btnEliminarTodos = document.getElementById('btnEliminarTodos');

// Manejo para editar y agregar
let editar = false;
let idEditar;
const btnCancelar = '<button type="button" class="btn btn-danger" id="btnCancelar" onClick="cancelarEdicion()"><i class="fas fa-times"></i></button>';

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
        // Evaluar la acción a realizar
        if (editar) {
            // Llamado a función para agregar
            actualizarQuehacer(valorInput);
        } else {
            // Llamado a función para agregar
            agregarQuehacer(valorInput);
        }
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
            // Evaluar la acción a realizar
            if (editar) {
                // Llamado a función para agregar
                actualizarQuehacer(valorInput);
            } else {
                // Llamado a función para agregar
                agregarQuehacer(valorInput);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Ingrese el nombre de un quehacer.',
            });
        }
    }
});

// Evento click en botón para eliminar los quehaceres completados
btnEliminarCompletados.addEventListener('click', () => {
    // Realizar consulta
    Swal.fire({
        icon: 'question',
        title: '¿Está seguro de eliminar los quehaceres completados?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${url}/api/eliminarQuehaceresCompletados`)
                .then(function (response) {
                    // Validar si se eliminó
                    if (response.status == 200) {
                        // Si se eliminan, se remueven de la lista
                        let completados =
                            document.querySelectorAll('.completado');
                        completados.forEach((completado) => {
                            completado.remove();
                        });

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
        }
    });
});

// Evento click en botón para eliminar todos los quehaceres
btnEliminarTodos.addEventListener('click', () => {
    // Realizar consulta
    Swal.fire({
        icon: 'question',
        title: '¿Está seguro de eliminar todos los quehaceres?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${url}/api/eliminarQuehaceresTodos`)
                .then(function (response) {
                    // Validar si se eliminó
                    if (response.status == 200) {
                        // Si se eliminan, se limpia la lista y realiza conteo
                        divQuehaceres.innerHTML = '';
                        contarPendientes();
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
        }
    });
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
            contarPendientes();
            Swal.fire({
                icon: 'warning',
                title:
                    `${error.response.data.mensaje}` ||
                    `${error.response.statusText}` ||
                    error.message 
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
        let li = `<li data-id="${quehacer._id}" class="${quehacer.completado ? 'completado' : 'pendiente'} animate__animated animate__flipInX">
                    <div class="quehacer">
                        <div class="acciones">
                            <span class="editar" onClick="consultarQuehacer(this)">
                                <i class="fas fa-pen"></i>
                            </span>
                            <span class="eliminar" onClick="eliminarQuehacer(this)">
                                <i class="fas fa-trash"></i>
                            </span>
                        </div>
    
                        <label class="tarea">
                            <input type="checkbox" class="checkbox" onclick="cambiarEstado(this)" id="checkQuehacer" ${quehacer.completado ? 'checked' : ''}>
                            <span class="nombreQuehacer">${quehacer.tarea}</span>
                        </label>
                    </div>
                   </li>`;

        // Insertar el quehacer a la lista
        divQuehaceres.insertAdjacentHTML('beforeend', li);
    });

    // Eliminar animación
    setTimeout(function () {
        let allElements = Array.from(
            document.querySelectorAll('li')
        );
        for (let element of allElements) {
            element.classList.remove('animate__flipInX');
        }
    }, 500);

    contarPendientes();
}

/**
 * Función para contar los quehaceres
 */
const contarPendientes = () => {
    // Calcular quehaceres pendientes y mostrarlos
    let pendientes = document.querySelectorAll(".pendiente").length;

    // Condicional para mensaje según el número de pendientes
    let mensajePendientes = '';
    if (pendientes > 1) {
        mensajePendientes = `Tienes ${pendientes} quehaceres pendientes`;
    } else if (pendientes == 1) {
        mensajePendientes = `Tienes ${pendientes} quehacer pendiente`;
    } else {
        mensajePendientes = 'No hay quehaceres pendientes';
    }

    // Si el span existe, eliminarlo
    const spanPendientes = document.getElementById('quehaceresPendientes');
    if (spanPendientes) {
        spanPendientes.remove();
    }
    divQuehaceres.insertAdjacentHTML('afterend', `<span id="quehaceresPendientes" class="mt-2">${mensajePendientes}</span>`);
}

/**
 * Función para cambiar el estado a completado o pendiente
 * @param {elementoHTML} quehacerSeleccionado 
 */
const cambiarEstado = (quehacerSeleccionado) => {
    // Capturar el elemento li
    const li = quehacerSeleccionado.parentElement.closest('li');
    // Capturar el id del quehacer
    const id = li.dataset.id;

    // Realizar petición
    axios
        .put(`${url}/api/cambiarEstadoQuehacer/${id}`)
        .then(function (response) {
            // Validar si se actualizó
            if (response.status == 200) {
                // Validar si se hizo checked para añadir y eliminar clases del estado
                if (quehacerSeleccionado.checked) {
                    li.classList.add('completado');
                    li.classList.remove('pendiente');
                } else {
                    li.classList.remove('completado');
                    li.classList.add('pendiente');
                }
                contarPendientes();
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
 * 
 * @param {elementoHTML} quehacerSeleccionado 
 */
const eliminarQuehacer = (quehacerSeleccionado) => {
    // Capturar el elemento li
    const li = quehacerSeleccionado.parentElement.closest('li');
    // Capturar el id del quehacer
    const id = li.dataset.id;

    // Realizar consulta
    Swal.fire({
        icon: 'question',
        title: '¿Está seguro de eliminar el quehacer?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${url}/api/eliminarQuehacer/${id}`)
                .then(function (response) {
                    // Validar si se eliminó
                    if (response.status == 200) {
                        // Si se elimina, se elimina de la lista y se realiza el conteo
                        li.remove();
                        contarPendientes();

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
        }
    });
};

/**
 * Función para consultar un quehacer
 * @param {string} id 
 */
const consultarQuehacer = (quehacerSeleccionado) => {
    // Capturar el elemento li
    const li = quehacerSeleccionado.parentElement.closest('li');
    // Capturar el id del quehacer
    const id = li.dataset.id;

    // Realizar petición
    axios
        .get(`${url}/api/quehaceres/${id}`)
        .then(function (response) {
            // Si hay resultados
            if (response.status == 200) {
                // Colocar valor en input
                input.value = response.data.resultado.tarea;
                input.focus();
                // Crear botón para cancelar operación de editar
                input.insertAdjacentHTML('afterend', btnCancelar);
                // Establecer en true la acción y el id del quehacer a editar
                editar = true;
                idEditar = response.data.resultado._id;
                // Cambiar texto del botón
                btnAgregar.innerText = "Editar";
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
                icon: 'warning',
                title:
                    `${error.response.data.mensaje}` ||
                    `${error.response.statusText}` ||
                    error.message,
            });
        });
};

/**
 * Función para actualizar el nombre de un quehacer.
 * @param {string} input 
 */
const actualizarQuehacer = (inputValor) => {
    // Realizar petición
    axios
        .put(`${url}/api/editarQuehacer/${idEditar}`, {
            tarea: inputValor,
        })
        .then(function (response) {
            // Validar si se actualizó
            if (response.status == 200) {
                // Limpiar input
                input.value = '';
                // Establecer en false la acción
                editar = false;
                // Cambiar texto del botón
                btnAgregar.innerText = 'Agregar';

                // Eliminar botón de cancelar acción
                document.getElementById("btnCancelar").remove();

                // Cambiar el nombre en el span
                let spanQuehacer = document.querySelector(`[data-id="${idEditar}"] span.nombreQuehacer`)
                spanQuehacer.textContent = inputValor;

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
 * Función para cancelar la acción de editar un quehacer
 */
const cancelarEdicion = () => {
    // Eliminar botón
    document.getElementById("btnCancelar").remove();
    // Limpiar input
    input.value = '';
    // Establecer en false la acción
    editar = false;
    // Borrar id
    idEditar = '';
    // Cambiar texto del botón
    btnAgregar.innerText = 'Agregar';
}