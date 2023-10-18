import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

      constructor(private auth: Auth) {
        
      }

      register({email, password} : any) {
        return createUserWithEmailAndPassword(this.auth, email, password);
      }


}
