import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  /*user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  );*/

  constructor(
    private router: Router,
    private auth: AuthService,
    private afStorage: AngularFireStorage
    ) {}

  async ngOnit(){
  }

    exit(){
      this.auth.logout();
      localStorage.setItem('ingresado', 'false');
      //this.router.navigate(['../login']);
    }
}

  
