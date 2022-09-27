const productForm = document.getElementById('productForm')
const { remote } = require('electron') //Esto nos permite comunicar este archivo con el principal main.js
const main = remote.require('./main') //Desde donde va a requerir el archivo

const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const productDescripcion = document.getElementById('descripcion')

productForm.addEventListener('submit', (e) =>{
    e.preventDefault(); 
    const newProduct = { //Objeto para enviar los valores de los input
        name: productName.value,
        price: productPrice.value,
        descripcion: productDescripcion.value
    }
    main.createProduct(newProduct);
})