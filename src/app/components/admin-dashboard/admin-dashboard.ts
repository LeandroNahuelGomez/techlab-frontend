import { Component, OnInit, inject, signal,computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../../services/producto.service';
import Swal from 'sweetalert2';
import { CloudinaryService } from '../../services/cloudinary.service';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  productos = signal<Producto[]>([]);
  categorias = signal<any[]>([]);
  mostrarFormulario = signal(false);
  modoEdicion = signal(false);
  cargando = signal(false);
  productoActual = signal<any>({ nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', activo: true, categoria: { id: null } });

  archivoSeleccionado: File | null = null;

  private productoService = inject(ProductoService);
  private cloudinaryService = inject(CloudinaryService);
  private categoriaService = inject(CategoriaService)

productosSinStock = computed(() => 
  this.productos().filter(p => p.stock === 0).length
);

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias.set(data);
    })
  }

  cargarProductos() {
    // El admin consume el endpoint que trae activos e inactivos
    this.productoService.listarTodosLosProductos().subscribe({
      next: (datos) => {
        console.log("Productos recibidos", datos);
        this.productos.set(datos);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // --- MÉTODOS DE INTERFAZ ---
  abrirNuevo() {
    this.modoEdicion.set(false);
    this.productoActual.set({
      nombre: '', descripcion: '', precio: 0,
      stock: 0, imagenUrl: '', activo: true,
      categoria: { id: null }
    });
    this.archivoSeleccionado = null;
    this.mostrarFormulario.set(true);
  }

  abrirEditar(prod: Producto) {
    this.modoEdicion.set(true);
    this.productoActual.set({ ...prod });
    this.archivoSeleccionado = null;
    this.mostrarFormulario.set(true);
  }

  cancelar() {
    this.mostrarFormulario.set(false);
  }

  capturarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.archivoSeleccionado = archivo;
    }
  }

  // --- LA LÓGICA PRINCIPAL (Cloudinary + Spring Boot) ---
  guardarProducto() {
    if (this.cargando()) return;
    this.cargando.set(true);

    if (this.archivoSeleccionado) {
      this.cloudinaryService.subirImagen(this.archivoSeleccionado).subscribe({
        next: (resCloudinary) => {
          this.productoActual.update(p => ({ ...p, imagenUrl: resCloudinary.secure_url }));
          this.enviarAlBackend();
        },
        error: () => {
          this.cargando.set(false);
          Swal.fire('Error', 'No se pudo subir la imagen a Cloudinary', 'error');
        }
      });
    } else {
      this.enviarAlBackend();
    }
  }

  private enviarAlBackend() {
    const producto = this.productoActual();
    const esEdicion = this.modoEdicion();

    const peticion = esEdicion
      ? this.productoService.actualizarProducto(producto.id, producto)
      : this.productoService.crearProducto(producto);

    peticion.subscribe({
      next: () => {
        this.cargando.set(false);
        this.mostrarFormulario.set(false);
        this.cargarProductos();
        Swal.fire('¡Éxito!', `El producto fue ${esEdicion ? 'actualizado' : 'creado'}.`, 'success');
      },
      error: () => {
        this.cargando.set(false);
        Swal.fire('Error', 'Error al guardar en la base de datos', 'error');
      }
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
            this.cargarProductos();
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