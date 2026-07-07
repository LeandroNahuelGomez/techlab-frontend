import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../../services/producto.service';

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
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      console.log('Eliminando producto con ID:', id);
      // Aquí llamaremos al método DELETE de tu backend más adelante
    }
  }
}