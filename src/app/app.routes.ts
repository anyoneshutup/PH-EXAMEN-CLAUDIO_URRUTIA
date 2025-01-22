import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado-avisos',
    pathMatch: 'full',
  },
  {
    path: 'listado-avisos',
    loadComponent: () => import('./paginas/listado-avisos/listado-avisos.page').then( m => m.ListadoAvisosPage)
  },
  {
    path: 'formulario-avisos',
    loadComponent: () => import('./paginas/formulario-avisos/formulario-avisos.page').then( m => m.FormularioAvisosPage)
  },
];
