
// Modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_LANGUAGE, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../environments/environment';

// Componentes
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { AdminsComponent } from './admins/admins.component';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { RegisterComponent } from './register/register.component';
import { TicketComponent } from './ticket/ticket.component';
import { TurnosComponent } from './turnos/turnos.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    TicketComponent,
    LoginComponent,
    RegisterComponent,
    AdminsComponent,
    MunicipiosComponent,
    TurnosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
