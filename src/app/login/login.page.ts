import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup = this.fb.group({
    email : ['', [Validators.required]],
    password : ['', [Validators.required]]
  });

    constructor(
      public alertController: AlertController,
      private fb: FormBuilder,
      private router: Router,
      private auth: AuthService
    ) { }

  ngOnInit() {
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  login(){
    if (!this.loginForm.valid) {
      this.mostrarMensaje();
      return false;
    }else{
      const { email, password} = this.loginForm.getRawValue();
      console.log(email, password);
      console.log(this.auth.isEmailVerified)
      this.auth
        .login(email, password)
        .then(() => {
          //if (this.auth.isEmailVerified) {
            console.log('login');
            //console.log(localStorage.setItem('ingresado', 'true'));
            this.router.navigate(['/home']);
          /*}else{
            this.correo('Revisar Su Correo');
            console.log(this.auth.isEmailVerified)
          }
          return false;*/
        })
      .catch(error => {
        console.error(error);
      });
      return true;
    }
    
  }

  async mostrarMensaje(){
    const alert = await this.alertController.create({
      header:'Datos Incompletos',
      message: 'Colocar todos los datos',
      buttons: ['Aceptar']
    });

    await alert.present();
    return
  }

  async correo(mensaje: string){
    const alert = await this.alertController.create({
      header:'Correo no Verificado',
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
    return
  }


}