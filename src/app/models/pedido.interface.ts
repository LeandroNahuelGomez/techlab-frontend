import { EstadoPedido } from './estado-pedido.enum';
import { LineaPedido } from './linea-pedido.interface';

export interface Pedido {
  id?: number;
  fecha: string; 
  estado: EstadoPedido;
  total: number;
  listaLineas: LineaPedido[]; 
}