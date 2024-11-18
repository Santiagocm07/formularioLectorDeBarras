// document.getElementById('crear-pers-btn').onclick = function() {
//     document.getElementById('login-section').style.display = 'none';
//     document.getElementById('crear-pers-section').style.display = 'block';
// };

// document.getElementById('validar-pin-btn').onclick = function(event) {
//     event.preventDefault();
//     const pinInput = document.getElementById('pin').value;
//     // Aquí iría la lógica para validar el PIN
//     if (pinInput === '1234') {
//         document.getElementById('nueva-pers-field').style.display = 'block';
//     } else {
//         alert('PIN incorrecto');
//     }
// };

// const backToLoginBtn = document.getElementById('volver-btn');
// backToLoginBtn.onclick = function() {
//     document.getElementById('crear-pers-section').style.display = 'none';
//     document.getElementById('login-section').style.display = 'block';
// };



// //Metodo para registrar nuevos usuarios
// document.getElementById('guardar-pers-btn').onclick = async function(event) {
//     event.preventDefault(); 

//     const nuevaPer = document.getElementById('nuevaPer').value;
//     const nuevaContra = document.getElementById('nuevaContra').value;

//     // Validar que los campos no estén vacíos
//     if (!nuevaPer || !nuevaContra) {
//         alert('Por favor, completa todos los campos.');
//         return;
//     }

//     try {
//         const response = await fetch('/crear-usuario', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ nuevaPer, nuevaContra }),
//         });

//         const result = await response.json();

//         if (result.success) {
//             alert(result.message);
//             clearFields();
//             // Limpiar campos o redirigir al inicio de sesión
//             // document.getElementById('nuevaPers').value = '';
//             // document.getElementById('nuevaContra').value = '';
//             document.getElementById('nueva-pers-field').style.display = 'none';
//             document.getElementById('login-section').style.display = 'block';
//         } else {
//             alert(result.message);
//             clearFields();
//         }
//     } catch (error) {
//         console.error('Error al guardar el nuevo usuario:', error);
//         alert('Error al crear el usuario');
//         clearFields();
//     }
// };

// function clearFields() {
//     document.getElementById('nuevaPer').value = '';
//     document.getElementById('nuevaContra').value = '';
// }

// // Manejo del botón para volver al inicio de sesión
// document.getElementById('volver-btn').onclick = function() {
//     document.getElementById('crear-pers-section').style.display = 'none';
//     document.getElementById('login-section').style.display = 'block';
// };

//Funcion para que el formulario login se oculte cuando queramos registrar nuevos usuarios
document.getElementById('crear-pers-btn').onclick = function() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('crear-pers-section').style.display = 'block';
};

document.getElementById('validar-pin-btn').onclick = function(event) {
    event.preventDefault();
    const pinInput = document.getElementById('pin').value;

    // Validar el PIN
    if (pinInput === '5710L30C4r0*') {
        document.getElementById('nueva-pers-field').style.display = 'block';
    } else {
        alert('PIN incorrecto');
    }
};

//Funcion para mostrar el mensaje de error o dar acceso a las otras paginas
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('nombrePers').value;
    const password = document.getElementById('contraPers').value;

    // Llamar a tu API para iniciar sesión
    const response = await fetch('login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombrePers: username, contraPers: password })
    });

    let result;
    
    try {
        // Intenta obtener la respuesta como JSON
        result = await response.json();
    } catch (e) {
        // Si ocurre un error, muestra un mensaje
        console.error('Error al obtener JSON:', e);
        document.getElementById('errorMessage').textContent = 'Error en el servidor. Inténtalo de nuevo.';
        return;
    }

    // Mostrar el mensaje de error si no fue exitoso
    if (!result.success) {
        document.getElementById('errorMessage').textContent = result.message;

        setTimeout(() => {
            document.getElementById('errorMessage').textContent = '';
            document.getElementById('login-form').reset();
        }, 3000);
    } else {
        // Manejar el inicio de sesión exitoso (redireccionar, etc.)
        console.log('Redirigiendo a /formulario1');
        window.location.href = '/formulario1';
    }
});

//Funcion para crear nuevos usuarios
document.getElementById('guardar-pers-btn').onclick = async function(event) {
    event.preventDefault(); 

    const nuevaPer = document.getElementById('nuevaPer').value;
    const nuevaContra = document.getElementById('nuevaContra').value;

    // Validar que los campos no estén vacíos
    if (!nuevaPer || !nuevaContra) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('crear-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevaPer, nuevaContra }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            clearFields(); // Limpiar campos
            document.getElementById('nueva-pers-field').style.display = 'none'; // Ocultar nuevo usuario
            document.getElementById('login-section').style.display = 'block'; // Mostrar inicio de sesión
            document.getElementById('crear-pers-section').style.display = 'none'; // Mostrar inicio de sesión
            // document.getElementById('pin').value = ''; // Limpiar el PIN
        } else {
            alert(result.message);
            clearFields(); // Limpiar campos si ya existe
            document.getElementById('nueva-pers-field').style.display = 'none';
        }
    } catch (error) {
        console.error('Error al guardar el nuevo usuario:', error);
        alert('Error al crear el usuario');
        clearFields(); // Limpiar campos en caso de error
    }
};

// Función para eliminar usuario
// Mostrar la modal
document.getElementById('eliminar-pers-btn').onclick = function() {
    document.getElementById('modalEliminar').style.display = 'block';
};

// Cerrar la modal
document.querySelector('.close').onclick = function() {
    document.getElementById('modalEliminar').style.display = 'none';
};

// Función para confirmar eliminación
document.getElementById('confirmarEliminar-btn').onclick = async function() {
    const nombreEliminar = document.getElementById('nombreEliminar').value;

    if (!nombreEliminar) {
        alert('Por favor, ingresa el nombre del usuario a eliminar.');
        return;
    }

    try {
        const response = await fetch('eliminar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreEliminar }),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            document.getElementById('modalEliminar').style.display = 'none'; // Cerrar modal
            document.getElementById('nombreEliminar').value = ''; // Limpiar el campo
            // Mostrar la sección de crear usuarios
            document.getElementById('crear-pers-section').style.display = 'block';
            document.getElementById('login-section').style.display = 'none';

            // location.reload();
        } else {
            document.getElementById('eliminarMessage').textContent = result.message;
            document.getElementById('nombreEliminar').value = ''; 
            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                document.getElementById('eliminarMessage').textContent = ''; // Limpiar el mensaje
            }, 3000);
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        alert('Error al eliminar el usuario');
    }
};

// Manejo del botón para volver al inicio de sesión
document.getElementById('volver-btn').onclick = function() {
    document.getElementById('crear-pers-section').style.display = 'none';
    document.getElementById('modalEliminar').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('nueva-pers-field').style.display = 'none';

    clearFields();
};

function clearFields() {
    document.getElementById('nuevaPer').value = '';
    document.getElementById('nuevaContra').value = '';
    document.getElementById('nombreEliminar').value = '';
    document.getElementById('eliminarMessage').textContent = '';
    document.getElementById('pin').value = '';  
}






