import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initBaseDeDatos } from './bd/init.js'

try {
    await initBaseDeDatos()

    const PORT = process.env.PORT || 3001

    app.listen(PORT, '0.0.0.0',() => {
        console.log('URL en Railway: https://backend-pedidos-production-cd92.up.railway.app')
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    })

} catch (err) {
    console.error('Error conectando a la Base de Datos:', err)
}