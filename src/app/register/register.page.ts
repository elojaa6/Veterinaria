import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  userRegisterForm : FormGroup = this.fb.group({
    email : ['', [Validators.required]],
    password : ['', [Validators.required]],
    //confirmPassword : ['', [Validators.required]]
  });

  constructor(
    private alertController: AlertController,
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

  register(){
    if (!this.userRegisterForm.valid) {
      this.mostrarMensaje();
      return false;
    }else{
      const { email, password} = this.userRegisterForm.getRawValue();
      console.log(email, password);
      this.auth.register(email, password).then(() => {
        console.log('register');
        this.auth.SendVerificationMail();
        //this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);

        window.alert(error.message)
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


}
