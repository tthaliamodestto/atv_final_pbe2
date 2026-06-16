import express from 'express';
import produtoRoutes from './routes/produtoRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

const app = express();
app.use(express.json());

// Vinculando as rotas
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/pedidos', pedidoRoutes);

// Seus arquivos de imagem estática (se necessário)
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));