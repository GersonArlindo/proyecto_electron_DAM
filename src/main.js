const { BrowserWindow } = require('electron') //Nos permite pintar una ventana por pantalla
const { getConnection } = require('./database') //Importamos la funcion de coneccion


async function createProduct(product) { //Funcion que nos servira mas adelante para registrar un producto
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price) //Conversion del precio del producto
        const result = await conn.query('INSERT INTO product SET ?', product)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
//CREANDO LA VENTANA
let window
function createWindow() { //Cuando se llame creara una nueva instancia de BrowserWindow
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true

        }
    })
    window.loadFile('src/ui/index.html'); //ruta de Archivo index.html para crear la ventana
}

module.exports = { //Vamos a exportar la funcion para que sea utilizada en otros lados 
    createWindow,
    createProduct
}