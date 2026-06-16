import 'dotenv/config';
import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';


import produtoRoutes from './routes/produtoRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use('/', routes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/pedidos', pedidoRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});