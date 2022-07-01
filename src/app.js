//? Dependencies
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
const multer = require('multer')

//? Import files
const config = require('./config')
const transporter = require('./tools/email')


//? import routes
const usersRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
const customerRouter = require('./customers/customers.routes').router
//? Initial configuration
const app = express()

// Enable incoming JSON data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

//! manejo de carga de arrchivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads')
    },
    filename: (req, file, cb) =>{
        cb(null,Date.now() + file.originalname)
    }
})
const upload = multer({storage})

if(config.nodeEnv === 'development'){
    app.use(morgan("dev"))
}else {
    app.use(morgan("combined"))
}

app.get("/", (req, res) =>{
    res.status(200).json({message: "Esta es la base"})
})

//* Routes
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/customer", customerRouter)
/*
app.get("/test", (req, res) =>{
    console.log(req.query)
    res.status(200).json(req.query)
})
*/
app.use("/docs", swagger.serve, swagger.setup(swaggerJson))

//! asi se mandan correos
app.get('/email', (req, res)=>{
    transporter.transporter.sendMail({
        subject: 'Este es mi Hola mundo',
        text: "Hello world",
        to: "alejandroalivier20@gmail.com",
        from: "testacademlo@gmail.com"
    })
    res.status(200).json({
        message: "Email send"
    })
})

app.post('/upload', upload.single('image'), (req, res) =>{
    try {
        res.status(201).send(req.file)
    } catch (err) {
        res.status(400).json({message: "error"})
    }
})
app.get('/files/:name', (req, res) =>{
    res.sendFile(__dirname + `/uploads/${req.params.name}`)
})

app.listen(config.port, () => {
   //! console.log(`Server started at port ${config.port}`)
})

module.exports = {
    app
}