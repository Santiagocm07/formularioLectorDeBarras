// const { response } = require("express");

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
            console.log(data); 

            const empresaTabla = document.getElementById('empresaTabla').getElementsByTagName('tbody')[0];
            empresaTabla.innerHTML = ''; 

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
                    
                     // Asegúrarse de que las celdas editables tengan 'data-column' con el nombre de la columna
                     row.cells[1].setAttribute('data-column', 'numeroEmp');
                     row.cells[2].setAttribute('data-column', 'nombreEmp');
                     row.cells[3].setAttribute('data-column', 'fechaActual');
                     row.cells[4].setAttribute('data-column', 'celularEmp');
                     row.cells[5].setAttribute('data-column', 'correoEmp');
                     row.cells[6].setAttribute('data-column', 'ivaEmpresa');
                     row.cells[7].setAttribute('data-column', 'tipoPersonaEmp');
                     row.cells[8].setAttribute('data-column', 'placaAuto');
                     row.cells[9].setAttribute('data-column', 'modeloAuto');
                     row.cells[10].setAttribute('data-column', 'cilindrajeAuto');
                     row.cells[11].setAttribute('data-column', 'marcaAuto');
                     row.cells[12].setAttribute('data-column', 'colorAuto');
                     row.cells[13].setAttribute('data-column', 'tipoVehiculoEmp');

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

        //función para filtrar
        const filterInput = document.getElementById('filterInput');
        filterInput.addEventListener('input', function() {
            const filterValue = filterInput.value.toLowerCase(); 
            const rows = document.getElementById('empresaTabla').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

            // Recorrer todas las filas y las ocultamos o mostramos según el filtro
            Array.from(rows).forEach(row => {
                let showRow = false; 
                // Recorrer todas las celdas de cada fila
                Array.from(row.cells).forEach(cell => {
                    // Si la celda contiene el valor del filtro, mostramos la fila
                    if (cell.innerText.toLowerCase().includes(filterValue)) {
                        showRow = true;
                    }
                });

                // Mostrar u ocultar la fila
                if (showRow) {
                    row.style.display = ''; 
                } else {
                    row.style.display = 'none'; 
                }
            });
        });
});

//Función para eliminar filas de la tabla 
function deleteRow(button) {
    const row = button.closest('tr'); 
    const idEmpresa = row.cells[0].innerText; 

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
                    row.remove(); 
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

//Función para editar elementos
const empresaTabla = document.getElementById('empresaTabla');

empresaTabla.addEventListener('dblclick', function(e) {
    const target = e.target;

    if (target.tagName === 'TD' && target.cellIndex !==0) {
        const originalContent = target.innerText; 
        const input = document.createElement('input');
        input.value = originalContent; 
        target.innerText = ''; 
        target.appendChild(input); 

        input.focus(); 

        // Solo convertir a mayusculas los campos 2, 8, 11
        input.addEventListener('input', () => {
            if (target.cellIndex === 2 || target.cellIndex === 8 || target.cellIndex === 11) {
                input.value = input.value.toUpperCase(); 
            } else {
                input.value = input.value.toLowerCase();
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
    const idEmpresa = row.cells[0].innerText; 
    
    // Obtener los valores actuales de la fila
    let numeroEmp = row.cells[1].innerText; 
    let nombreEmp = row.cells[2].innerText; 
    let fechaActual = row.cells[3].innerText; 
    let celularEmp = row.cells[4].innerText; 
    let correoEmp = row.cells[5].innerText; 
    let ivaEmpresa = row.cells[6].innerText; 
    let tipoPersonaEmp = row.cells[7].innerText; 
    let placaAuto = row.cells[8].innerText; 
    let modeloAuto = row.cells[9].innerText; 
    let cilindrajeAuto = row.cells[10].innerText; 
    let marcaAuto = row.cells[11].innerText; 
    let colorAuto = row.cells[12].innerText; 
    let tipoVehiculoEmp = row.cells[13].innerText;  

    // Verifica qué celda fue editada y actualiza el valor correspondiente
    let columna = '';

    switch(cell.cellIndex) {
        case 1: 
            numeroEmp = newValue;
            columna = 'numeroEmp'; break;
        case 2: 
            nombreEmp = newValue;
            columna = 'nombreEmp'; break;
        case 3: 
            fechaActual = newValue;
            columna = 'fechaActual'; break;
        case 4: 
            celularEmp = newValue;
            columna = 'celularEmp'; break;
        case 5: 
            correoEmp = newValue;
            columna = 'correoEmp'; break;
        case 6: 
            ivaEmpresa = newValue;
            columna = 'ivaEmpresa'; break;
        case 7: 
            tipoPersonaEmp = newValue;
            columna = 'tipoPersonaEmp'; break;
        case 8: 
            placaAuto = newValue;
            columna = 'placaAuto'; break;
        case 9: 
            modeloAuto = newValue;
            columna = 'modeloAuto'; break;
        case 10: 
            cilindrajeAuto = newValue;
            columna = 'cilindrajeAuto'; break;
        case 11: 
            marcaAuto = newValue;
            columna = 'marcaAuto'; break;
        case 12: 
            colorAuto = newValue;
            columna = 'colorAuto'; break;
        case 13: 
            tipoVehiculoEmp = newValue;
            columna = 'tipoVehiculoEmp'; break;
        default:
            console.log('Columna no válida');
            return; 
    }

    if (!columna) {
        console.error('Columna no válida');
        return;
    }

    fetch(`/editarDatosEmpresas/${idEmpresa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            columna: columna, 
            valor: newValue
        })
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
}













