//Función para cerrar sesión
document.getElementById('singUp').addEventListener('click', () => {
    window.location.href = '/';
});

//Traer datos de la DB para la tabla
// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/obtenerDatosEmpresas') // Ruta que creaste para obtener los datos
//         .then(response => response.json())
//         .then(data => {
//             // Verificar el contenido de 'data' en la consola
//             console.log(data); // Añade esta línea para depurar

//             const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

//             // Limpiar la tabla antes de llenarla
//             userTable.innerHTML = '';

//             // Comprobar si 'data.total' y 'data.usuarios' son válidos
//             if (data.total !== undefined && data.empresas) {
//                 document.getElementById('numero-seguidores').innerText = data.total;

//                 // Llenar la tabla con los datos
//                 data.empresas.forEach(empresa => {
//                     const row = userTable.insertRow();
//                     row.insertCell(0).innerText = empresa.idCliente; 
//                     row.insertCell(1).innerText = empresa.numeroClte; 
//                     row.insertCell(2).innerText = empresa.nombreClte;
//                     row.insertCell(3).innerText = empresa.fechaNaciClte; 
//                     row.insertCell(4).innerText = empresa.celularClte; 
//                     row.insertCell(5).innerText = empresa.correoClte; 
//                     row.insertCell(6).innerText = empresa.placaCar; 
//                     row.insertCell(7).innerText = empresa.modeloCar; 
//                     row.insertCell(8).innerText = empresa.cilindrajeCar; 
//                     row.insertCell(9).innerText = empresa.marcaCar; 
//                     row.insertCell(10).innerText = empresa.colorCar; 
//                     row.insertCell(11).innerText = empresa.tipoVehiculo; 
//                     row.insertCell(12).innerText = empresa.fecha;  
//                     const actionCell = row.insertCell(13);
//                     actionCell.innerHTML = '<button onclick="deleteRow(this)"><i class="fa-solid fa-trash-can"></i></button>'; 
//                 });
//             } else {
//                 console.error('Datos inesperados:', data);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar los datos:', error);
//         });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/obtenerDatosEmpresas') // Ruta que creaste para obtener los datos
//         .then(response => response.json())
//         .then(data => {
//             // Verificar el contenido de 'data' en la consola
//             console.log(data); // Añade esta línea para depurar

//             const empresaTabla = document.getElementById('empresaTabla').getElementsByTagName('tbody')[0];

//             // Limpiar la tabla antes de llenarla
//             empresaTabla.innerHTML = '';

//             // Comprobar si 'data.total' y 'data.empresas' son válidos
//             if (data.total !== undefined && data.empresas) {
//                 document.getElementById('numero-seguidores').innerText = data.total;

//                 // Llenar la tabla con los datos
//                 data.empresas.forEach(empresa => {
//                     const row = empresaTabla.insertRow();
//                     row.insertCell(0).innerText = empresa.idEmpresa; 
//                     row.insertCell(1).innerText = empresa.numeroEmp; 
//                     row.insertCell(2).innerText = empresa.nombreEmp;
//                     row.insertCell(3).innerText = empresa.fechaActual; 
//                     row.insertCell(4).innerText = empresa.celularEmp; 
//                     row.insertCell(5).innerText = empresa.correoEmp; 
//                     row.insertCell(6).innerText = empresa.placaAuto; 
//                     row.insertCell(7).innerText = empresa.modeloAuto; 
//                     row.insertCell(8).innerText = empresa.cilindrajeAuto; 
//                     row.insertCell(9).innerText = empresa.marcaAuto; 
//                     row.insertCell(10).innerText = empresa.colorAuto; 
//                     row.insertCell(11).innerText = empresa.tipoVehiculoEmp;  
//                     const actionCell = row.insertCell(12);
//                     actionCell.innerHTML = '<button onclick="deleteRow(this)"><i class="fa-solid fa-trash-can"></i></button>'; 
//                 });
//             } else {
//                 console.error('Datos inesperados:', data);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar los datos:', error);
//         });
// });

document.addEventListener('DOMContentLoaded', function() {
    fetch('/obtenerDatosEmpresas')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifica la respuesta aquí

            const empresaTabla = document.getElementById('empresaTabla').getElementsByTagName('tbody')[0];
            empresaTabla.innerHTML = ''; // Limpiar la tabla

            // Comprueba si 'data.total' y 'data.empresas' son válidos
            if (data.total !== undefined && data.empresas) {
                document.getElementById('numero-seguidores').innerText = data.total;

                // Llenar la tabla con los datos
                data.empresas.forEach(empresa => {
                    const row = empresaTabla.insertRow();
                    row.insertCell(0).innerText = empresa.idEmpresa; 
                    row.insertCell(1).innerText = empresa.numeroEmp; 
                    row.insertCell(2).innerText = empresa.nombreEmp;
                    row.insertCell(3).innerText = empresa.fechaActual; 
                    row.insertCell(4).innerText = empresa.celularEmp; 
                    row.insertCell(5).innerText = empresa.correoEmp; 
                    row.insertCell(6).innerText = empresa.ivaEmpresa; 
                    row.insertCell(7).innerText = empresa.tipoPersonaEmp; 
                    row.insertCell(8).innerText = empresa.placaAuto; 
                    row.insertCell(9).innerText = empresa.modeloAuto; 
                    row.insertCell(10).innerText = empresa.cilindrajeAuto; 
                    row.insertCell(11).innerText = empresa.marcaAuto; 
                    row.insertCell(12).innerText = empresa.colorAuto; 
                    row.insertCell(13).innerText = empresa.tipoVehiculoEmp;  
                    const actionCell = row.insertCell(14);
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





//Función para eliminar 
// function deleteRow(button) {
//     const row = button.parentNode.parentNode;
//     const userId = row.cells[0].innerText; 

//     Swal.fire({
//         title: '¿Estás seguro de eliminar esta fila?',
//         text: 'Una vez eliminada, no podrás recuperar los datos.',
//         icon: 'warning',
//         showCancelButton: true, 
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Eliminar',
//         cancelButtonText: 'Cancelar' 
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // Hacer la solicitud de eliminación al servidor
//             fetch(`/usuarios/${userId}`, {
//                 method: 'DELETE'
//             })
//             .then(response => {
//                 if (response.ok) {
//                     // Eliminar la fila de la tabla
//                     row.parentNode.removeChild(row);
//                     Swal.fire(
//                         '¡Eliminada!',
//                         'La fila ha sido eliminada.',
//                         'success'
//                     );
//                 } else {
//                     Swal.fire(
//                         'Error',
//                         'No se pudo eliminar la fila. Inténtalo de nuevo.',
//                         'error'
//                     );
//                 }
//             })
//             .catch(error => {
//                 console.error('Error al eliminar el registro:', error);
//                 Swal.fire(
//                     'Error',
//                     'No se pudo conectar al servidor. Inténtalo de nuevo.',
//                     'error'
//                 );
//             });
//         } else {
//             Swal.fire(
//                 'Cancelado',
//                 'La fila no ha sido eliminada.',
//                 'error'
//             );
//         }
//     });
// }

function deleteRow(button) {
    const row = button.closest('tr'); // Encuentra la fila más cercana
    const idEmpresa = row.cells[0].innerText; // Obtén el ID de la empresa

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
            fetch(`/eliminarDatosEmpresas/${idEmpresa}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Eliminar la fila de la tabla
                    row.remove(); // O puedes usar: row.parentNode.removeChild(row);
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
                'info'
            );
        }
    });
}


// document.addEventListener('DOMContentLoaded', function() {
//     const empresaTabla = document.getElementById('empresaTabla');

//     // Doble clic en una celda
//     empresaTabla.addEventListener('dblclick', function(event) {
//         const cell = event.target; // Celda que fue clickeada
//         if (cell.tagName === 'TD') { // Asegurarse de que es una celda
//             const originalValue = cell.innerText; // Guardar el valor original
//             const input = document.createElement('input'); // Crear un input
//             input.type = 'text';
//             input.value = originalValue; // Poner el valor original
//             cell.innerHTML = ''; // Limpiar la celda
//             cell.appendChild(input); // Añadir el input

//             // Al perder el foco, guardar el valor
//             input.addEventListener('blur', function() {
//                 const newValue = input.value; // Obtener el nuevo valor
//                 cell.innerHTML = newValue; // Actualizar la celda

//                 // Obtener el ID de la fila (suponiendo que está en la primera celda)
//                 const row = cell.closest('tr');
//                 const idEmpresa = row.cells[0].innerText;

//                 // Hacer la solicitud de actualización al servidor
//                 fetch(`/editarDatosEmpresas/${idEmpresa}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ columna: cell.cellIndex, valor: newValue }) // Enviar columna y nuevo valor
//                 })
//                 .then(response => {
//                     if (response.ok) {
//                         // Mostrar SweetAlert de éxito
//                         Swal.fire(
//                             '¡Actualizado!',
//                             'Los datos se han actualizado correctamente.',
//                             'success'
//                         );
//                     } else {
//                         throw new Error('Error al actualizar la base de datos');
//                     }
//                 })
//                 .catch(error => {
//                     console.error(error);
//                     cell.innerHTML = originalValue; // Revertir al valor original si hay un error
//                     Swal.fire(
//                         'Error',
//                         'No se pudo guardar los cambios.',
//                         'error'
//                     );
//                 });
//             });

//             // Enfocar el input
//             input.focus();
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const empresaTabla = document.getElementById('empresaTabla');

    // Doble clic en una celda
    empresaTabla.addEventListener('dblclick', function(event) {
        const cell = event.target; // Celda que fue clickeada
        if (cell.tagName === 'TD') { // Asegurarse de que es una celda
            const originalValue = cell.innerText; // Guardar el valor original
            const input = document.createElement('input'); // Crear un input
            input.type = 'text';
            input.value = originalValue; // Poner el valor original
            cell.innerHTML = ''; // Limpiar la celda
            cell.appendChild(input); // Añadir el input

            // Al perder el foco, guardar el valor
            input.addEventListener('blur', function() {
                const newValue = input.value; // Obtener el nuevo valor
                cell.innerHTML = newValue; // Actualizar la celda

                // Obtener el ID de la fila (suponiendo que está en la primera celda)
                const row = cell.closest('tr');
                const idEmpresa = row.cells[0].innerText;

                // Obtener el índice de la celda
                const columnaIndex = cell.cellIndex;

                // Hacer la solicitud de actualización al servidor
                fetch(`/editarDatosEmpresas/${idEmpresa}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ columna: columnaIndex, valor: newValue }) // Enviar columna y nuevo valor
                })
                .then(response => {
                    if (response.ok) {
                        // Mostrar SweetAlert de éxito
                        Swal.fire(
                            '¡Actualizado!',
                            'Los datos se han actualizado correctamente.',
                            'success'
                        );
                    } else {
                        throw new Error('Error al actualizar la base de datos');
                    }
                })
                .catch(error => {
                    console.error(error);
                    cell.innerHTML = originalValue; // Revertir al valor original si hay un error
                    Swal.fire(
                        'Error',
                        'No se pudo guardar los cambios.',
                        'error'
                    );
                });
            });

            // Enfocar el input
            input.focus();
        }
    });
});

