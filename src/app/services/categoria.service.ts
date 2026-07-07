import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/categorias';

  // Trae solo activos (Catálogo cliente)
  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}