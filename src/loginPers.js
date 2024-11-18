const express = require('express');
const router = express.Router();
const db = require('./conexion'); // Ajusta la ruta si es necesario

// Función para iniciar sesión
const loginUser = async (username, password) => {
    try {
        const query = 'SELECT * FROM personasregistradas WHERE nombrePersRegis = ?';
        const results = await new Promise((resolve, reject) => {
            db.query(query, [username], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        console.log('Resultados de la consulta:', results);

        if (results.length > 0) {
            const user = results[0];
            console.log('Contraseña de la base de datos:', user.contraseniaPersRegis);
            console.log('Contraseña ingresada:', password);
            if (user.contraseniaPersRegis === password) {
                return { success: true, user, message: 'Inicio de sesión correcto' };
            }
        }
        return { success: false, message: 'Credenciales incorrectas' };
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { success: false, message: 'Error en el servidor' };
    }
};

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { nombrePers, contraPers } = req.body; // Asegúrate de que los nombres coincidan con los del formulario

    // console.log('Datos recibidos:', { nombrePers, contraPers });
    const result = await loginUser(nombrePers, contraPers);
    
    if (result.success) {
        // Si las credenciales son correctas, redirige al formulario
        // return res.redirect('/formulario1');
        return res.json({ success: true, message: 'Inicio de sesión correcto'});
    } else {
        // return res.status(401).json({ message: result.message });
        return res.status(401).json({ success: false, message: result.message });
    }
});

module.exports = router;


//Ruta para crear nuevo usuario
// Ruta para crear un nuevo usuario
router.post('/crear-usuario', async (req, res) => {
    const { nuevaPer, nuevaContra } = req.body;

    // Validar que los campos no estén vacíos
    if (!nuevaPer || !nuevaContra) {
        return res.status(400).json({ success: false, message: 'Usuario y contraseña son requeridos' });
    }

    try {
        // Validar si el usuario ya existe
        const existingUserQuery = 'SELECT * FROM personasregistradas WHERE nombrePersRegis = ?';
        const existingUsers = await new Promise((resolve, reject) => {
            db.query(existingUserQuery, [nuevaPer], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        if (existingUsers.length > 0) {
            return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }

        // Insertar nuevo usuario en la base de datos (sin encriptar la contraseña)
        const query = 'INSERT INTO personasregistradas (nombrePersRegis, contraseniaPersRegis) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(query, [nuevaPer, nuevaContra], (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });

        res.status(201).json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Ruta para eliminar un usuario
// router.post('/eliminar-usuario', async (req, res) => {
//     const { nombreEliminar } = req.body;

//     // Validar que el nombre no esté vacío
//     if (!nombreEliminar) {
//         return res.status(400).json({ success: false, message: 'El nombre del usuario es requerido' });
//     }

//     try {
//         const query = 'DELETE FROM personasregistradas WHERE nombrePersRegis = ?';
//         await new Promise((resolve, reject) => {
//             db.query(query, [nombreEliminar], (error, results) => {
//                 if (error) {
//                     return reject(error);
//                 }
//                 resolve();
//             });
//         });

//         res.json({ success: true, message: 'Usuario eliminado exitosamente' });
//     } catch (error) {
//         console.error('Error al eliminar el usuario:', error);
//         res.status(500).json({ success: false, message: 'Error en el servidor' });
//     }
// });

// Ruta para eliminar un usuario
router.post('/eliminar-usuario', async (req, res) => {
    const { nombreEliminar } = req.body;

    // Validar que se haya proporcionado un nombre de usuario
    if (!nombreEliminar) {
        return res.status(400).json({ success: false, message: 'Se requiere un nombre de usuario.' });
    }

    try {
        // Verificar si el usuario existe
        const existingUserQuery = 'SELECT * FROM personasregistradas WHERE nombrePersRegis = ?';
        const existingUsers = await new Promise((resolve, reject) => {
            db.query(existingUserQuery, [nombreEliminar], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        // Si el usuario no existe, retornar un mensaje de error
        if (existingUsers.length === 0) {
            return res.status(404).json({ success: false, message: 'El usuario no existe.' });
        }

        // Eliminar el usuario de la base de datos
        const query = 'DELETE FROM personasregistradas WHERE nombrePersRegis = ?';
        await new Promise((resolve, reject) => {
            db.query(query, [nombreEliminar], (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });

        res.status(200).json({ success: true, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});



