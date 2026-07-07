import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth/login';

  // Signal reactivo para saber quién está logueado en toda la app
  usuarioActual = signal<any | null>(this.obtenerUsuarioDelStorage());

  login(credenciales: any) {
    return this.http.post<any>(this.apiUrl, credenciales).pipe(
      tap(usuario => {
        // Guardamos en localStorage para no perder la sesión al apretar F5
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('techlab_user', JSON.stringify(usuario));
        }
        // Actualizamos el Signal
        this.usuarioActual.set(usuario);
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('techlab_user');
    }
    this.usuarioActual.set(null);
  }

  private obtenerUsuarioDelStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userGuardado = localStorage.getItem('techlab_user');
      return userGuardado ? JSON.parse(userGuardado) : null;
    }
    return null;
  }
}