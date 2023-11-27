import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-otherbranches',
  templateUrl: './otherbranches.page.html',
  styleUrls: ['./otherbranches.page.scss'],
})
export class OtherbranchesPage implements OnInit {
  details: any=[];
  isLoading = false;
  searchTerm: string;
  terms:"";
  filterItems:any;
  user: any;
  moneycoll_name:any;
  constructor(private platform:Platform,private router: Router,public alertController: AlertController,  public dashboardservice: DashboardService, private route: ActivatedRoute,public loadingController: LoadingController,
    public toastController: ToastController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.moneycoll_name=localStorage.getItem("col_name")
    let token=localStorage.getItem("tokens");
    this.present();
    this.dashboardservice.otherbranches(token).subscribe(res => {
    this.dismiss();
    this.details = res;
    console.log(this.details)
    this.filterItems= this.details;
    },(error:HttpErrorResponse)=>{
       if(error.status ===401){    
          this.dismiss();       
         this.presentToast("Session timeout, please login to continue.");
         this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
       })
         this.router.navigate(["/login"]);
      }
      else if(error.status ===400){  
       this.dismiss();         
       this.presentToast("Session timeout / Server Error! Please login again");
       this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
       })
       this.router.navigate(["/login"]);
    }
     })
    }
    history(){

      this.router.navigate(['receipthistory']);
      }
    goto(s) {
      this.user = s;
      localStorage.setItem("brdetails",JSON.stringify(this.user));
      this.router.navigateByUrl('branchmembers')
      }
      logout(){
        this.presentAlertConfirm();
        }
        async presentAlertConfirm() {
          const alert = await this.alertController.create({
          message: 'Are you sure you want to logout?',
          buttons: [
          {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
          }, {
          text: 'Logout',
          handler: () => {
          this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
          })
          localStorage.clear();
          this.router.navigate(['/login']);
          }
          }
          ]
          });
          await alert.present();
          }
    async present() {
      this.isLoading = true;
      return await this.loadingController.create({
      message: 'Loading, Please wait.....'
      }).then(a => {
      a.present().then(() => {
      if (!this.isLoading) {
      a.dismiss().then(() => console.log('abort presenting'));
      }
      });
      });
      }
      async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
        }
        async presentToast(message) {
          const toast = await this.toastController.create({
              message: message,
              duration: 2000
           });
            toast.present();
        } 
}
