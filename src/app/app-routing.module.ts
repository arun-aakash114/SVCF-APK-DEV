import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Login/Auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
  loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'customer-list',
    loadChildren: () => import('./employee/customer-list/customer-list.module').then( m => m.CustomerListPageModule)
  },
  //canActivate: [AuthGuard]
  {
    path: 'forgot-password',
    loadChildren: () => import('./Login/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./Login/forgot-password/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
 

  //employee
  
  { path: 'dashboard', loadChildren:()=> import('./pages/dashboard/dashboard.module').then(m=> m.DashboardPageModule)},
  
  { path: 'otherbranch', loadChildren:()=> import('./pages/otherbranches/otherbranches.module').then(m=> m.OtherbranchesPageModule)},
  { path: 'branchmembers', loadChildren:()=> import('./pages/branchmembers/branchmembers.module').then(m=> m.BranchmembersPageModule)},

  { path: 'payment', loadChildren:()=> import('./pages/payment/payment.module').then(m=> m.PaymentPageModule)},
  { path: 'cashprint', loadChildren:()=> import('./pages/cashprint/cashprint.module').then(m=> m.CashprintPageModule)},
  {
    path: 'receipthistory',
    loadChildren: () => import('./pages/receipthistory/receipthistory.module').then( m => m.ReceipthistoryPageModule)
  },
  {
    path: 'termscondition',
    loadChildren: () => import('./Login/termscondition/termscondition.module').then( m => m.TermsconditionPageModule)
  },
  {
    path: 'branchmembers',
    loadChildren: () => import('./pages/branchmembers/branchmembers.module').then( m => m.BranchmembersPageModule)
  },




]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
