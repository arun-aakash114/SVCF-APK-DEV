import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavController,ModalController,AlertController, Platform } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.page.html',
styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
values: any = [];
searchTerm: string;
// filter: any;
user: any;
details: any=[];
moneycoll_id: any;
moneycoll_name: any;
login_res_data:any;
terms:"";
enableclear=false;
items_containers:any;
isLoading = false;
filterItems:any;

constructor(private platform:Platform,private router: Router,public alertController: AlertController,  public dashboardservice: DashboardService, private route: ActivatedRoute,public loadingController: LoadingController,
   public toastController: ToastController) {

}
ionViewDidEnter() {
}
ngOnInit() {

}


ionViewWillEnter(){
this.moneycoll_name=localStorage.getItem("col_name")
this.moneycoll_id = localStorage.getItem("col_id");
console.log(this.moneycoll_id)
let token=localStorage.getItem("tokens");
this.present();
this.dashboardservice.user_details(this.moneycoll_id,token).subscribe(res => {
this.dismiss();
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
getApi(){
   console.log("wroking")
   this.enableclear=true
   if(this.terms==""){
      console.log("empty")
   this.enableclear=false
      this.ionViewWillEnter();
   }
}

clear(){
   this.terms=""
   this.enableclear=false
   this.ionViewWillEnter();
}
search() {
   // Retrieve values from local storage
   this.moneycoll_name = localStorage.getItem("col_name");
   this.moneycoll_id = localStorage.getItem("col_id");
   console.log("ak", this.moneycoll_id);

   // Get token from local storage
   let token = localStorage.getItem("tokens");

   // Check if the search term is empty or contains only empty spaces
   if (this.terms.trim() === '') {
      return; // Do nothing if the search term is empty
   }

   // Perform the search
   this.present();
   this.dashboardservice.user_detailssearch(this.moneycoll_id, token, this.terms).subscribe(
      res => {
         this.dismiss();
         this.details = res;
         console.log("first0", res);
         this.filterItems = this.details;
         console.log(this.details);
      },
      (error: HttpErrorResponse) => {
         if (error.status === 401) {
            this.dismiss();
            this.presentToast("Session timeout, please login to continue.");
            this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res => {});
            this.router.navigate(["/login"]);
         } else if (error.status === 400) {
            this.dismiss();
            this.presentToast("Session timeout / Server Error! Please login again");
            this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res => {});
            this.router.navigate(["/login"]);
         }
      }
   );
}
ionViewDidLeave () {
   this.terms = '';
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
this.router.navigate(['login']);
}
}
]
});
await alert.present();
}
history(){

this.router.navigate(['receipthistory']);
}
Otherbr(){
   this.router.navigate(['otherbranch'])
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
