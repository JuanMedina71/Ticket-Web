import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: "", redirectTo:"login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'app-formulario', component: FormularioComponent},
  { path: 'ticket', component: TicketComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo:"app-formulario", pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
