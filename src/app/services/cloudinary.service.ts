// src/app/services/cloudinary.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private http = inject(HttpClient);
  
  // Reemplaza con tu Cloud Name
  private cloudName = 'drir5t1cw'; 
  // El nombre del preset Unsigned que creaste
  private uploadPreset = 'techlab'; 
  
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

  subirImagen(archivo: File): Observable<any> {
    const data = new FormData();
    data.append('file', archivo);
    data.append('upload_preset', this.uploadPreset);
    data.append('folder', 'techlab'); // Opcional: crea una carpeta en tu Cloudinary

    return this.http.post(this.cloudinaryUrl, data);
  }
}