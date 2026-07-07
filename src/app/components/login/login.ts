import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Fundamental para el ngModel
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  
  credenciales = {
    email: '',
    password: ''
  };

  errorMensaje: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  // --- BOTONES DE DEMOSTRACIÓN RÁPIDA ---
  cargarAdmin() {
    this.credenciales.email = 'admin@techlab.com';
    this.credenciales.password = 'admin123';
  }

  cargarCliente() {
    this.credenciales.email = 'cliente@techlab.com';
    this.credenciales.password = 'cliente123';
  }

  // --- LÓGICA DE LOGIN ---
  iniciarSesion() {
    this.errorMensaje = '';
    
    this.authService.login(this.credenciales).subscribe({
      next: (usuario) => {
        // Si el login es exitoso, lo mandamos al catálogo
        alert(`¡Bienvenido ${usuario.nombre}! Has ingresado como ${usuario.rol}`);
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.errorMensaje = 'Correo o contraseña incorrectos.';
        console.error(err);
      }
    });
  }
}