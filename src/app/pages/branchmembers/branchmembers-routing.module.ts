import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchmembersPage } from './branchmembers.page';

const routes: Routes = [
  {
    path: '',
    component: BranchmembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchmembersPageRoutingModule {}
