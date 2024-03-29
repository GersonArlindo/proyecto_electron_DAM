const { BrowserWindow, Notification } = require('electron') //Nos permite pintar una ventana por pantalla
const { getConnection } = require('./database') //Importamos la funcion de coneccion


async function createProduct(product) { //Funcion que nos servira mas adelante para registrar un producto
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price) //Conversion del precio del producto
        const result = await conn.query('INSERT INTO product SET ?', product)
        console.log(result)

        //27. Retornando el producto para mostrarlo
        product.id = result.insertId;
        return product;

    } catch (error) {
        console.log(error)
    }
}

//30. Creando la funcion getProducts
async function getProducts() {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM product ORDER BY id DESC')
    console.log(results)
    return results;
}

//43. deleteProduct
async function deleteProduct(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM product WHERE id = ?', id);
    console.log(result)
    return result;
}

//46. getProductById
async function getProductById(id){
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM product WHERE id = ?', id);
    return result[0]; //De toda la lista devuelta solo quiero el primer objeto
}

//50. updateProduct
async function updateProduct(id, product){
    const conn = await getConnection();
    const result = await conn.query('UPDATE product SET ? WHERE id = ?', [product, id]);
    console.log(result)
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
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
}