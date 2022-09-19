const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()

//Seteamos Motor de Plantillas
app.set('view engine', 'ejs')

//Set Carpeta Public para Archivos Estaticos
app.use(express.static('public'))

//Para Procesar Datos de los Forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Seteamos Variables de Entorno
dotenv.config({path: './env/.env'})

//Seteamos Cookies
app.use(cookieParser())

//Seteamos Rutas
app.use('/', require('./routes/router'))

//Steamos Limpieza de Cache
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//Seteamos INDEX
app.listen(3000, ()=>{
    console.log('SERVER UP runnung in http://localhost:3000')
})