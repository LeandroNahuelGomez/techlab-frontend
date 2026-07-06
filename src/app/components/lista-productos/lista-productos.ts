import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductosComponent implements OnInit {
  // MOCK DATA: Datos falsos temporales para poder diseñar la vista
  productos = [
    { id: 1, nombre: 'Notebook Samsung', descripcion: 'Intel Core i7, 16GB RAM', precio: 1200, imagenUrl: 'https://res.cloudinary.com/drir5t1cw/image/upload/v1755801234/cld-sample-4.jpg', stock: 5 },
    { id: 2, nombre: 'iPhone 13', descripcion: '128GB, Color Medianoche', precio: 800, imagenUrl: 'https://res.cloudinary.com/drir5t1cw/image/upload/v1755801234/cld-sample-4.jpg', stock: 10 },
    { id: 3, nombre: 'Teclado Mecánico', descripcion: 'Switches Blue, RGB', precio: 100, imagenUrl: 'https://res.cloudinary.com/drir5t1cw/image/upload/v1755801234/cld-sample-4.jpg', stock: 2 }
  ];

  constructor(){}

  ngOnInit(): void {}

  agregarAlCarrito(producto: any): void {
    console.log("Agregando al carrito: ", producto.nombre);
    alert(`${producto.nombre} agregado al carrito!`);
    // Más tarde aquí llamaremos al CarritoService
  }

}
