// const modal = document.getElementById('modal');
// const openModalBtn = document.getElementById('openModalBtn');
// const closeBtn = document.getElementsByClassName('close')[0];

// //Función para la modal
// openModalBtn.onclick = function() {
//     modal.style.display = 'block';
// }

// closeBtn.onclick = function() {
//     modal.style.display = 'none';
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = 'none';
//     }
// }

//Función para cerrar sesión
document.getElementById('singUp').addEventListener('click', () => {
    window.location.href = '/';
});

//Traer datos de la DB para la tabla
document.addEventListener('DOMContentLoaded', function() {
    fetch('/usuarios') // Ruta que creaste para obtener los datos
        .then(response => response.json())
        .then(data => {
            // Verificar el contenido de 'data' en la consola
            console.log(data); // Añade esta línea para depurar

            const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

            // Limpiar la tabla antes de llenarla
            userTable.innerHTML = '';

            // Comprobar si 'data.total' y 'data.usuarios' son válidos
            if (data.total !== undefined && data.usuarios) {
                document.getElementById('numero-seguidores').innerText = data.total;

                // Llenar la tabla con los datos
                data.usuarios.forEach(usuario => {
                    const row = userTable.insertRow();
                    row.insertCell(0).innerText = usuario.idCliente; 
                    row.insertCell(1).innerText = usuario.numeroClte; 
                    row.insertCell(2).innerText = usuario.nombreClte;
                    row.insertCell(3).innerText = usuario.fechaNaciClte; 
                    row.insertCell(4).innerText = usuario.celularClte; 
                    row.insertCell(5).innerText = usuario.correoClte; 
                    row.insertCell(6).innerText = usuario.placaCar; 
                    row.insertCell(7).innerText = usuario.modeloCar; 
                    row.insertCell(8).innerText = usuario.cilindrajeCar; 
                    row.insertCell(9).innerText = usuario.marcaCar; 
                    row.insertCell(10).innerText = usuario.colorCar; 
                    row.insertCell(11).innerText = usuario.tipoVehiculo; 
                    row.insertCell(12).innerText = usuario.fecha;  
                    const actionCell = row.insertCell(13);
                    actionCell.innerHTML = '<button onclick="deleteRow(this)"><i class="fa-solid fa-trash-can"></i></button>'; 
                });
            } else {
                console.error('Datos inesperados:', data);
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
});

//Función para filtrar usuarios
// document.getElementById('filterInput').addEventListener('keyup', function() {
//     const filter = this.value.toLowerCase();
//     const rows = document.querySelectorAll('#userTable tbody tr');

//     rows.forEach(row => {
//         const cells = row.getElementsByTagName('td');
//         let found = false;

//         for (let i = 0; i < cells.length; i++) {
//             if (cells[i].textContent.toLowerCase().includes(filter)) {
//                 found = true;
//                 break;
//             }
//         }

//         row.style.display = found ? '' : 'none';
//     });
// });

document.getElementById('filterInput').addEventListener('keyup', function() {
    const filter = this.value.toLowerCase();
    const rows = userTable.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j] && cells[j].textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }

        rows[i].style.display = found ? '' : 'none';
    }
});

//Función para eliminar 
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const userId = row.cells[0].innerText; 

    Swal.fire({
        title: '¿Estás seguro de eliminar esta fila?',
        text: 'Una vez eliminada, no podrás recuperar los datos.',
        icon: 'warning',
        showCancelButton: true, 
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar' 
    }).then((result) => {
        if (result.isConfirmed) {
            // Hacer la solicitud de eliminación al servidor
            fetch(`/usuarios/${userId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Eliminar la fila de la tabla
                    row.parentNode.removeChild(row);
                    Swal.fire(
                        '¡Eliminada!',
                        'La fila ha sido eliminada.',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar la fila. Inténtalo de nuevo.',
                        'error'
                    );
                }
            })
            .catch(error => {
                console.error('Error al eliminar el registro:', error);
                Swal.fire(
                    'Error',
                    'No se pudo conectar al servidor. Inténtalo de nuevo.',
                    'error'
                );
            });
        } else {
            Swal.fire(
                'Cancelado',
                'La fila no ha sido eliminada.',
                'error'
            );
        }
    });
}


//Consulta para editar datos
const userTable = document.getElementById('userTable');

userTable.addEventListener('dblclick', function(e) {
    const target = e.target;

    
    if (target.tagName === 'TD') {
        const originalContent = target.innerText; 
        const input = document.createElement('input');
        input.value = originalContent; 
        target.innerText = ''; 
        target.appendChild(input); 

        input.focus(); 

        // Solo convertir a minusculas la columna correo y tipo vehiculo
        input.addEventListener('input', () => {
            // Verifica si el índice de la celda es 2 o 4
            if (target.cellIndex === 5 || target.cellIndex === 11) {
                input.value = input.value.toLowerCase(); // Convierte a minúsculas
            } else {
                input.value = input.value.toUpperCase(); // Convierte a mayúsculas
            }
        });

        // Cuando se pierde el foco o se presiona Enter, guardar el cambio
        input.addEventListener('blur', () => saveEdit(target, input.value, originalContent));
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                saveEdit(target, input.value, originalContent);
            }
        });
    }
});

// Función para guardar la edición
function saveEdit(cell, newValue, originalValue) {
    const row = cell.parentNode;
    const userId = row.cells[0].innerText; 

    // Obtener los valores actuales de la fila
    let numeroClte = row.cells[1].innerText; 
    let nombreClte = row.cells[2].innerText; 
    let fechaNaciClte = row.cells[3].innerText; 
    let celularClte = row.cells[4].innerText; 
    let correoClte = row.cells[5].innerText; 
    let placaCar = row.cells[6].innerText; 
    let modeloCar = row.cells[7].innerText; 
    let cilindrajeCar = row.cells[8].innerText; 
    let marcaCar = row.cells[9].innerText; 
    let colorCar = row.cells[10].innerText; 
    let tipoVehiculo = row.cells[11].innerText; 
    let fecha = row.cells[12].innerText; 

    // Verifica qué celda fue editada y actualiza el valor correspondiente
    if (newValue !== originalValue) {
        if (cell.cellIndex === 1) { 
            numeroClte = newValue;
        } else if (cell.cellIndex === 2) { 
            nombreClte = newValue;
        } else if (cell.cellIndex === 3) { 
            fechaNaciClte = newValue;
        } else if (cell.cellIndex === 4) { 
            celularClte = newValue;
        } else if (cell.cellIndex === 5) { 
            correoClte = newValue;
        } else if (cell.cellIndex === 6) { 
            placaCar = newValue;
        } else if (cell.cellIndex === 7) { 
            modeloCar = newValue;
        } else if (cell.cellIndex === 8) { 
            cilindrajeCar = newValue;
        } else if (cell.cellIndex === 9) { 
            marcaCar = newValue;
        } else if (cell.cellIndex === 10) { 
            colorCar = newValue;
        } else if (cell.cellIndex === 11) { 
            tipoVehiculo = newValue;
        } else if (cell.cellIndex === 12) { 
            fecha = newValue;
        }

        // Hacer la solicitud de actualización
        fetch(`/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numeroClte, nombreClte, fechaNaciClte, celularClte, correoClte, placaCar, modeloCar, cilindrajeCar, marcaCar, colorCar, tipoVehiculo, fecha }) 
        })
        .then(response => {
            if (response.ok) {
                cell.innerText = newValue; 
                Swal.fire('¡Actualizado!', 'Los datos han sido actualizados.', 'success');
            } else {
                return response.json().then(err => {
                    Swal.fire('Error', err.mensaje || 'No se pudo actualizar los datos.', 'error');
                });
            }
        })
        .catch(error => {
            console.error('Error al actualizar los datos:', error);
            Swal.fire('Error', 'No se pudo conectar al servidor. Inténtalo de nuevo.', 'error');
        });
    } else {
        // Si no hubo cambio, simplemente restaurar el contenido
        cell.innerText = originalValue;
    }
}