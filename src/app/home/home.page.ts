import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mensajes?:  any[];

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.listAllCitas();    
  }

  listAllCitas(){
    this.usuarioService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.mensajes = data;
      console.log(this.mensajes);
    });
  }

  async deleteMensaje(id: string){    
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',          
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.usuarioService.delete(id).then(() => {
              this.listAllCitas();
              console.log('Cita eliminada exitosamente!')
            }).catch(err => console.log(err));
          },
        },
      ],
    });

    await alert.present();    
  }
}
