import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  usuarioForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  user: any;

  date=new Date()

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.usuarioForm = this.fb.group({
      uid: [this.user.uid],
      nombres: [''],
      mensaje: [''],
      fechaDeEmision: this.date.getDate() +"/"+ this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds(),
    })
  }

  saveCita() {    
    if (!this.usuarioForm.valid) {
      return false;
    } else {      
      this.usuarioService.create(this.usuarioForm.value).then(() => {
        console.log('Usuario creado exitosamente!')
        this.usuarioForm.reset();
        this.router.navigate(['/home']);
      });
    }
    return true;
  }

}

