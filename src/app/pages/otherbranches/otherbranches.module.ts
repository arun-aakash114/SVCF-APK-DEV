import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherbranchesPageRoutingModule } from './otherbranches-routing.module';

import { OtherbranchesPage } from './otherbranches.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    OtherbranchesPageRoutingModule
  ],
  declarations: [OtherbranchesPage]
})
export class OtherbranchesPageModule {}
