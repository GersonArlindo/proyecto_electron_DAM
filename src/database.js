const mysql = require('promise-mysql') //Modulo que permite conectarnos a mysql


const connection = mysql.createConnection({ //pasamos las propiedades en un objeto
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electrondb'
})

//FUNCION para reutilizar la coneccion mas adelante
function getConnection(){
    return connection;
}

//EXPORTAMOS LA funcion para importarla en otros archivos
module.exports = {getConnection}