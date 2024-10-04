//Reloj
let mostrarFecha = document.getElementById('fecha');
let mostrarReloj = document.getElementById('reloj');

let fecha = new Date();

let diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

let mesAnio = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',];

mostrarFecha.innerHTML = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mesAnio[fecha.getMonth()]} de ${fecha.getFullYear()}`;

setInterval(()=> {
    let hora = new Date();
    mostrarReloj.innerHTML = hora.toLocaleTimeString();
}, 1000);


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
document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();

    const login = document.getElementById('usuario').value;
    const correctLogin = 'Leo jefe'

    const password = document.getElementById('contraseña').value;
    const correctPassword = '2024';

    if (login==correctLogin && password ===correctPassword) {
        localStorage.setItem('authenticated', 'true');
        window.location.href = 'tablaDatos.html';
    } else {
        document.getElementById('message').innerText = 'Contraseña incorrecta, intentalo de nuevo'
    }
    this.reset();
    return false;
});


//Funcion para escanear cedula :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//Cedula y matricula actualizada con el formulario

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
//         // Expresión regular que permite espacios opcionales
//         const regex = /(\d{10})\s*([A-Z\s]+)\s*([MFO])\s*(\d{8})\s*([A-Z])|(\d{10})([A-Z]+)([MFO])(\d{8})([A-Z])/;
//         const match = datos.match(regex);
        
//         if (match) {
//             // Si se encuentra en el formato con espacios
//             if (match[1]) {
//                 numeroCed.value = match[1]; // Número de cédula
//                 nombreInput.value = match[2].trim(); // Nombre
//                 generoInput.value = match[3].toUpperCase(); // Género
//                 fechaNacimientoInput.value = match[4]; // Fecha de nacimiento
//                 tipoSangreInput.value = match[5].toUpperCase(); // Tipo de sangre
//             } else {
//                 // Si se encuentra en el formato sin espacios
//                 numeroCed.value = match[6]; // Número de cédula
//                 nombreInput.value = match[7].trim(); // Nombre
//                 generoInput.value = match[8].toUpperCase(); // Género
//                 fechaNacimientoInput.value = match[9]; // Fecha de nacimiento
//                 tipoSangreInput.value = match[10].toUpperCase(); // Tipo de sangre
//             }
//         } else {
//             console.error('Formato de cédula no reconocido.');
//         }
//     }

//     // Manejar el escaneo de cédula
//     upCedula.addEventListener('input', function() {
//         const currentInput = upCedula.value;

//         // Detecta cambios en el input
//         if (currentInput.length < cedulaBuffer.length) {
//             cedulaBuffer = '';
//         }

//         if (currentInput.length > cedulaBuffer.length) {
//             cedulaBuffer += currentInput.charAt(currentInput.length - 1);
//         }

//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             console.log('Datos escaneados (cedula buffer):', JSON.stringify(cedulaBuffer));

//             if (cedulaBuffer.length >= 50) {
//                 // Limpiar datos anteriores
//                 limpiarDatosUsuario();
//                 procesarCedula(cedulaBuffer);
//             } else {
//                 console.error('Datos insuficientes para la cédula.');
//             }
//         }, 300);
//     });

//     // Manejar el escaneo de matrícula
//     carMatricula.addEventListener('input', function() {
//         const currentInput = carMatricula.value;

//         // Detecta cambios en el input
//         if (currentInput.length < matriculaBuffer.length) {
//             matriculaBuffer = '';
//         }

//         if (currentInput.length > matriculaBuffer.length) {
//             matriculaBuffer += currentInput.charAt(currentInput.length - 1);
//         }

//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             console.log('Datos escaneados (matricula buffer):', JSON.stringify(matriculaBuffer));

//             // Limpiar datos anteriores
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

            // Limpiar datos anteriores
            limpiarDatosUsuario();

            // Bloquear inputs de usuario al inicio
            bloquearInputsUsuario();

            // Procesar cédula
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
    document.getElementById('formRegistro').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Formulario enviado con datos:');
        console.log('Cédula:', upCedula.value);
        console.log('Matrícula:', carMatricula.value);
    });

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
});


//Conexion a la base de datos ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Enviar el formulario
// document.getElementById('formRegistro').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Recoger los datos de los inputs
//     const datosFormulario = {
//         cedula: upCedula.value,
//         numero: numeroCed.value,
//         nombre: nombreInput.value,
//         genero: generoInput.value,
//         fechaNacimiento: fechaNacimientoInput.value,
//         tipoSangre: tipoSangreInput.value,
//         matricula: carMatricula.value,
//         propietario: propietarioInput.value,
//         direccion: direccionInput.value,
//         codigoDepartamento: codigoDepartamentoInput.value
//     };

//     // Enviar los datos al servidor
//     fetch('/tu-endpoint-aqui', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(datosFormulario)
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // Convertir la respuesta a JSON
//         }
//         throw new Error('Error en la red');
//     })
//     .then(data => {
//         console.log('Datos guardados correctamente:', data);
//         // Aquí puedes manejar la respuesta del servidor
//     })
//     .catch(error => {
//         console.error('Error al guardar los datos:', error);
//     });
// });






















