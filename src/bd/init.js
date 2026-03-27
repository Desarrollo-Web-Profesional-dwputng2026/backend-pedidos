import mongoose from "mongoose";

export async function initBaseDeDatos() {
    console.log('🚀 Iniciando conexión a MongoDB...');
    
    const DATABASE_URL = process.env.DATABASE_URL;
    
    if (!DATABASE_URL) {
        throw new Error('❌ DATABASE_URL no está configurada');
    }
    
    // Mostrar URL ocultando contraseña
    const urlPreview = DATABASE_URL.replace(/\/\/(.*)@/, '//***:***@');
    console.log('🔗 Conectando a:', urlPreview);
    
    // Configuración SIMPLIFICADA - sin opciones obsoletas
    const options = {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 30000,
        family: 4, // Forzar IPv4
        retryWrites: true,
        retryReads: true,
        maxPoolSize: 10
    };
    
    console.log('⚙️ Opciones:', options);
    
    mongoose.connection.on("error", (error) => {
        console.error("❌ Error de conexión:", error.message);
    });
    
    mongoose.connection.on("connected", () => {
        console.log("✅ Conectado exitosamente a MongoDB Atlas");
    });
    
    try {
        console.log('🔄 Conectando...');
        await mongoose.connect(DATABASE_URL, options);
        console.log("✅ ¡Conexión exitosa!");
        return mongoose.connection;
    } catch (error) {
        console.error("❌ Error:", error.message);
        throw error;
    }
}