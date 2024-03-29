import { Component ,ViewChild} from '@angular/core';
import { AlertController, IonRouterOutlet} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';
import { DashboardService } from '../app/services/dashboard.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { CommonApiService } from './Login/common-api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private searchEventSubscription: Subscription;
  private sub:Subscription;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  // public counter = 0;
  clickcount: any=[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    public alertController:AlertController,
    public location:Location,
    private router:Router,
    private service:DashboardService,
    private localNotifications: LocalNotifications,
    public common:CommonApiService
  ) {

   this.initializeApp();
   if(localStorage.getItem("col_id")){
this.service.tokenexpiry(localStorage.getItem("tokens")).subscribe((res:number)=>{
 if(res>300){
  this.router.navigate(['/dashboard'])
 }else {
   this.router.navigate(['/login'])
   this.offapp()
 }
})
  }
   this.backbutton()
  }

  
offapp(){
   if(localStorage.getItem("col_id")){
    this.service.logout(localStorage.getItem("col_id")).subscribe(res=>{
      if(res){
        localStorage.clear();
        this.searchEventSubscription.unsubscribe()
        //employee
      }
  })
 }
  }


  initializeApp() {
    
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    
      });
      this.platform.resume.subscribe(e=>{
        this.searchEventSubscription.unsubscribe()
      })
      this.searchEventSubscription=this.platform.pause.subscribe(e => {
        // if(localStorage.getItem("col_id") || localStorage.getItem("memberid")){
          // this.localNotifications.schedule({
          //   id: 1,
          //   text: 'SVCF will auto logout in 30secs. Open SVCF to stop it',
          // });
        //   setTimeout(()=>{                           // <<<---using ()=> syntax
        //    this.offapp();
        //  }, 50000);
        // }
      });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
    }
    async backbutton1() {
      if(!localStorage.getItem("firstclick")){
        localStorage.setItem("firstclick","clicked")
        const alert = await this.alertController.create({
          message: 'Do you want to exit app?',
          buttons: [
          {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.removeItem("firstclick")
          }
          }, {
          text: 'OK',
          handler: () => {
          this.offapp();
          navigator['app'].exitApp();
          localStorage.removeItem("firstclick")
          }
          }
          ]
          });
          await alert.present();
      }
    
      }
    backbutton() {
      this.platform.backButton.subscribeWithPriority(1000,async ()=>{
       
        if(window.location.pathname == '/dashboard' || window.location.pathname == ''){
          // if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
           
          //   navigator['app'].exitApp(); 
            
           
          // } else {
          //   const toast = await this.toastController.create({
          //     message: 'Press back again to exit App.',
          //     duration: 2000,
          //     position: 'bottom'
          //   });
          //   toast.present();
          //   this.lastTimeBackPress = new Date().getTime();
          // }
       this.backbutton1();
         
         
        }
       
        else if(window.location.pathname=="/forgot-password" || window.location.pathname=="/reset-password" || window.location.pathname=="/termscondition"){
          this.router.navigate(['/login'])
        }
        else if(window.location.pathname=="/login"){
          navigator['app'].exitApp();
        }else if(window.location.pathname=="/payment" || window.location.pathname=="/receipthistory"){
          if(this.router.url.split('?')[0]=="/payment/cash"){
            this.router.navigateByUrl('payment')
          }else {
            this.router.navigate(['/dashboard'])
          }
          
        }
        else if(window.location.pathname=="/payment/cash"){
          this.router.navigateByUrl('/payment')
        }else if(window.location.pathname=="/payment/cashpay"){
          this.router.navigateByUrl('/payment/cash')
        }
         else if(window.location.pathname=="/otherbranch"){
          this.router.navigate(['/dashboard'])

        } else if(window.location.pathname=="/branchmembers"){
          this.router.navigate(['/otherbranch'])
        } else if(window.location.pathname=="/cashprint"){
          this.router.navigate(['/dashboard'])
        }
  
      })
    }
   


 
}
