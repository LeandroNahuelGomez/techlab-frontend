import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  
  productos = signal<Producto[]>([]);
  private productoService = inject(ProductoService);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    // El admin consume el endpoint que trae activos e inactivos
    this.productoService.listarTodosLosProductos().subscribe(datos => {
      this.productos.set(datos);
    });
  }

  cambiarEstadoProducto(producto: Producto) {
    const accion = producto.activo ? 'deshabilitar' : 'habilitar';
    
    Swal.fire({
      title: `¿Quieres ${accion} este producto?`,
      text: `El producto cambiará su estado en el catálogo público.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: producto.activo ? '#e74c3c' : '#27ae60',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.alternarEstado(producto.id).subscribe({
          next: () => {
            this.cargarProductos(); // Recarga la lista actualizada desde MySQL
            Swal.fire('¡Estado Actualizado!', `El producto fue ${accion}do con éxito.`, 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo cambiar el estado.', 'error');
          }
        });
      }
    });
  }
}