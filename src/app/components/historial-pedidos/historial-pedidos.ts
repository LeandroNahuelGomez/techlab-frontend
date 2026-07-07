import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-pedidos.html',
  styleUrl: './historial-pedidos.css',
})
export class HistorialPedidosComponent implements OnInit {
  // MOCK DATA: Simulamos el JSON que devolverá tu Java
  // historial = [
  //   { id: 101, fecha: '2026-04-20', total: 1400, estado: 'ENTREGADO' },
  //   { id: 105, fecha: '2026-07-06', total: 800, estado: 'CONFIRMADO' }
  // ];
  historial = signal<any[] | null>(null);

  private pedidoService = inject(PedidoService);

  ngOnInit(): void {
    // 3. Simulamos que el usuario logueado es el ID 1 y buscamos sus compras
    this.pedidoService.obtenerHistorialUsuario(1).subscribe({
      next: (datos) => {
        this.historial.set(datos);
      },
      error: (err) => {
        console.error('Error al cargar el historial:', err);
        // Si hay error, seteamos un arreglo vacío para disparar el cartel de "No hay pedidos"
        this.historial.set([]); 
      }
    });
  }
  
  // Método auxiliar para darle color a la etiqueta (Badge) del estado
  getColorEstado(estado: string): string {
    switch (estado) {
      case 'ENTREGADO': return 'green';
      case 'CONFIRMADO': return 'blue';
      case 'PENDIENTE': return 'orange';
      case 'CANCELADO': return 'red';
      default: return 'gray';
    }
  }
}