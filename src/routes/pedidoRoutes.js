import { Router } from "express";
import pedidoController from "../controller/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.get('/', pedidoController.selecionar);
pedidoRoutes.put('/:idPedido', pedidoController.editar); 
pedidoRoutes.delete('/:idPedido', pedidoController.deletar); 

pedidoRoutes.post('/pedidos/:idPedido/itens', pedidoController.criarItens);
pedidoRoutes.put('/itens/:idItemPedido', pedidoController.editarItens);
pedidoRoutes.delete('/itens/:idItemPedido', pedidoController.deletarItens);

export default pedidoRoutes;