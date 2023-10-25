import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { RegisterComponent } from './register/register.component';
import { TablasComponent } from './tablas/tablas.component';
import { TicketComponent } from './ticket/ticket.component';
import { TurnosComponent } from './turnos/turnos.component';

const routes: Routes = [
  { path: "", redirectTo:"app-formulario", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'app-formulario', component: FormularioComponent},
  { path: 'ticket', component: TicketComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'admins', component: AdminsComponent},
  { path: 'municipios', component: MunicipiosComponent},
  { path: 'turnos', component: TurnosComponent},
  { path: 'tablas', component: TablasComponent},

  { path: '**', redirectTo:"app-formulario", pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
