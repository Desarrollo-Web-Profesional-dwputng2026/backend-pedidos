import mongoose from "mongoose";

export async function initBaseDeDatos() {
    console.log('🚀 Iniciando conexión a MongoDB...');
    
    const DATABASE_URL = process.env.DATABASE_URL;
    
    if (!DATABASE_URL) {
        throw new Error('❌ DATABASE_URL no está configurada');
    }
    
    const urlPreview = DATABASE_URL.replace(/\/\/(.*)@/, '//***:***@');
    console.log('🔗 Conectando a:', urlPreview);
    
    // Opciones mínimas para conexión con +srv
    const options = {
        serverSelectionTimeoutMS: 30000
    };
    
    mongoose.connection.on("error", (error) => {
        console.error("❌ Error de Mongoose:", error.message);
    });
    
    mongoose.connection.on("connected", () => {
        console.log("✅ ¡MongoDB Atlas conectado exitosamente!");
    });
    
    try {
        await mongoose.connect(DATABASE_URL, options);
        console.log("✅ Conexión establecida con MongoDB Atlas");
        return mongoose.connection;
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
        throw error;
    }
}