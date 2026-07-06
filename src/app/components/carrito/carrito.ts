import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent implements OnInit {
  // MOCK DATA: Simulamos que el usuario ya eligió estos productos
  itemsCarrito = [
    { productoId: 1, nombreVisual: 'Notebook Samsung', precioVisual: 1200, cantidad: 1 },
    { productoId: 3, nombreVisual: 'Teclado Mecánico', precioVisual: 100, cantidad: 2 }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Getter para calcular el total dinámicamente en el HTML
  get totalCarrito(): number {
    return this.itemsCarrito.reduce((acc, item) => acc + (item.precioVisual * item.cantidad), 0);
  }

  eliminarItem(productoId: number): void {
    console.log('Eliminar item ID:', productoId);
    this.itemsCarrito = this.itemsCarrito.filter(item => item.productoId !== productoId);
  }

  confirmarCompra(): void {
    console.log('Enviando compra al backend...');
    alert('Compra confirmada! (Simulación)');
    // Más tarde aquí armaremos el PedidoRequestDTO y llamaremos al PedidoService
  }
}