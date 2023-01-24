import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';

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
    private auth: AuthService
    ) {}

    exit(){
      this.auth.logout();
      localStorage.setItem('ingresado', 'false');
      //this.router.navigate(['../login']);
    }
}

  
