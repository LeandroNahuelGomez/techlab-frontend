import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrito } from '../../services/carrito.service';
import { CarritoService } from '../../services/carrito.service';
import { PedidoService, PedidoRequestDTO } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoComponent implements OnInit {
  // MOCK DATA: Simulamos que el usuario ya eligió estos productos
  // itemsCarrito = [
  //   { productoId: 1, nombreVisual: 'Notebook Samsung', precioVisual: 1200, cantidad: 1 },
  //   { productoId: 3, nombreVisual: 'Teclado Mecánico', precioVisual: 100, cantidad: 2 }
  // ];
  itemsCarrito = signal<ItemCarrito[]>([]);

  // 2. Signal Computado: reacciona y recalcula automáticamente si itemsCarrito cambia
  totalCarrito = computed(() => {
    return this.itemsCarrito().reduce((acc, item) => acc + (item.precioVisual * item.cantidad), 0);
  });

  private carritoService = inject(CarritoService);
  private pedidoService = inject(PedidoService);

  ngOnInit(): void {
    // Nos suscribimos al servicio y actualizamos nuestro signal
    this.carritoService.carrito$.subscribe(items => {
      this.itemsCarrito.set(items);
    });
  }

  eliminarItem(productoId: number): void {
    this.carritoService.eliminarProducto(productoId);
  }

  confirmarCompra(): void {
    if (this.itemsCarrito().length === 0) return;

    // Armamos el objeto DTO para Spring Boot
    const pedidoNuevo: PedidoRequestDTO = {
      usuarioId: 1, // Usuario simulado (ID 1)
      lineas: this.itemsCarrito().map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad
      }))
    };

    // Enviamos el POST al backend
    this.pedidoService.crearPedido(pedidoNuevo).subscribe({
      next: (respuesta) => {
        Swal.fire({
          title: '¡Compra confirmada!',
          text: 'Tu pedido se procesó correctamente y el stock fue descontado.',
          icon: 'success',
          confirmButtonColor: '#27ae60'
        });
        this.carritoService.limpiarCarrito();
      },
      error: (err) => {
        console.error('Error en la compra:', err);
        Swal.fire({
          title: 'Ups...',
          text: 'Probablemente falta stock o hubo un error de conexión.',
          icon: 'error',
          confirmButtonColor: '#e74c3c'
        });
      }
    });
  }




}