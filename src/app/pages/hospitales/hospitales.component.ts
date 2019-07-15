import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;

      this.cargando = false;
    });
  }

  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
    }

    this.cargando = true;
    this._hospitalService.buscarHospitales(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._hospitalService.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está apunto de borrar a' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(borrado => {
          console.log(borrado);
          this.cargarHospitales();
        });
      }
    });
  }

  async lanzarVentanaCrearHospital() {
    const { value: nombreHospital } = await Swal.fire({
      title: 'Nombre del Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Crear',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    });

    if (nombreHospital) {
      this._hospitalService.crearHospital(nombreHospital).subscribe(hospitalBD => this.cargarHospitales());
    }
  }
}
