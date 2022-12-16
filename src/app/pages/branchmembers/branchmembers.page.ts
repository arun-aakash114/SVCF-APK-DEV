import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-branchmembers',
  templateUrl: './branchmembers.page.html',
  styleUrls: ['./branchmembers.page.scss'],
})
export class BranchmembersPage implements OnInit {
user_details:any=[];
values: any = [];
searchTerm: string;
// filter: any;
user: any;
details: any=[];
moneycoll_id: any;
moneycoll_name: any;
login_res_data:any;
terms:"";
items_containers:any;
isLoading = false;

   filterItems:any;
  constructor(private platform:Platform,private router: Router,public alertController: AlertController,  public dashboardservice: DashboardService, private route: ActivatedRoute,public loadingController: LoadingController,
    public toastController: ToastController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
 
    }

    search(){
      this.moneycoll_name=localStorage.getItem("col_name")
      let token=localStorage.getItem("tokens");
      this.user_details=JSON.parse(localStorage.getItem("brdetails"));
      this.dashboardservice.branchmember(this.user_details.Head_Id,this.terms,token).subscribe(res => {
      this.details = res;
       this.filterItems= this.details;
      console.log(this.details)
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
    goto(s) {
    this.user = s;
    localStorage.setItem("user2",JSON.stringify(this.user));
    this.router.navigateByUrl('payment')
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
    this.router.navigate(['selectapp']);
    }
    }
    ]
    });
    await alert.present();
    }
    history(){
    
    this.router.navigate(['receipthistory']);
    }
   
    //  searching(){
    // this.filterItems = this.details.filter(item =>  item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase())) > -1;
    
    //  }   
    async presentToast(message) {
       const toast = await this.toastController.create({
           message: message,
           duration: 2000
        });
         toast.present();
     } 
}
