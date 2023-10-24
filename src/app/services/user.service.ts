import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  functions: any;
  constructor(private auth: Auth) { }

  register({ email, password }: { email: string, password: string }) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password}: {email: string, password: string}) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  deleteAdmin(uid: string) {
    const callable = this.functions.httpsCallable('deleteUser');
    return callable({ uid });
  }
}
