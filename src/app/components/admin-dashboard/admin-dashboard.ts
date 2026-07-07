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
    this.productoService.listarProductos().subscribe(datos => {
      this.productos.set(datos);
    });
  }

  eliminarProducto(id: number) {
    Swal.fire({
      title: '¿Modificar estado?',
      text: "El producto será deshabilitado (borrado lógico).",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Sí, deshabilitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Cambiando estado al producto con ID:', id);
        // Aquí llamaremos al servicio en el próximo paso

        Swal.fire(
          '¡Modificado!',
          'El estado del producto ha sido actualizado.',
          'success'
        );
      }
    });
  }
}