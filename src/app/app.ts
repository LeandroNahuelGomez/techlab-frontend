import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('techlab-frontend');

  // Hacemos el servicio público/accesible para usar su Signal en el HTML
  public authService = inject(AuthService);
  private router = inject(Router);

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
