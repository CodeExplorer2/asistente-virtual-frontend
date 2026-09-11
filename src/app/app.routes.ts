import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { PaginaRecordatorios } from './paginas/recordatorios/recordatorios';
import { Calendario } from './paginas/calendario/calendario';
import { Configuracion } from './paginas/configuracion/configuracion';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'recordatorios', component: PaginaRecordatorios },
  { path: 'calendario', component: Calendario },
  { path: 'configuracion', component: Configuracion },
];
