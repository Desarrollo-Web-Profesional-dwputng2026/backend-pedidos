import dotenv from 'dotenv';

console.log('🚀 INICIO DEL SERVIDOR');
console.log('📦 Node.js:', process.version);

// Solo cargar .env en desarrollo
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    console.log('📁 Modo desarrollo');
} else {
    console.log('🌍 Modo producción (Railway)');
}

import { app } from './app.js';
import { initBaseDeDatos } from './bd/init.js';

const startServer = async () => {
    try {
        console.log('🔄 Conectando a base de datos...');
        await initBaseDeDatos();
        
        const PORT = process.env.PORT || 3001;
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Servidor corriendo en puerto ${PORT}`);
        });
        
    } catch (err) {
        console.error('❌ Error fatal:', err.message);
        process.exit(1);
    }
};

startServer();