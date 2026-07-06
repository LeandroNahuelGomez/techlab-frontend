import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-pedidos.html',
  styleUrl: './historial-pedidos.css',
})
export class HistorialPedidosComponent implements OnInit {
  // MOCK DATA: Simulamos el JSON que devolverá tu Java
  historial = [
    { id: 101, fecha: '2026-04-20', total: 1400, estado: 'ENTREGADO' },
    { id: 105, fecha: '2026-07-06', total: 800, estado: 'CONFIRMADO' }
  ];

  constructor() {}

  ngOnInit(): void {}
  
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