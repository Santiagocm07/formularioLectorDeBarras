const express = require('express');
const path = require('path');
const mysql = require("mysql");
const bodyParser = require('body-parser'); // Necesario para manejar datos de formulario

// Importar las rutas del segundo formulario
const formulario2Routes = require('./formulario2');

const app = express();


//Conexion de la DB
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lectordebarras"
});

conexion.connect(function(err){
    if(err){
        throw err;
    } else {
        console.log("Conexion DB exitosa")
    }
});

// module.exports = conexion;
// conexion.end();

//Metodo para que los datos del formulario sean codificados
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json()); // Para parsear JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para parsear datos de formularios
// app.use('/consultar-rut', formulario2Routes);
app.use(formulario2Routes);


app.use(express.static(path.join(__dirname, 'public')));

// Rutas para las paginas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paginas', 'index.html'));
});

app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paginas', 'formularioJuridico.html'));
});

app.get('/tabla', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paginas', 'tablaDatos.html'));
});

app.get('/tablaEmpresas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'paginas', 'tablaDFormulario2.html'));
});

//Consultas a la DB 
app.post('/validarDatos', function(req, res) {
    const datos = req.body;

    // let datosUs = datos.cedula;
    let numeroUs = datos.numeroUsr;
    let nombreUs = datos.nombreUsr;
    let generoUs = datos.genero;
    let fechaUs = datos.fecha;
    let tipoUs = datos.sangre;

    let celularUs = datos.celularUsr;
    let correoUs = datos.correoUsr;
    let responsableIva = datos.IvaUsr;
    let tipoPersona = datos.tipoPersona;

    // let datosVehi = datos.matricula;
    let nombrePro = datos.nombre;
    let direccionProp = datos.direccion;
    let codigoProp = datos.codigo;
    let placaVeh = datos.placa; //estas ya estaban

    let modeloCar = datos.modelo;
    let cilindraje = datos.cilindraje;
    let marcaCar = datos.marca;
    let colorCar = datos.color;

    let vehiculoProp = datos.vehiculo; //estas ya estaban 
    let ocupacionProp = datos.ocupacion;
    let fechaActu = datos.fechaHora; //estas ya estaban 

    // let nuevoRegistro = "INSERT INTO datosformulario (numeroCedula, nombreUsr, genero, fechaNaci, tipoSangre, nombreProp, direccion, codigoDepto, placa, tipoVehiculo, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // let valores = [numeroUs, nombreUs, generoUs, fechaUs, tipoUs, nombrePro, direccionProp, codigoProp, placaVeh, vehiculoProp, fechaActu];

    let nuevoRegistro = "INSERT INTO datosclientes (numeroClte, nombreClte, generoClte, fechaNaciClte, tipoSangreClte, celularClte, correoClte, responsableIva, tipoPersona, nombreDue, direccionDue, codigoDepar, placaCar, modeloCar, cilindrajeCar, marcaCar, colorCar, tipoVehiculo, ocupacionDue, fecha) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let valores = [numeroUs, nombreUs, generoUs, fechaUs, tipoUs, celularUs, correoUs, responsableIva, tipoPersona, nombrePro, direccionProp, codigoProp, placaVeh, modeloCar, cilindraje, marcaCar, colorCar, vehiculoProp, ocupacionProp, fechaActu];
    
    conexion.query(nuevoRegistro, valores, function(error) {
        if (error) {
            console.error(error);
            // return res.status(500).send('Error al guardar en la base de datos');
            return res.status(500).json({ mensajeForm: 'Error al guardar en la base de datos' });
        } else {
            console.log("Datos guardados en DB");
            // res.send('Datos guardados exitosamente');
            // return res.json({ mensajeValidar: 'Datos guardados exitosamente' });
            return res.status(200).json({ mensajeForm: 'Datos guardados exitosamente.', otroMensaje:'¡Muchas gracias por elegirnos como tu empresa automotriz! Valoramos tu confianza y estamos comprometidos a ofrecerte el mejor servicio y atención.', mensajeFinal:'¡Te damos la bienvenida a nuestra comunidad exclusiva!' });
        }
    });
});


app.get('/usuarios', function(req, res) {
    conexion.query('SELECT * FROM datosclientes', function(error, resultados) {
        if (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al obtener los datos' });
        }
        res.json({
            total: resultados.length,
            usuarios: resultados
        });
        // res.json(resultados); // Envía los datos como JSON
    });
});


app.delete('/usuarios/:Id', function(req, res) {
    const userId = req.params.Id;

    conexion.query('DELETE FROM datosclientes WHERE idCliente = ?', [userId], function(error, resultados) {
        if (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al eliminar el registro' });
        }
        res.json({ mensaje: 'Registro eliminado exitosamente' });
    });
});


app.put('/usuarios/:Id', function(req, res) {
    const userId = req.params.Id; 

    const { numeroClte, nombreClte, fechaNaciClte, celularClte, correoClte, placaCar, modeloCar, cilindrajeCar, marcaCar, colorCar, tipoVehiculo, fecha } = req.body;

    if (!numeroClte || !nombreClte || !fechaNaciClte || !celularClte || !correoClte || !placaCar || !modeloCar || !cilindrajeCar || !marcaCar || !colorCar || !tipoVehiculo || !fecha) {
        return res.status(400).json({ mensaje: 'Faltan datos para actualizar' });
    }

    const query = `UPDATE datosclientes SET 
        numeroClte = ?, 
        nombreClte = ?,
        fechaNaciClte = ?,
        celularClte = ?,
        correoClte = ?, 
        placaCar = ?, 
        modeloCar = ?,
        cilindrajeCar = ?,
        marcaCar = ?,
        colorCar = ?,
        tipoVehiculo = ?, 
        fecha = ? 
        WHERE idCliente = ?`;

    const values = [numeroClte, nombreClte, fechaNaciClte, celularClte, correoClte, placaCar, modeloCar, cilindrajeCar, marcaCar, colorCar, tipoVehiculo, fecha, userId];

    // Ejecutar la consulta
    conexion.query(query, values, function(error, resultados) {
        if (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al actualizar los datos' });
        }
        res.json({ mensaje: 'Datos actualizados exitosamente' });
    });
});


//Consulta a la base de datos formulario2
app.post('/consultaFormularioDos', function(req, res) {
    const datosEmp = req.body;

    let numeroComp = datosEmp.numeroNit;
    let nombreComp = datosEmp.nombreEmpresa;
    let fechaIngreso = datosEmp.fechaActual;
    let estadoComp = datosEmp.estadoEmpresa;
    let celularComp = datosEmp.celularEmpresa;
    let correoComp = datosEmp.correoEmpresa;
    let ivaComp = datosEmp.ivaEmpresa;
    let personaComp = datosEmp.tipoPersonaEmp;

    let nombrePose = datosEmp.nombreDue;
    let direccionPose = datosEmp.direccionDue;
    let numeroCodDepart = datosEmp.codigoDepar;
    let placaAtm = datosEmp.placaVehi;
    let modeloAtm = datosEmp.modeloVehi;
    let cilindrajeAtm = datosEmp.cilindrajeVehi;
    let marcaAtm = datosEmp.marcaVehi;
    let colorAtm = datosEmp.colorVehi;
    let tipoAtm = datosEmp.tipoVehi;
    let ocupacionPose = datosEmp.ocupacionDue;

    let registroEmpresa = "INSERT INTO `datosempresa` (numeroEmp, nombreEmp, fechaActual, estadoEmp, celularEmp, correoEmp, ivaEmpresa, tipoPersonaEmp, nombreTit, direccionTit, codDepartamento, placaAuto, modeloAuto, cilindrajeAuto, marcaAuto, colorAuto, tipoVehiculoEmp, ocupacionTit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    let valoresEmpresa = [numeroComp, nombreComp, fechaIngreso, estadoComp, celularComp, correoComp, ivaComp, personaComp, nombrePose, direccionPose, numeroCodDepart, placaAtm, modeloAtm, cilindrajeAtm, marcaAtm, colorAtm, tipoAtm, ocupacionPose];

    conexion.query(registroEmpresa, valoresEmpresa, function(error) {
        if (error) {
            console.error(error);
        } else {
            console.log("Datos de la empresa guardados con exito");
        }
    });
});

app.get('/obtenerDatosEmpresas', function(req, res) {
    const consulta = "SELECT * FROM datosempresa"; 

    conexion.query(consulta, function(error, resultados) {
        if (error) {
            console.error(error);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.json({
                total: resultados.length,
                empresas: resultados
            }); 
        }
    });
});

app.delete('/eliminarDatosEmpresas/:id', function(req, res) {
    const idEmpresa = req.params.id; // Obtiene el ID de la empresa desde la URL

    const consulta = "DELETE FROM datosempresa WHERE idEmpresa = ?"; // Ajusta el nombre del campo según tu base de datos

    conexion.query(consulta, [idEmpresa], function(error, resultados) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al eliminar el registro');
        }

        if (resultados.affectedRows > 0) {
            res.status(200).send('Registro eliminado con éxito');
        } else {
            res.status(404).send('Registro no encontrado');
        }
    });
});


app.put('/editarDatosEmpresas/:id', function(req, res) {
    const idEmpresa = req.params.id;
    const { columna, valor } = req.body; // Obtener la columna y el nuevo valor

    // Asegúrate de que la columna sea válida para evitar inyecciones SQL
    const validColumns = ['numeroEmp', 'nombreEmp', 'fechaActual', 'celularEmp', 'correoEmp', 'ivaEmpresa', 'tipoPersonaEmp', 'placaAuto', 'modeloAuto', 'cilindrajeAuto', 'marcaAuto', 'colorAuto', 'tipoVehiculoEmp', 'fecha']; // Agrega aquí las columnas que permitas editar
    if (!validColumns[columna]) {
        return res.status(400).send('Columna no válida');
    }

    const consulta = `UPDATE datosempresa SET ${validColumns[columna]} = ? WHERE idEmpresa = ?`;
    conexion.query(consulta, [valor, idEmpresa], function(error, resultados) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error al actualizar el registro');
        }

        res.status(200).send('Registro actualizado con éxito');
    });
});





// app.post('/validar', function(req,res){
//     const datos = req.body;

//     let numeroUs = datos.numero;
//     let nombreUs = datos.nombreUsr;
//     let generoUs = datos.genero;
//     let fechaUs = datos.fecha;
//     let tipoUs = datos.sangre;

//     let nombreMa = datos.nombre;
//     let direccionMa = datos.direccion;
//     let codigoMa = datos.codigo;
//     let placaVeh = datos.placa;
//     let vehiculoMa = datos.vehiculo;
//     let fechaActu = datos.fechaHora;

//     let nuevoRegistro = "INSERT INTO datosformulario (numeroCedula, nombreUsr, genero, fechaNaci, tipoSangre, nombreProp, direccion, codigoDepto, placa, tipoVehiculo, fecha) VALUES('"+numeroUs+"', '"+nombreUs+"', '"+generoUs+"', '"+fechaUs+"', '"+tipoUs+"', '"+nombreMa+"', '"+direccionMa+"', '"+codigoMa+"', '"+placaVeh+"', '"+vehiculoMa+"', '"+fechaActu+"')";
//     conexion.query(nuevoRegistro, function(error){
//         if (error){
//             throw error;
//         } else {
//             console.log("Datos guardados en DB");
//         }
//     });
// });


// app.post('/validar', function(req,res){
//     const datos = req.body;

//     console.log(datos);
// });


//Asignación del puerto
app.listen(3000, function() {
    console.log("Servidor corriendo en el puerto http://localhost:3000");
});