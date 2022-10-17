import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchmembersPageRoutingModule } from './branchmembers-routing.module';

import { BranchmembersPage } from './branchmembers.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    BranchmembersPageRoutingModule
  ],
  declarations: [BranchmembersPage]
})
export class BranchmembersPageModule {}
