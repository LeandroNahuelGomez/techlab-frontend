import { Producto } from "./producto.interface"; 

export interface LineaPedido {
    id?:number;
    cantidad: number;
    subtotal: number;
    producto: Producto;
}