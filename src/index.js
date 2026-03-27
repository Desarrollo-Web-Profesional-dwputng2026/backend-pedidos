import dotenv from 'dotenv';

console.log('🚀 INICIO DEL SERVIDOR');
console.log('📦 Node.js:', process.version);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

import { app } from './app.js';
import { initBaseDeDatos } from './bd/init.js';

const startServer = async () => {
    try {
        console.log('🔄 Conectando a base de datos...');
        await initBaseDeDatos();
        
        const PORT = process.env.PORT || 3001;
        
        console.log(`📡 Intentando iniciar en puerto ${PORT}`);
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Servidor corriendo en puerto ${PORT}`);
            console.log(`🌐 Escuchando en: 0.0.0.0:${PORT}`);
        });
        
        server.on('error', (error) => {
            console.error('❌ Error en servidor:', error);
            process.exit(1);
        });
        
    } catch (err) {
        console.error('❌ Error fatal:', err);
        process.exit(1);
    }
};

startServer();