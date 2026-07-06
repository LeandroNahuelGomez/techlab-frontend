export interface Producto {
    id?:number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    stock: number
    // Nota: La categoría la podemos tipar como un objeto entero o solo su ID según lo que necesite tu vista
}