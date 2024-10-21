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
// document.getElementById('formEmpresa').addEventListener('submit', function(event) {
//     // Obtener la fecha actual
//     const fecha = new Date();
//     const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
//     const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones); // Formato DD/MM/YYYY

//     // Colocar la fecha en el input
//     document.getElementById('fechaActual').value = fechaFormateada;

//     // Aquí puedes realizar cualquier otra acción que necesites al enviar el formulario
//     // event.preventDefault(); // Descomenta esto si no deseas enviar el formulario inmediatamente
// });

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























