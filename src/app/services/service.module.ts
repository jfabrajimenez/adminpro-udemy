import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  MedicoService,
  SubirArchivoService,
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    SubirArchivoService,
    ModalUploadService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule {}
