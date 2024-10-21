const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

// Ruta para manejar la consulta del RUT
router.post('/consultar-rut', async (req, res) => {
    const { nit } = req.body;

    try {
        const data = await obtenerDatosNIT(nit);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error al consultar RUT');
    }
});

// Función para consultar el RUT usando Puppeteer
async function obtenerDatosNIT(nit) {
    const browser = await puppeteer.launch({ headless: false }); // Muestra el navegador
    const page = await browser.newPage();

    try {
        await page.goto('https://muisca.dian.gov.co/WebRutMuisca/DefConsultaEstadoRUT.faces', { waitUntil: 'networkidle0' });
        console.log('Navegación exitosa: página cargada');

        // Esperar a que el campo de NIT esté disponible y escribir en él
        const nitInputSelector = 'input#vistaConsultaEstadoRUT\\:formConsultaEstadoRUT\\:numNit';
        await page.waitForSelector(nitInputSelector);
        await page.type(nitInputSelector, nit);
        console.log('NIT ingresado en el campo');

        // Clic en el botón de búsqueda
        const buscarButtonSelector = 'input#vistaConsultaEstadoRUT\\:formConsultaEstadoRUT\\:btnBuscar';
        await page.waitForSelector(buscarButtonSelector);
        await page.click(buscarButtonSelector);
        console.log('Clic en el botón de búsqueda realizado');

        // Esperar a que la navegación se complete después del clic
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        // Obtener los datos de la página
        const razonSocial = await page.evaluate(() => {
            return document.querySelector('#vistaConsultaEstadoRUT\\:formConsultaEstadoRUT\\:razonSocial').innerText;
        });

        // const fechaActual = await page.evaluate(() => {
        //     const fechaElement = document.querySelector('td.tipoFilaNormalVerde');
        //     return fechaElement ? fechaElement.innerText : 'Fecha no encontrada';
        // });

        const estado = await page.evaluate(() => {
            return document.querySelector('span#vistaConsultaEstadoRUT\\:formConsultaEstadoRUT\\:estado').innerText;
        });

        console.log('Datos obtenidos:');
        console.log('Razón Social:', razonSocial);
        // console.log('Fecha Actual:', fechaActual);
        console.log('Estado:', estado);

        return { razonSocial, estado };

    } catch (error) {
        console.error('Error en la navegación o al interactuar con los elementos:', error);
        throw error; // Lanza el error para que pueda ser manejado en la ruta
    } finally {
        await browser.close();
    }
}

module.exports = router;




