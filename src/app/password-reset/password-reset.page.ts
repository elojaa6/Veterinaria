import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  resetForm : FormGroup = this.fb.group({
    email : ['', [Validators.required]]
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

  reset(){
    if (!this.resetForm.valid) {
      this.mostrarMensaje();
      return false;
    }else{
      const {email} = this.resetForm.getRawValue();
      console.log(email);
      this.auth.PasswordRecover(email).then(() => {
        console.log('login');
        this.router.navigate(['/login']);
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
}
