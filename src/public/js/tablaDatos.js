const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementsByClassName('close')[0];

//Función para la modal
openModalBtn.onclick = function() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

//Función para cerra sesión
document.getElementById('singUp').addEventListener('click', () => {
    window.location.href = 'index.html';
});


//Función para filtrar usuarios
document.getElementById('filterInput').addEventListener('keyup', function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');

    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let found = false;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }

        row.style.display = found ? '' : 'none';
    });
});

//Botón eliminar elemento de la tabla
function deleteRow(button) {
    const row = button.parentNode.parentNode;

    // Usar SweetAlert2 para la confirmación
    Swal.fire({
        title: '¿Estás seguro de eliminar esta fila?',
        text: 'Una vez eliminada, no podrás recuperar los datos.',
        icon: 'warning',
        showCancelButton: true, // Mostrar botón de cancelar
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar' // Texto del botón de cancelar
    }).then((result) => {
        if (result.isConfirmed) {
            row.parentNode.removeChild(row);
            Swal.fire(
                '¡Eliminada!',
                'La fila ha sido eliminada.',
                'success'
            );
        } else {
            Swal.fire(
                'Cancelado',
                'La fila no ha sido eliminada.',
                'error'
            );
        }
    });
}

