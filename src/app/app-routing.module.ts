import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from '../app/cliente/cliente.component';
import { FormComponent } from '../app/cliente/form.component';
import { FacturaComponent } from './facturas/factura.component';

const routes: Routes = [
  { path: 'Inmubles', component: ClienteComponent},
  { path: 'Inmubles/form', component: FormComponent},
  { path: 'Inmubles/form/:id', component: FormComponent},
  { path: 'facturas/form/:clienteId', component: FacturaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
