import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../entidades/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  //authState$ = authState(this.afAuth);

  constructor(
    private afStore: AngularFirestore,
    private afAuth : AngularFireAuth,
    //private auth : Auth,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else{
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Iniciar sesión con correo electrónico/contraseña
  register(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Registrar usuario con correo electrónico/contraseña
  async login(email, password): Promise<User>{
    try{
      const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.SetUserData(user);
      return user;
    }catch(error){
      console.log('Error -> ', error)
    }
    return null;
  }

  // Verificación por correo electrónico al registrarse un nuevo usuario
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  // Recuperar contraseña
  PasswordRecover(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Se ha enviado un correo electrónico para restablecer la contraseña.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Devuelve true cuando el usuario esta conectado
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Devuelve true cuando el email del usuario está verificado
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }

  // Almacenar usuario en localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  logout(){
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
