import mongoose from "mongoose";

export async function initBaseDeDatos() {
    console.log('🚀 Iniciando conexión a MongoDB...');
    
    const DATABASE_URL = process.env.DATABASE_URL;
    const MONGODB_URI = process.env.MONGODB_URI;
    
    // Usar cualquiera de las dos variables
    const url = DATABASE_URL || MONGODB_URI;
    
    console.log('📡 Variables disponibles:');
    console.log('- DATABASE_URL:', DATABASE_URL ? '✅ Presente' : '❌ Ausente');
    console.log('- MONGODB_URI:', MONGODB_URI ? '✅ Presente' : '❌ Ausente');
    console.log('- URL a usar:', url ? '✅ Definida' : '❌ No definida');
    
    if (!url) {
        throw new Error('❌ No hay URL de base de datos configurada');
    }
    
    // Mostrar primeros 50 caracteres de la URL (ocultando contraseña)
    const urlPreview = url.replace(/\/\/(.*)@/, '//***:***@');
    console.log('🔗 URL de conexión (oculta):', urlPreview.substring(0, 80) + '...');
    
    // Configuración de opciones para Railway
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 30000,
        family: 4, // Forzar IPv4
        // Deshabilitar SSL para evitar errores
        ssl: false,
        tls: false,
        // Opciones adicionales
        retryWrites: true,
        retryReads: true,
        maxPoolSize: 10
    };
    
    console.log('⚙️ Opciones de conexión:', {
        ssl: options.ssl,
        tls: options.tls,
        family: options.family,
        serverSelectionTimeoutMS: options.serverSelectionTimeoutMS
    });
    
    mongoose.connection.on("error", (error) => {
        console.error("❌ Evento error de Mongoose:", error.message);
    });
    
    mongoose.connection.on("open", () => {
        console.log("✅ Evento open - Conexión establecida");
    });
    
    mongoose.connection.on("connected", () => {
        console.log("📡 Evento connected - Conectado a MongoDB");
    });
    
    mongoose.connection.on("disconnected", () => {
        console.log("⚠️ Evento disconnected - Desconectado de MongoDB");
    });
    
    try {
        console.log('🔄 Intentando conectar...');
        const conexion = await mongoose.connect(url, options);
        console.log("✅ ¡Conexión exitosa a MongoDB!");
        console.log("📊 Estado de conexión:", mongoose.connection.readyState);
        return conexion;
    } catch (error) {
        console.error("❌ Error detallado en conexión:");
        console.error("- Nombre:", error.name);
        console.error("- Mensaje:", error.message);
        console.error("- Código:", error.code);
        if (error.cause) {
            console.error("- Causa:", error.cause);
        }
        throw error;
    }
}