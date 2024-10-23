document.getElementById('consultarButton').addEventListener('click', async () => {
    const nit = document.getElementById('numeroNit').value; // Obtén el NIT ingresado

    if (!nit) {
        alert('Por favor, ingrese un NIT válido.');
        return;
    }

    try {
        const response = await fetch('/consultar-rut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nit }), // Envía el NIT en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error('Error al consultar el RUT');
        }

        const data = await response.json();

        // Asigna los datos recibidos a los inputs correspondientes
        document.getElementById('nombreEmpresa').value = data.razonSocial;
        // document.getElementById('fechaActual').value = data.fechaActual;
        document.getElementById('estadoEmpresa').value = data.estado;

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al realizar la consulta.');
    }
});

//Función para poner la fecha 
document.getElementById('consultarButton').addEventListener('click', function() {
    realizarConsulta();
});

function realizarConsulta() {
    // Simular la consulta a la página del RUT
    setTimeout(() => {
        // Aquí iría tu lógica para hacer la consulta real
        console.log("Consulta realizada");

        // Obtener la fecha actual
        const fecha = new Date();
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones); // Formato DD/MM/YYYY

        // Asegurarse de que el valor no se borre
        const fechaInput = document.getElementById('fechaActual');
        if (!fechaInput.value) {
            fechaInput.value = fechaFormateada; // Solo asigna si está vacío
        } else {
            console.log("El campo ya tiene un valor:", fechaInput.value);
        }
    }, 2000); // Simula un retraso de 2 segundos para la consulta
}

//Función para escanear la matricula 

let entradaBuffer = '';

document.getElementById('empresaVeh').addEventListener('input', function(event) {
    const lastCharacter = event.data;

    // Si el último carácter es Enter o Tab, limpiar el buffer y salir
    if (lastCharacter === '\n' || lastCharacter === '\t') {
        entradaBuffer = ''; // Limpiar buffer
        return;
    }

    // Añadir el dato escaneado al buffer
    entradaBuffer += lastCharacter || '';

    // Actualizar el campo con el buffer acumulado
    event.target.value = entradaBuffer;

    // Procesar los datos escaneados al perder el foco
    const datos = entradaBuffer.split(/\s+/); // Separar por espacios

    // Asignar valores a los campos correspondientes
    if (datos.length >= 3) {
        document.getElementById('nombreDue').value = `${datos[0]} ${datos[1]} ${datos[2]}`; // Nombre
        document.getElementById('direccionDue').value = datos.slice(3, -1).join(' '); // Dirección
        document.getElementById('codigoDepar').value = datos[datos.length - 1]; // Código (último dato)

        // Desbloquear los campos
        document.getElementById('nombreDue').removeAttribute('readonly');
        document.getElementById('direccionDue').removeAttribute('readonly');
        document.getElementById('codigoDepar').removeAttribute('readonly');
    }
});

 // Función para convertir a mayúsculas
 function convertirAMayusculas(inputId) {
    document.getElementById(inputId).addEventListener('input', function() {
        this.value = this.value.toUpperCase(); // Convertir a mayúsculas
    });
}

// Aplicar la función a los campos deseados
const camposParaMayusculas = ['nombreDue', 'direccionDue', 'codigoDepar','placaVehi', 'marcaVehi'];
camposParaMayusculas.forEach(convertirAMayusculas);


document.getElementById('empresaVeh').addEventListener('keydown', function(event) {
    // Prevenir el envío de otros datos en el campo de matrícula
    if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault(); // Prevenir el envío del formulario
    }
});

document.getElementById('empresaVeh').addEventListener('focusout', function() {
    // Puedes optar por limpiar el buffer o no
    // entradaBuffer = ''; // Descomenta si deseas limpiar el buffer al salir
});


//Enviar formulario 

//Envio sin el metodo fetch
// document.getElementById('formEmpresa').addEventListener('submit', async (event) => {
//     // event.preventDefault(); // Evita el envío predeterminado del formulario para manejarlo con fetch

//     const formData = new FormData(event.target);
//     console.log([...formData.entries()]);

//     try {
//         const response = await fetch(event.target.action, {
//             method: event.target.method,
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Error en la solicitud');
//         }

//         // Si la respuesta es exitosa
//         const result = await response.json(); // Suponiendo que el servidor devuelve un JSON
//         console.log(result)
//         // await swal("¡Éxito!", "Tus datos se guardaron correctamente.", "success");

//         // Limpiar el formulario
//         event.target.reset();

//     } catch (error) {
//         console.error('Error:', error);
//         // await swal("¡Error!", "Hubo un problema al guardar tus datos.", "error");
//     }
// });


//Envio con el metodo fetch
// document.getElementById('formEmpresa').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Evita el envío predeterminado del formulario

//     const formData = new FormData(event.target);

//     try {
//         const response = await fetch(event.target.action, {
//             method: event.target.method,
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Error en la solicitud');
//         }

//         const result = await response.json();
//         Swal.fire('Éxito', result.message, 'success');
//         event.target.reset(); // Limpia el formulario

//     } catch (error) {
//         console.error('Error:', error);
//         Swal.fire('Error', 'Hubo un problema al guardar los datos', 'error');
//     }
// });

document.getElementById('formEmpresa').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const form = event.target;

    fetch('/consultaFormularioDos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Tipo de contenido
        },
        body: new URLSearchParams(new FormData(form)).toString() // Convierte los datos del formulario a URLSearchParams
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); 
    })
    .then(data => {
        Swal.fire({
            title: data.message || 'Datos guardados con éxito',
            html: `<p>${data.segMensaje}</p>
                    <p style="margin-bottom: 10px;"></p>
                    <p><b>${data.mensFinal}</b></p>`, 
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            form.reset(); 
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Error al enviar los datos. Inténtalo de nuevo.', 
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
});



























