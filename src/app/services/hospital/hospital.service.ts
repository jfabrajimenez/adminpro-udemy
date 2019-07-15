import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalRegistros: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {}

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalRegistros = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHospital(id: string): Observable<Hospital> {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get<Hospital>(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        Swal.fire('Hospital borrado', 'El hospital ha sido eliminado correctamente.', 'success');
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    const hospital: Hospital = new Hospital(nombre);

    return this.http.post(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire('Hospital creado', hospital.nombre, 'success');
        return resp.hospital;
      })
    );
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }
}
