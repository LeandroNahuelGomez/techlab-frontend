import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductosComponent implements OnInit {
  // MOCK DATA: Datos falsos temporales para poder diseñar la vista
  // productos = [
  //   { id: 1, nombre: 'Notebook Samsung', descripcion: 'Intel Core i7, 16GB RAM', precio: 1200, imagenUrl: 'https://res.cloudinary.com/drir5t1cw/image/upload/v1755801234/cld-sample-4.jpg', stock: 5 },
  //   { id: 2, nombre: 'iPhone 13', descripcion: '128GB, Color Medianoche', precio: 800, imagenUrl: 'https://res.cloudinary.com/drir5t1cw/image/upload/v1755801234/cld-sample-4.jpg', stock: 10 },
  //   { id: 3, nombre: 'Teclado Mecánico', descripcion: 'Switches Blue, RGB', precio: 100, imagenUrl: 'https://res.cloudinary.com/drir5t1cw/image/upload/v1755801234/cld-sample-4.jpg', stock: 2 }
  // ];


  productos = signal<Producto[] | null>(null);

  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  constructor(){}

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        console.log('Productos en el signal:', this.productos());
      },
      error: (err) => {
        console.error("Error al traer los productos de la BD; ", err)
        // Si hay error, lo seteamos como arreglo vacío para que también muestre el mensaje
        this.productos.set([]);
      }
    })
  }

  agregarAlCarrito(producto: any): void {
    this.carritoService.agregarProducto(producto.id, producto.nombre, producto.precio, 1);
    alert(`${producto.nombre} agregado al carrito!`);
    // Más tarde aquí llamaremos al CarritoService
  }

}
