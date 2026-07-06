import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrito {
  productoId: number;
  cantidad: number;
  nombreVisual: string;
  precioVisual: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly CART_KEY = 'techlab_carrito';
  
  // Usamos BehaviorSubject para que la UI reaccione en tiempo real
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>(this.obtenerCarritoDelStorage());
  carrito$ = this.carritoSubject.asObservable();

  constructor() { }

  private obtenerCarritoDelStorage(): ItemCarrito[] {
    const carritoGuardado = localStorage.getItem(this.CART_KEY);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }

  private actualizarCarrito(nuevoCarrito: ItemCarrito[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(nuevoCarrito));
    this.carritoSubject.next(nuevoCarrito);
  }

  agregarProducto(productoId: number, nombre: string, precio: number, cantidad: number = 1): void {
    const carritoActual = this.obtenerCarritoDelStorage();
    const itemExistente = carritoActual.find(item => item.productoId === productoId);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carritoActual.push({ productoId, cantidad, nombreVisual: nombre, precioVisual: precio });
    }

    this.actualizarCarrito(carritoActual);
  }

  eliminarProducto(productoId: number): void {
    const carritoActual = this.obtenerCarritoDelStorage();
    const carritoFiltrado = carritoActual.filter(item => item.productoId !== productoId);
    this.actualizarCarrito(carritoFiltrado);
  }

  limpiarCarrito(): void {
    this.actualizarCarrito([]);
  }
}