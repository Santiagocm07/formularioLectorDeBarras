//Reloj
let mostrarFecha = document.getElementById('fecha');
let mostrarReloj = document.getElementById('reloj');

let fecha = new Date();

let diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let mesAnio = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

mostrarFecha.innerHTML = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mesAnio[fecha.getMonth()]} de ${fecha.getFullYear()}`;

setInterval(() => {
    let hora = new Date();
    mostrarReloj.innerHTML = hora.toLocaleTimeString();
}, 1000);

// Función para capturar la fecha
function capturarFecha(event) {
    // Evitar que el formulario se envíe de inmediato
    event.preventDefault();

    // Obtener la fecha actual
    let ahora = new Date();
    
    // Cambiar el formato de la fecha a YYYY-MM-DD
    let anio = ahora.getFullYear();
    let mes = String(ahora.getMonth() + 1).padStart(2, '0'); 
    let dia = String(ahora.getDate()).padStart(2, '0'); 
    // Formato correcto: YYYY-MM-DD
    let fechaActual = `${dia}-${mes}-${anio}`;

    // Obtener el input oculto
    let fechaHoraInput = document.getElementById('fechaHora');

    // Asegúrate de que el input oculto existe
    if (fechaHoraInput) {
        // Establecer el valor en el input oculto
        fechaHoraInput.value = fechaActual;

        // Ahora puedes enviar el formulario
//         event.target.submit(); // Envía el formulario
//     } else {
//         console.error('El input oculto no se encontró');
//     }
// }


        // Ahora puedes enviar el formulario usando fetch
//         const form = event.target; // Captura el formulario

//         fetch('/validarDatos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded' // Cambia el tipo de contenido
//             },
//             body: new URLSearchParams(new FormData(form)).toString() // Convierte los datos del formulario a URLSearchParams
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la respuesta del servidor');
//             }
//             return response.json(); // Leer la respuesta como JSON
//         })
//         .then(data => {
//             // Mostrar el mensaje utilizando alert
//             alert(data.mensajeForm); // Mensaje del servidor
//             form.reset(); // Resetea el formulario
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error al enviar los datos. Inténtalo de nuevo.'); // Mensaje de error
//         });
//         } else {
//             console.error('El input oculto no se encontró');
//         }
// }
            const form = event.target; // Captura el formulario

            fetch('/validarDatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Cambia el tipo de contenido
                },
                body: new URLSearchParams(new FormData(form)).toString() // Convierte los datos del formulario a URLSearchParams
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json(); // Leer la respuesta como JSON
            })
            .then(data => {
                // Mostrar el mensaje utilizando SweetAlert
                Swal.fire({
                    title: data.mensajeForm,
                    html: `<p>${data.otroMensaje}</p>
                            <p style="margin-bottom: 10px;"></p> <!-- Espacio adicional -->
                            <p><b>${data.mensajeFinal}</b></p>`,
                    // text: `${data.otroMensaje}\n\n${data.mensajeFinal}`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                form.reset(); // Resetea el formulario
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error al enviar los datos. Inténtalo de nuevo.', // Mensaje de error
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
            } else {
            console.error('El input oculto no se encontró');
            }
}

//Modal para acceder a la pagina privada
let modal = document.getElementById("modal");
let btn = document.getElementById("privado");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

// Cierra la modal al hacer clic en "X"
span.onclick = function() {
    modal.style.display = "none";
}

// Cierra la modal si el usuario hace clic fuera de ella
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

//Acceso unico a la pagina
// document.getElementById('loginForm').addEventListener('submit', function(event){
//     event.preventDefault();

//     const login = document.getElementById('usuario').value;
//     const correctLogin = 'Leo jefe'

//     const password = document.getElementById('contraseña').value;
//     const correctPassword = '2024';

//     if (login==correctLogin && password ===correctPassword) {
//         localStorage.setItem('authenticated', 'true');
//         window.location.href = '/tabla';
//     } else {
//         document.getElementById('message').innerText = 'Contraseña incorrecta, intentalo de nuevo'
//     }
//     this.reset();
//     return false;
// });

document.querySelector('.loginUser').addEventListener('click', function() {
    const login = document.getElementById('usuario').value;
    const correctLogin = 'Leo jefe';

    const password = document.getElementById('contraseña').value;
    const correctPassword = '2024';

    if (login === correctLogin && password === correctPassword) {
        localStorage.setItem('authenticated', 'true');
        window.location.href = '/tabla';
    } else {
        const messageElement = document.getElementById('message');
        messageElement.innerText = 'Contraseña incorrecta, intentalo de nuevo';
        
        setTimeout(() => {
            messageElement.innerText = ''; 
        }, 3000);
    }
    document.getElementById('loginForm').reset();
    
});



//Funcion para escanear cedula :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//Cedula se le mejoran los espacios en cada input
// document.addEventListener('DOMContentLoaded', function() {
//     const upCedula = document.getElementById('upCedula');
//     const carMatricula = document.getElementById('carMatricula');

//     // Inputs para datos del usuario
//     const numeroCed = document.getElementById('numeroCed');
//     const nombreInput = document.getElementById('nombreUsu');
//     const generoInput = document.getElementById('generoUsu');
//     const fechaNacimientoInput = document.getElementById('fechaUsu');
//     const tipoSangreInput = document.getElementById('tipoUsu');

//     // Inputs para datos del vehículo
//     const propietarioInput = document.getElementById('nombrePro');
//     const direccionInput = document.getElementById('direccionPro');
//     const codigoDepartamentoInput = document.getElementById('codigoPro');

//     let cedulaBuffer = '';
//     let matriculaBuffer = '';
//     let timeout;

//     // Función para limpiar los datos del formulario
//     function limpiarDatosUsuario() {
//         numeroCed.value = '';
//         nombreInput.value = '';
//         generoInput.value = '';
//         fechaNacimientoInput.value = '';
//         tipoSangreInput.value = '';
//     }

//     function limpiarDatosVehiculo() {
//         propietarioInput.value = '';
//         direccionInput.value = '';
//         codigoDepartamentoInput.value = '';
//     }

//     // Función para procesar datos de cédula
//     function procesarCedula(datos) {
//         const formattedData = datos.replace(/\s+/g, '').trim();
        
//         console.log('Datos escaneados:', formattedData);

//         // Expresión regular para separar los números y las letras
//         const regex = /(\d{10})([A-Z]+)([MFO])(\d{8})([A-Z])/;

//         const match = formattedData.match(regex);

//         if (match) {
//             // Extraer datos
//             const numero = match[1]; // Número de cédula
//             const nombreCompleto = match[2]; // Nombre completo sin espacios
//             const genero = match[3].toUpperCase(); // Género
//             const fechaNacimiento = match[4]; // Fecha de nacimiento
//             const tipoSangre = match[5].toUpperCase(); // Tipo de sangre

//             // Formatear el nombre para agregar espacios entre los apellidos
//             const nombreFormateado = nombreCompleto.replace(/([A-Z])/g, ' $1').trim(); // Agregar espacio antes de cada mayúscula

//             // Asignar valores a los inputs
//             numeroCed.value = numero;
//             nombreInput.value = nombreFormateado.padEnd(30, ' '); // Rellenar el nombre con espacios
//             generoInput.value = genero;
//             fechaNacimientoInput.value = fechaNacimiento;
//             tipoSangreInput.value = tipoSangre;

//             console.log('Datos procesados correctamente:', {
//                 numero,
//                 nombreFormateado,
//                 genero,
//                 fechaNacimiento,
//                 tipoSangre
//             });
//         } else {
//             console.error('Formato de cédula no reconocido.');
//         }
//     }

//     // Manejar el escaneo de cédula
//     upCedula.addEventListener('input', function() {
//         cedulaBuffer = upCedula.value;

//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             console.log('Datos escaneados (cedula buffer):', JSON.stringify(cedulaBuffer));

//             // Limpiar datos anteriores
//             limpiarDatosUsuario();

//             // Procesar cédula
//             procesarCedula(cedulaBuffer);
//         }, 300);
//     });

//     // Manejar el escaneo de matrícula
//     carMatricula.addEventListener('input', function() {
//         matriculaBuffer = carMatricula.value;

//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             console.log('Datos escaneados (matricula buffer):', JSON.stringify(matriculaBuffer));

//             limpiarDatosVehiculo();

//             const datosVehiculo = matriculaBuffer.trim().split(/\s{2,}/);

//             if (datosVehiculo.length >= 4) {
//                 const nombrePropietario = datosVehiculo.slice(0, 3).join(' ').trim();
//                 const direccion = datosVehiculo.slice(3, -1).join(' ').trim();
//                 const codigoDepartamento = datosVehiculo[datosVehiculo.length - 1].trim();

//                 propietarioInput.value = nombrePropietario;
//                 direccionInput.value = direccion;
//                 codigoDepartamentoInput.value = codigoDepartamento;
//             } else {
//                 console.error('Datos insuficientes para la matrícula.');
//             }
//         }, 300);
//     });

//     // Enviar el formulario
//     document.getElementById('formRegistro').addEventListener('submit', function(event) {
//         event.preventDefault();
//         console.log('Formulario enviado con datos:');
//         console.log('Cédula:', upCedula.value);
//         console.log('Matrícula:', carMatricula.value);
//     });

//     // Evitar el llenado automático de otros campos
//     upCedula.addEventListener('keydown', function(event) {
//         if (event.key === 'Tab' || event.key === 'Enter') {
//             event.preventDefault();
//         }
//     });

//     carMatricula.addEventListener('keydown', function(event) {
//         if (event.key === 'Tab' || event.key === 'Enter') {
//             event.preventDefault();
//         }
//     });
// });

//Funcion para escanear documentos actualizada con los requerimientos que se pedian
document.addEventListener('DOMContentLoaded', function() {
    const upCedula = document.getElementById('upCedula');
    const carMatricula = document.getElementById('carMatricula');

    // Inputs para datos del usuario
    const numeroCed = document.getElementById('numeroCed');
    const nombreInput = document.getElementById('nombreUsu');
    const generoInput = document.getElementById('generoUsu');
    const fechaNacimientoInput = document.getElementById('fechaUsu');
    const tipoSangreInput = document.getElementById('tipoUsu');

    // Inputs para datos del vehículo
    const propietarioInput = document.getElementById('nombrePro');
    const direccionInput = document.getElementById('direccionPro');
    const codigoDepartamentoInput = document.getElementById('codigoPro');

    let cedulaBuffer = '';
    let matriculaBuffer = '';
    let timeout;

    // Función para limpiar los datos del formulario
    function limpiarDatosUsuario() {
        numeroCed.value = '';
        nombreInput.value = '';
        generoInput.value = '';
        fechaNacimientoInput.value = '';
        tipoSangreInput.value = '';
    }

    function limpiarDatosVehiculo() {
        propietarioInput.value = '';
        direccionInput.value = '';
        codigoDepartamentoInput.value = '';
    }

    // Función para bloquear inputs de usuario
    function bloquearInputsUsuario() {
        numeroCed.setAttribute('readonly', true);
        nombreInput.setAttribute('readonly', true);
        generoInput.setAttribute('readonly', true);
        fechaNacimientoInput.setAttribute('readonly', true);
        tipoSangreInput.setAttribute('readonly', true);
    }

    // Función para desbloquear inputs de usuario
    function desbloquearInputsUsuario() {
        numeroCed.removeAttribute('readonly');
        nombreInput.removeAttribute('readonly');
        generoInput.removeAttribute('readonly');
        fechaNacimientoInput.removeAttribute('readonly');
        tipoSangreInput.removeAttribute('readonly');
    }

    // Función para bloquear inputs de vehículo
    function bloquearInputsVehiculo() {
        propietarioInput.setAttribute('readonly', true);
        direccionInput.setAttribute('readonly', true);
        codigoDepartamentoInput.setAttribute('readonly', true);
    }

    // Función para desbloquear inputs de vehículo
    function desbloquearInputsVehiculo() {
        propietarioInput.removeAttribute('readonly');
        direccionInput.removeAttribute('readonly');
        codigoDepartamentoInput.removeAttribute('readonly');
    }

    // Función para procesar datos de cédula
    function procesarCedula(datos) {
        const formattedData = datos.replace(/\s+/g, '').trim();
        
        console.log('Datos escaneados:', formattedData);

        // Expresión regular para separar los números y las letras
        const regex = /(\d{10})([A-Z]+)([MFO])(\d{8})([A-Z])/;

        const match = formattedData.match(regex);

        if (match) {
            // Extraer datos
            const numero = match[1]; // Número de cédula
            const nombreCompleto = match[2]; // Nombre completo sin espacios
            const genero = match[3].toUpperCase(); // Género
            const fechaNacimiento = match[4]; // Fecha de nacimiento
            const tipoSangre = match[5].toUpperCase(); // Tipo de sangre

            // Formatear el nombre para agregar espacios entre los apellidos
            const nombreFormateado = nombreCompleto.replace(/([A-Z])/g, ' $1').trim(); // Agregar espacio antes de cada mayúscula

            // Asignar valores a los inputs
            numeroCed.value = numero;
            nombreInput.value = nombreFormateado.padEnd(30, ' '); // Rellenar el nombre con espacios
            generoInput.value = genero;
            fechaNacimientoInput.value = fechaNacimiento;
            tipoSangreInput.value = tipoSangre;

            // Desbloquear inputs una vez procesados los datos
            desbloquearInputsUsuario();

            console.log('Datos procesados correctamente:', {
                numero,
                nombreFormateado,
                genero,
                fechaNacimiento,
                tipoSangre
            });
        } else {
            console.error('Formato de cédula no reconocido.');
            bloquearInputsUsuario(); // Bloquear si no se reconoce el formato
        }
    }

    // Función para procesar datos de matrícula
    function procesarMatricula(datos) {
        const formattedData = datos.trim();
        console.log('Datos escaneados:', formattedData);

        // Simulación de extracción de datos (puedes modificar según tu lógica)
        const datosVehiculo = formattedData.split(/\s{2,}/); // Asumiendo que los datos vienen separados por dos espacios

        if (datosVehiculo.length >= 4) {
            const nombrePropietario = datosVehiculo.slice(0, 3).join(' ').trim();
            const direccion = datosVehiculo.slice(3, -1).join(' ').trim();
            const codigoDepartamento = datosVehiculo[datosVehiculo.length - 1].trim();

            propietarioInput.value = nombrePropietario;
            direccionInput.value = direccion;
            codigoDepartamentoInput.value = codigoDepartamento;

            // Desbloquear inputs de vehículo
            desbloquearInputsVehiculo();
        } else {
            console.error('Datos insuficientes para la matrícula.');
            bloquearInputsVehiculo(); // Bloquear si no se procesan correctamente
        }
    }

    // Manejar el escaneo de cédula
    upCedula.addEventListener('input', function() {
        cedulaBuffer = upCedula.value;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log('Datos escaneados (cedula buffer):', JSON.stringify(cedulaBuffer));

            limpiarDatosUsuario();

            bloquearInputsUsuario();

            procesarCedula(cedulaBuffer);
        }, 300);
    });

    // Manejar el escaneo de matrícula
    carMatricula.addEventListener('input', function() {
        matriculaBuffer = carMatricula.value;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log('Datos escaneados (matricula buffer):', JSON.stringify(matriculaBuffer));

            limpiarDatosVehiculo();

            // Bloquear inputs de vehículo al inicio
            bloquearInputsVehiculo();

            // Procesar matrícula
            procesarMatricula(matriculaBuffer);
        }, 300);
    });

    // Enviar el formulario
    // document.getElementById('formRegistro').addEventListener('submit', function(event) {
    //     event.preventDefault();

    //     if (this.dataset.submitted) return;
    //     this.dataset.submitted = true;

    //     console.log('Formulario enviado con datos:');
    //     console.log('Cédula:', upCedula.value);
    //     console.log('Matrícula:', carMatricula.value);
    // });

    // Evitar el llenado automático de otros campos
    upCedula.addEventListener('keydown', function(event) {
        if (event.key === 'Tab' || event.key === 'Enter') {
            event.preventDefault();
        }
    });

    carMatricula.addEventListener('keydown', function(event) {
        if (event.key === 'Tab' || event.key === 'Enter') {
            event.preventDefault();
        }
    });

    //Funcion para poner todos los input en mayuscula
    // const inputs = document.querySelectorAll('form input');
    // inputs.forEach(input => {
    //     if (!input.closest('.modal')) {
    //         input.addEventListener('input', function() {
    //             this.value = this.value.toUpperCase();
    //         });
    //     }
    // });
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(input => {
        if (!input.closest('.modal')) {
            input.addEventListener('input', function() {
                // Verifica si el input es uno de los que deben permanecer en minúsculas
                const inputName = input.name; // Suponiendo que tienes un atributo 'name' en tus inputs

                if (inputName !== 'correoUsr' && inputName !== 'color' && inputName !== 'ocupacion') {
                    this.value = this.value.toUpperCase();
                }
            });
        }
    });

});






