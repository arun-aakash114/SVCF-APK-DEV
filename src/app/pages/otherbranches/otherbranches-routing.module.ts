import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherbranchesPage } from './otherbranches.page';

const routes: Routes = [
  {
    path: '',
    component: OtherbranchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherbranchesPageRoutingModule {}
