const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')


//procedimiento para registrarnos
exports.register = async (req, res)=>{    
    try {
        const email = req.body.email
        const user = req.body.user
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8) 
        const fecha_nac = req.body.fecha_nac
        const sex = req.body.sex
        const pais_origen = req.body.pais_origen
        const interes = req.body.interes   
          
        conexion.query('INSERT INTO usuario SET ?', {user:user, email:email,
             pass:passHash, fecha_nac:fecha_nac, id_sex:sex, id_pais_origen:pais_origen, id_interes:interes}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/login')
        })
    } catch (error) {
        console.log(error)
    }       
}

//procedimiento para registrarnos crear resena



exports.create_gas = async (req, res)=>{    
    try {
        const id_usuario = req.body.id_usuario
        const sitio = req.body.sitio
        const descripcion = req.body.descripcion
        const ranking = req.body.ranking

          
        conexion.query('INSERT INTO resena SET ?', {id_usuario:id_usuario, id_sitio:sitio, id_rubro:"1",
         descripcion:descripcion, ranking:ranking}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/sesion')
        })
    } catch (error) {
        console.log(error)
    }       
}

exports.create_hot = async (req, res)=>{    
    try {
        const id_usuario = req.body.id_usuario
        const sitio = req.body.sitio
        const descripcion = req.body.descripcion
        const ranking = req.body.ranking

          
        conexion.query('INSERT INTO resena SET ?', {id_usuario:id_usuario, id_sitio:sitio, id_rubro:"2",
         descripcion:descripcion, ranking:ranking}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/sesion')
        })
    } catch (error) {
        console.log(error)
    }       
}

exports.create_esp = async (req, res)=>{    
    try {
        const id_usuario = req.body.id_usuario
        const sitio = req.body.sitio
        const descripcion = req.body.descripcion
        const ranking = req.body.ranking

          
        conexion.query('INSERT INTO resena SET ?', {id_usuario:id_usuario, id_sitio:sitio, id_rubro:"3",
         descripcion:descripcion, ranking:ranking}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/sesion')
        })
    } catch (error) {
        console.log(error)
    }       
}

exports.create_dep = async (req, res)=>{    
    try {
        const id_usuario = req.body.id_usuario
        const sitio = req.body.sitio
        const descripcion = req.body.descripcion
        const ranking = req.body.ranking

          
        conexion.query('INSERT INTO resena SET ?', {id_usuario:id_usuario, id_sitio:sitio, id_rubro:"4",
         descripcion:descripcion, ranking:ranking}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/sesion')
        })
    } catch (error) {
        console.log(error)
    }       
}

exports.create_pp = async (req, res)=>{    
    try {
        const id_usuario = req.body.id_usuario
        const sitio = req.body.sitio
        const descripcion = req.body.descripcion
        const ranking = req.body.ranking

          
        conexion.query('INSERT INTO resena SET ?', {id_usuario:id_usuario, id_sitio:sitio, id_rubro:"5",
         descripcion:descripcion, ranking:ranking}, (error, results)=>{
            if(error){console.log(error)}
            res.redirect('/sesion')
        })
    } catch (error) {
        console.log(error)
    }       
}



exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuario WHERE user = ?', [user], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user+" id "+id)
                 
                   

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: 'sesion'
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuario WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

// Metodos select para tablas de sitios


exports.isAuthenticated_1 = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query(' SELECT s.id_sitio, s.texto, s.id_rubro, u.id, u.user FROM usuario u CROSS JOIN sitio s WHERE ( u.id = ? AND s.id_rubro = "1" ) ', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.results = results
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}


exports.isAuthenticated_2 = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query(' SELECT s.id_sitio, s.texto, s.id_rubro, u.id, u.user FROM usuario u CROSS JOIN sitio s WHERE ( u.id = ? AND s.id_rubro = "2" ) ', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.results = results
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.isAuthenticated_3 = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query(' SELECT s.id_sitio, s.texto, s.id_rubro, u.id, u.user FROM usuario u CROSS JOIN sitio s WHERE ( u.id = ? AND s.id_rubro = "3" ) ', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.results = results
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.isAuthenticated_4 = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query(' SELECT s.id_sitio, s.texto, s.id_rubro, u.id, u.user FROM usuario u CROSS JOIN sitio s WHERE ( u.id = ? AND s.id_rubro = "4" ) ', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.results = results
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.isAuthenticated_5 = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query(' SELECT s.id_sitio, s.texto, s.id_rubro, u.id, u.user FROM usuario u CROSS JOIN sitio s WHERE ( u.id = ? AND s.id_rubro = "5" ) ', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.results = results
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}


////////////

// Tabla de visualizacion de las reseñas

exports.gas0 = async (req, res)=>{

    conexion.query('SELECT r.id_resena, u.user, s.id_sitio, s.texto, r.descripcion, r.ranking FROM resena r INNER JOIN usuario u ON r.id_usuario = u.id INNER JOIN sitio s ON r.id_sitio = s.id_sitio WHERE r.id_rubro = "1" ',(error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.render('gas0', {results:results});         
        }
});
};

exports.hot0 = async (req, res)=>{

    conexion.query('SELECT r.id_resena, u.user, s.id_sitio, s.texto, r.descripcion, r.ranking FROM resena r INNER JOIN usuario u ON r.id_usuario = u.id INNER JOIN sitio s ON r.id_sitio = s.id_sitio WHERE r.id_rubro = "2" ',(error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.render('hot0', {results:results});         
        }
});
};

exports.esp0 = async (req, res)=>{

    conexion.query('SELECT r.id_resena, u.user, s.id_sitio, s.texto, r.descripcion, r.ranking FROM resena r INNER JOIN usuario u ON r.id_usuario = u.id INNER JOIN sitio s ON r.id_sitio = s.id_sitio WHERE r.id_rubro = "3" ',(error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.render('esp0', {results:results});         
        }
});
};

exports.dep0 = async (req, res)=>{

    conexion.query('SELECT r.id_resena, u.user, s.id_sitio, s.texto, r.descripcion, r.ranking FROM resena r INNER JOIN usuario u ON r.id_usuario = u.id INNER JOIN sitio s ON r.id_sitio = s.id_sitio WHERE r.id_rubro = "4" ',(error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.render('dep0', {results:results});         
        }
});
};

exports.pp0 = async (req, res)=>{

    conexion.query('SELECT r.id_resena, u.user, s.id_sitio, s.texto, r.descripcion, r.ranking FROM resena r INNER JOIN usuario u ON r.id_usuario = u.id INNER JOIN sitio s ON r.id_sitio = s.id_sitio WHERE r.id_rubro = "5" ',(error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.render('pp0', {results:results});         
        }
});
};


exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}