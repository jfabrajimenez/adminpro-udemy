import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { URL_SERVICIOS } from '../../config/config';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Ha fallado la subida');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
