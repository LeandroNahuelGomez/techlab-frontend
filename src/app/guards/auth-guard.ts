import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const usuario = authService.usuarioActual();

  // 1. Si ni siquiera está logueado, va al Login
  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Verificamos si la ruta exige un rol específico (ej: ADMIN)
  const rolRequerido = route.data['rol'];
  
  if (rolRequerido && usuario.rol !== rolRequerido) {
    // Si está logueado pero no es Admin, lo mandamos al catálogo común
    alert('Acceso denegado: No tienes permisos de administrador.');
    router.navigate(['/productos']);
    return false;
  }

  // Si pasa todas las pruebas, se le permite el acceso
  return true;
};
