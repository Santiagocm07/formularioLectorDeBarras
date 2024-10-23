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


document.getElementById('crear-pers-btn').onclick = function() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('crear-pers-section').style.display = 'block';
};

document.getElementById('validar-pin-btn').onclick = function(event) {
    event.preventDefault();
    const pinInput = document.getElementById('pin').value;

    // Validar el PIN
    if (pinInput === '1234') {
        document.getElementById('nueva-pers-field').style.display = 'block';
    } else {
        alert('PIN incorrecto');
    }
};

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
        const response = await fetch('/crear-usuario', {
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

function clearFields() {
    document.getElementById('nuevaPer').value = '';
    document.getElementById('nuevaContra').value = '';
    // document.getElementById('nueva-pers-field').style.display = 'none';
    document.getElementById('pin').value = '';
    
}

// Manejo del botón para volver al inicio de sesión
document.getElementById('volver-btn').onclick = function() {
    document.getElementById('crear-pers-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';

    clearFields();
};






