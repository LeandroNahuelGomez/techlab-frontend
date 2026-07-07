import { Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos';
import { CarritoComponent } from './components/carrito/carrito';
import { HistorialPedidosComponent } from './components/historial-pedidos/historial-pedidos';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedidos', component: HistorialPedidosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Si escriben cualquier verdura, van a productos
];