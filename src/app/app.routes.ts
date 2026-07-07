import { Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos';
import { CarritoComponent } from './components/carrito/carrito';
import { HistorialPedidosComponent } from './components/historial-pedidos/historial-pedidos';
import { LoginComponent } from './components/login/login';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  //Rutas protegidas para cualquier usuario logueado
  { path: 'productos', component: ListaProductosComponent, canActivate: [authGuard]},
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard]},
  { path: 'pedidos', component: HistorialPedidosComponent, canActivate: [authGuard]},

  //Ruta super protegida para ADMIN
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard], 
    data: { rol: 'ADMIN' } 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/login' } // Si escriben cualquier verdura, van a productos
];