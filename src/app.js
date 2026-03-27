// backend/src/app.js
import express from 'express'
import cors from 'cors'
import { pedidosRoutes } from './rutas/pedidos.js'
import { usuarioRoutes } from './rutas/usuarios.js'

const app = express()

console.log('🔧 Configurando aplicación...');

// Configuración CORS abierta para pruebas
app.use(cors({
    origin: '*',  // Temporalmente permitir todos
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// RUTAS OBLIGATORIAS - Deben estar ANTES que las demás
app.get('/', (req, res) => {
    console.log('✅ Ruta raíz / llamada');
    res.status(200).json({ 
        status: 'success',
        message: 'API de Pedidos funcionando',
        timestamp: new Date().toISOString(),
        mongodb: 'connected'
    })
})

app.get('/health', (req, res) => {
    console.log('✅ Health check llamado');
    res.status(200).json({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
    })
})

app.get('/test', (req, res) => {
    console.log('✅ Test endpoint llamado');
    res.status(200).json({ message: 'Test exitoso' })
})

// Configurar tus rutas
console.log('📦 Cargando rutas de pedidos...');
pedidosRoutes(app)
console.log('📦 Cargando rutas de usuarios...');
usuarioRoutes(app)

// Middleware para rutas no encontradas
app.use((req, res) => {
    console.log(`⚠️ Ruta no encontrada: ${req.method} ${req.url}`);
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.url 
    })
})

console.log('✅ App configurada completamente');

export { app }