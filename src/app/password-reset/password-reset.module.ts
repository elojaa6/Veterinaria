import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordResetPageRoutingModule } from './password-reset-routing.module';

import { PasswordResetPage } from './password-reset.page';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PasswordResetPageRoutingModule,
    SharedModule
  ],
  declarations: [PasswordResetPage]
})
export class PasswordResetPageModule {}
