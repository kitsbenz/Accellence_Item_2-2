
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./application-form/application-form.component').then(
        (m) => m.ApplicationFormComponent
      )
  }
];
