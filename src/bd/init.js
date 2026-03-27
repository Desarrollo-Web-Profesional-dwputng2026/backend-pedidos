import mongoose from "mongoose";

// Define una función para inicializar la conexión a la base de datos
export async function initBaseDeDatos() {
    // ✅ Usar MONGODB_URI (que es la variable que configuraremos en Railway)
    const DATABASE_URL = process.env.MONGODB_URI || process.env.DATABASE_URL;
    
    // Verificar que la URL existe
    if (!DATABASE_URL) {
        throw new Error('❌ No se encontró MONGODB_URI o DATABASE_URL en las variables de entorno');
    }
    
    console.log('🔌 Conectando a MongoDB...');
    
    // Configura los eventos de conexión de Mongoose
    mongoose.connection.on("error", (error) => {
        console.error("❌ Error de conexión a la Base de Datos:", error);
    });
    
    // Evento para cuando la conexión se abre exitosamente
    mongoose.connection.on("open", () => {
        console.log("✅ Exitosamente Conectado a la Base de Datos");
    });
    
    // Inicia la conexión a la base de datos utilizando Mongoose
    const conexion = await mongoose.connect(DATABASE_URL);
    return conexion;
}