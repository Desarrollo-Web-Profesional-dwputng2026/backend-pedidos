import dotenv from 'dotenv';

console.log('🚀 INICIO DEL SERVIDOR');
console.log('📦 NODE_VERSION:', process.version);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');

// Solo cargar .env en desarrollo local
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    console.log('📁 Cargando variables desde .env local');
} else {
    console.log('🌍 Usando variables de entorno de Railway');
}

import { app } from './app.js';
import { initBaseDeDatos } from './bd/init.js';

const startServer = async () => {
    try {
        console.log('🔄 Iniciando servidor...');
        
        // Log de variables de entorno
        console.log('🔍 Variables de entorno:');
        console.log('- PORT:', process.env.PORT || '3001');
        console.log('- DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurada' : '❌ No configurada');
        console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Configurada' : '❌ No configurada');
        
        await initBaseDeDatos();
        
        const PORT = process.env.PORT || 3001;
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Servidor corriendo en puerto ${PORT}`);
            console.log(`🌐 http://localhost:${PORT}`);
        });
        
        // Manejar cierre graceful
        process.on('SIGTERM', () => {
            console.log('🛑 SIGTERM recibido, cerrando servidor...');
            server.close(() => {
                console.log('✅ Servidor cerrado');
                mongoose.connection.close();
                process.exit(0);
            });
        });
        
    } catch (err) {
        console.error('❌ Error fatal:', err.message);
        console.error('Stack trace:', err.stack);
        process.exit(1);
    }
};

startServer();