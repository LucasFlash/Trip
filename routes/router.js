const express = require('express')
const router = express.Router()

const conexion = require('../database/db')

const authController = require('../controllers/authController')


router.get('/', (req, res)=>{
    res.render('index')
})

//router para las vistas
router.get('/sesion', authController.isAuthenticated, (req, res)=>{    
    res.render('sesion', {user:req.user})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})
/////////////////////////////////////////////////////////////////////
//Rutas para creacion de Reseñas
router.get('/gas', authController.isAuthenticated_1, (req, res)=>{    
    res.render('gas', {results:req.results})
})

router.get('/hot', authController.isAuthenticated_2, (req, res)=>{    
    res.render('hot', {results:req.results})
})


router.get('/esp', authController.isAuthenticated_3, (req, res)=>{    
    res.render('esp', {results:req.results})
})

router.get('/dep', authController.isAuthenticated_4, (req, res)=>{    
    res.render('dep', {results:req.results})
})

router.get('/pp', authController.isAuthenticated_5, (req, res)=>{    
    res.render('pp', {results:req.results})
})
//////////////////////////////////////////////////////////////////////



//Rutas para visualizacion de reseñas

router.get('/gas0', authController.gas0, (req, res)=>{     
    res.render("gas0", {results:req.results})
})

router.get('/hot0', authController.hot0, (req, res)=>{     
    res.render("hot0", {results:req.results})
})

router.get('/esp0', authController.esp0, (req, res)=>{     
    res.render("esp0", {results:req.results})
})

router.get('/dep0', authController.dep0, (req, res)=>{     
    res.render("dep0", {results:req.results})
})

router.get('/pp0', authController.pp0, (req, res)=>{     
    res.render("pp0", {results:req.results})
})

//router para los métodos del controller

router.post('/gas', authController.create_gas)
router.post('/hot', authController.create_hot)
router.post('/esp', authController.create_esp)
router.post('/dep', authController.create_dep)
router.post('/pp', authController.create_pp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

//Metodo de registracion
router.post('/register', authController.register)



module.exports = router