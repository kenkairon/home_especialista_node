const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')

// Procedimiento para registrarnos
exports.register = async (req, res) => {
    try {
        const name = req.body.user
        const user = req.body.email
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)

        await conexion.query('INSERT INTO usuarios (username,email, pass) VALUES ($1, $2, $3)', [name, user, passHash])
        res.redirect('/login')
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const user = req.body.email
        const pass = req.body.pass

        if (!user || !pass) {
            res.render('login.ejs', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'login'
            })
        } else {
            const results = await conexion.query('SELECT * FROM usuarios WHERE email = $1', [user])
            if (results.rowCount === 0 || !(await bcryptjs.compare(pass, results.rows[0].pass))) {
                res.render('login.ejs', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o Password incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 2000,
                    ruta: 'login'
                })
            } else {
                // Inicio de sesión OK
                const id = results.rows[0].id
                const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                })
                // Generamos el token SIN fecha de expiración
                // const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                console.log("TOKEN: " + token + " para el USUARIO : " + user)

                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions)
                res.render('login.ejs', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡LOGIN CORRECTO!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: 'dashboard'
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            const results = await conexion.query('SELECT * FROM usuarios WHERE id = $1', [decodificada.id])
            if (!results.rowCount) {
                return next()
            }
            req.username = results.rows[0]
            return next()
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/')
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}



