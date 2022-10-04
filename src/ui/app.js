const productForm = document.getElementById('productForm')
const { remote } = require('electron') //Esto nos permite comunicar este archivo con el principal main.js
const main = remote.require('./main') //Desde donde va a requerir el archivo

const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const productDescripcion = document.getElementById('descripcion')
const productsList = document.getElementById('products')

//36. Creamos una lista vacia
let products = []


productForm.addEventListener('submit', async (e) =>{
    e.preventDefault(); 
    const newProduct = { //Objeto para enviar los valores de los input
        name: productName.value,
        price: productPrice.value,
        descripcion: productDescripcion.value
    }
    //28. Agregando el newProduct en una variable y convirtiendolo en async await linea 9 y 17
    const result = await main.createProduct(newProduct);
    console.log(result);

    //42. Reseteo del formulario
    productForm.reset();
    productName.focus();

    //41. Llamando a getProducts();
    getProducts();
})

//29. creamos otra funcion getProducts para obtener el producto
const getProducts = async () => {
    //const results = await main.getProducts();
    //console.log(results);

    //37. Lista vacia agregando los productos
    products = await main.getProducts();
    renderProducts(products); //pasando los productos a la funcion renderProductos
}


//44. Creando funcion para deleteProduct
async function deleteProduct(id){
   const response = confirm('Desea eliminar este producto?')
   if(response){
    await main.deleteProduct(id);
    await getProducts();
   }else{
    return;
   }
   
}

//34. Creamos la funcion renderProducts la cual recibira la lista de productos
function renderProducts(products){
    productsList.innerHTML = ''; //limpiar cada que se llame para evitar duplicidad de datos
    products.forEach(product => { //Añadiendo los elementos a la lista para pintarlos
        //Lo colocamos entre comillas oblicuas para poner varias lineas
        productsList.innerHTML += ` 
            <div class="card card-body my-2 animated fadeInLeft">
            <h4>${product.name}</h4>
            <p>${product.descripcion}</p>
            <h3>${product.price}</h3>
            <p>
                <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">
                    Eliminar
                </button>
                <button class="btn btn-secondary">
                    Editar
                </button>
            </p>
            </div>
        `;
    });
}

//getProducts();

//35. agregando la funcion init()
async function init(){
    await getProducts();
}

init();