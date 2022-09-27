const {createWindow}  = require('./main') //Requerimos el main.js y llamamos la funcion
const {app} = require('electron') //este evento de elentron es para que no de error a la hora de ejecutar
require('./database') //Requerimos el archivo de coneccion que aun no esta creado pero crearemos mas adelante
require('electron-reload')(__dirname) //requerimos electron reload para que recargue cada que se haga un cambio
app.whenReady().then(createWindow); //ejecutamos

