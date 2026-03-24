// backend/src/app.js
import express from 'express'
import cors from 'cors'
import { pedidosRoutes } from './rutas/pedidos.js'
import { usuarioRoutes } from './rutas/usuarios.js'

const app = express()

// ✅ Configuración CORS que acepta múltiples orígenes
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'];

app.use(cors({
    origin: function(origin, callback) {
        // Permitir solicitudes sin origen (como Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Origen bloqueado por CORS:', origin);
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
}))

// Middleware para parsear JSON
app.use(express.json())

// Configurar rutas
pedidosRoutes(app)
usuarioRoutes(app)

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Hola from Express!')
})

export { app }