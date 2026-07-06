import { Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos';
import { CarritoComponent } from './components/carrito/carrito';
import { HistorialPedidosComponent } from './components/historial-pedidos/historial-pedidos';
export const routes: Routes = [
  { path: 'productos', component: ListaProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedidos', component: HistorialPedidosComponent },
  { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: 'productos' } // Si escriben cualquier verdura, van a productos
];