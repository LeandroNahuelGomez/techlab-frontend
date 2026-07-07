
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  stock: number;
  activo: boolean; // 1. Agregado a la interfaz
  categoria: Categoria
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/productos';

  // Trae solo activos (Catálogo cliente)
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // NUEVO: Trae todos (Panel Admin)
  listarTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/todos`);
  }

  // NUEVO: Envía la petición para cambiar el estado booleano
  alternarEstado(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/toggle`, {});
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, { observe: 'response' });
  }
}