// rutas/pedidos.js
import {
    creaPedido,
    listaAllPedidos,
    listaPedidosByNombre,
    listPedidosByPagado,
    getPedidoById,
    modificaPedido,
    eliminaPedido
} from '../servicios/pedidos.js'

export function pedidosRoutes(app) {
    // Listar Pedidos con filtros opcionales
    app.get('/api/v1/pedidos', async (req, res) => {
        const { sortBy, sortOrder, nombre, pagado } = req.query
        const opciones = { sortBy, sortOrder }
        try {
            if (nombre && pagado) {
                return res
                    .status(400)
                    .json({ error: 'Consulta por nombre o status, No Ambos' })
            } else if (nombre) {
                return res.json(await listaPedidosByNombre(nombre, opciones))
            } else if (pagado) {
                return res.json(await listPedidosByPagado(pagado, opciones))
            } else {
                return res.json(await listaAllPedidos(opciones))
            }
        } catch (err) {
            console.error('Error listando Pedidos', err)
            return res.status(500).end()
        }
    })
    
    // Obtener un Pedido por ID
    app.get('/api/v1/pedidos/:id', async (req, res) => {
        const { id } = req.params
        try {
            const pedido = await getPedidoById(id)
            if (pedido === null) return res.status(404).end()
            return res.json(pedido)
        } catch (err) {
            console.error('Error Obtiendo un Pedido', err)
            return res.status(500).end()
        }
    })
    
// ✅ CORRECCIÓN: Crear un nuevo Pedido
// ✅ CORRECCIÓN: Crear un nuevo Pedido
app.post('/api/v1/pedidos', async (req, res) => {
    try {
        console.log('='.repeat(50));
        console.log('📥 POST /api/v1/pedidos recibido');
        console.log('📥 Origin:', req.headers.origin);
        console.log('📥 Headers Authorization:', req.headers.authorization);
        console.log('📥 Body:', JSON.stringify(req.body, null, 2));
        
        // Validar datos requeridos
        if (!req.body.nombre || !req.body.telefono || !req.body.fecha_solicitud || !req.body.fecha_envio) {
            console.log('❌ Faltan campos requeridos');
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
        
        const pedido = await creaPedido(req.body)
        console.log('✅ Pedido creado exitosamente:', pedido._id);
        console.log('='.repeat(50));
        
        return res.status(201).json(pedido)
    } catch (err) {
        console.error('❌ Error creando un pedido:', err);
        console.error('❌ Stack:', err.stack);
        return res.status(500).json({ error: err.message })
    }
})
    
    // Modificar un Pedido existente
    app.patch('/api/v1/pedidos/:id', async (req, res) => {
        try {
            const pedido = await modificaPedido(req.params.id, req.body)
            if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' })
            return res.json(pedido)
        } catch (err) {
            console.error('Error modificando Pedido', err)
            return res.status(500).end()
        }
    })
    
    // Eliminar un Pedido por ID
    app.delete('/api/v1/pedidos/:id', async (req, res) => {
        try {
            const { deletedCount } = await eliminaPedido(req.params.id)
            if (deletedCount === 0) return res.sendStatus(404)
            return res.status(204).end()
        } catch (err) {
            console.error('Error Eliminando un Pedido', err)
            return res.status(500).end()
        }
    })
}