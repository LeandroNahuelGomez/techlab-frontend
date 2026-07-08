# 💻 TechLab E-Commerce - Frontend

Aplicación **Single Page Application (SPA)** desarrollada con **Angular 17** para la plataforma **TechLab E-Commerce**.

El proyecto consume una API REST desarrollada con **Spring Boot**, permitiendo la gestión completa del catálogo de productos, carrito de compras, autenticación por roles y panel de administración.

## 🔗 Repositorio del Backend

https://github.com/LeandroNahuelGomez/techlab-backend

---

# 📸 Vista General

El frontend proporciona una experiencia moderna, reactiva y responsive para dos tipos de usuarios:

- 👤 Cliente
- 👨‍💼 Administrador

Entre las principales funcionalidades se encuentran:

- Inicio de sesión
- Catálogo de productos
- Carrito de compras
- Gestión de pedidos
- Dashboard de administración
- Gestión de productos y categorías
- Carga de imágenes mediante Cloudinary

---

# 🛠️ Tecnologías

- Angular 17
- TypeScript
- Angular Signals
- RxJS
- Angular Router
- Standalone Components
- HTML5
- CSS3
- SweetAlert2
- Cloudinary
- Angular HttpClient

---

# 🏗️ Arquitectura

El proyecto sigue una arquitectura basada en responsabilidades:

```text
src
│
├── app
│   ├── components
│   ├── pages
│   ├── services
│   ├── guards
│   ├── interceptors
│   ├── models
│   ├── shared
│   └── app.routes.ts
│
├── assets
└── environments
```

Se aplican buenas prácticas como:

- Separación entre componentes y servicios.
- Consumo desacoplado de la API.
- Guards para autorización.
- Uso de Signals para el manejo del estado.
- Interfaces fuertemente tipadas.

---

# ✨ Funcionalidades

## 🔐 Autenticación

- Login
- Logout
- Persistencia de sesión
- Protección de rutas
- Guards por rol

---

## 🛍️ Catálogo

- Listado de productos
- Búsqueda
- Filtrado por categorías
- Visualización de detalles

---

## 🛒 Carrito

- Agregar productos
- Modificar cantidades
- Eliminar productos
- Cálculo automático del total
- Confirmación de compra

---

## 📦 Pedidos

- Historial de compras
- Consulta del estado
- Cancelación de pedidos

---

## 👨‍💼 Panel de Administración

- Dashboard
- CRUD de productos
- CRUD de categorías
- Habilitar/Deshabilitar productos
- Carga de imágenes a Cloudinary

---

# 🎨 Características de la interfaz

- Diseño Responsive
- Glassmorphism
- Animaciones suaves
- Feedback visual mediante SweetAlert2
- Navegación sin recarga de página
- Formularios con validaciones

---

# 🚀 Ejecución del proyecto

## Requisitos

Instalar previamente:

- Node.js 20+
- Angular CLI

```bash
npm install -g @angular/cli
```

---

# ⚙️ Configuración

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/techlab-frontend.git
```

Entrar al proyecto

```bash
cd techlab-frontend
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar la API

Modificar la URL del backend en el archivo correspondiente.

Ejemplo:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

---

## 4. Configurar Cloudinary

Completar las credenciales necesarias en el servicio correspondiente.

Ejemplo:

```typescript
cloudName = "TU_CLOUD_NAME";
uploadPreset = "TU_UPLOAD_PRESET";
```

---

## 5. Ejecutar Angular

```bash
ng serve -o
```

La aplicación quedará disponible en

```
http://localhost:4200
```

---

# 🖥️ Cómo ejecutar el ecosistema completo

Para que el sistema funcione correctamente, es importante respetar el siguiente orden.

## Paso 1 — Base de Datos

Iniciar MySQL.

Crear la base de datos:

```sql
CREATE DATABASE techlab_db;
```

---

## Paso 2 — Backend

Clonar el repositorio del Backend.

Configurar:

- MySQL
- Cloudinary

Ejecutar:

```bash
mvn clean install

mvn spring-boot:run
```

Esperar a que el servidor inicie correctamente en

```
http://localhost:8080
```

---

## Paso 3 — Frontend

Desde este proyecto ejecutar

```bash
npm install

ng serve -o
```

Abrir

```
http://localhost:4200
```

---

# 🧪 Usuarios de prueba

El backend crea automáticamente los siguientes usuarios al iniciarse por primera vez.

| Rol | Email | Contraseña |
|------|--------|------------|
| ADMIN | admin@techlab.com | admin123 |
| CLIENTE | cliente@techlab.com | cliente123 |

---

# 🧪 Flujo recomendado para probar la aplicación

## Como Administrador

- Iniciar sesión.
- Acceder al Dashboard.
- Crear una categoría.
- Crear un producto.
- Subir una imagen.
- Editar el producto.
- Habilitar o deshabilitar el producto.

## Como Cliente

- Iniciar sesión.
- Explorar el catálogo.
- Agregar productos al carrito.
- Confirmar la compra.
- Consultar el historial.
- Cancelar un pedido para verificar la restauración automática del stock.

---

# 📁 Dependencias principales

- @angular/core
- @angular/router
- @angular/common
- rxjs
- sweetalert2

---

# 🔮 Mejoras futuras

- JWT Authentication.
- Refresh Token.
- Lazy Loading completo.
- Paginación de productos.
- Buscador avanzado.
- Favoritos.
- Perfil de usuario.
- Dashboard con métricas.
- Tests unitarios con Jasmine y Karma.
- Integración con Docker.

---

# 👨‍💻 Autor

## Leandro Nahuel Gomez

Desarrollador Backend Java | Angular

### Tecnologías

- Java
- Spring Boot
- Angular
- TypeScript
- MySQL
- Hibernate
- REST APIs

---
