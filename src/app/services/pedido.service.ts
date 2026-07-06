import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs que mapean exactamente lo que espera tu PedidoController
export interface LineaPedidoDTO {
  productoId: number;
  cantidad: number;
}

export interface PedidoRequestDTO {
  usuarioId: number;
  lineas: LineaPedidoDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pedidos';
  private apiUsuariosUrl = 'http://localhost:8080/api/usuarios';

  crearPedido(pedido: PedidoRequestDTO): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  // Llama al endpoint de historial que armamos en el UsuarioController
  obtenerHistorialUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUsuariosUrl}/${usuarioId}/pedidos`);
  }
}