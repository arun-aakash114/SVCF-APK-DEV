import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CashprintPage } from './cashprint.page';
import { Toast } from '@ionic-native/toast/ngx';
import { Printer } from '@ionic-native/printer/ngx';

const routes: Routes = [
  {
    path: '',
    component: CashprintPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashprintPage],
  providers:[Toast, Printer]

  
})
export class CashprintPageModule {}
