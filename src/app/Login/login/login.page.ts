import { Component, OnInit ,ElementRef, AfterViewInit} from '@angular/core';
import {Router,NavigationExtras} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Network} from '@ionic-native/network/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import { CommonApiService } from 'src/app/Login/common-api.service';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: string;
  member_id:any;
  token: any;
  show:boolean;
  count: number=0;
  sec:boolean=true;
  Forgots: boolean=true;
  credentials: any;
  username: any;
  password: any;
  user_details: Object;
  coll_id: any;
  coll_name: any;
  isLoading: boolean;
  constructor(private fb:FormBuilder,private network:Network,private dialogs:Dialogs,private router:Router, public commonserv: CommonApiService,public toastController: ToastController,
    private platform: Platform,public alertController:AlertController,public loadingController: LoadingController,public loginservice: LoginService) { 
    this.loginForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern(/^\S*$/)]],
      password: ['', [Validators.required,Validators.pattern(/^\S*$/)]],
   })
  }
  ngOnInit() {
      this.network.onDisconnect().subscribe(()=>{
      this.dialogs.alert('Network was disconnected')
          })
      this.network.onConnect().subscribe(()=>{
      console.log(this.network.type)
      })
      
  }
  
  ionViewWillEnter(){
    this.count=0;
    this.loginForm.reset("");
   
        this.Forgots=false
      
  }
  

   submitForm(val){   
      this.present();
      this.credentials = val;
      this.username = this.credentials['name'];
      this.password = this.credentials['password'];
      if (this.username == '' || this.username == null || this.password == '' || this.password == null) {
      this.presentToast('Please Enter Valid Credentials');
      }
      else {
      this.loginservice.user_authentication(this.username, this.password).subscribe(res => {
          if(res['length'] == 0){
        //alert('Enter valid credential')
        this.presentToast('Please enter valid credentials');
      
        this.dismiss();
      
          }
          else{
              this.dismiss();
              if(res[0]['IsBlocked']=="1"){
                this.presentToast('You Account is blocked, please contact Admin');
              }
              else if(res[0]['IsLoggedIn']=="1"){
                this.presentToast('Your Account is already logged in with another device')
              }
              else{
                this.user_details = res;
                console.log(res)
                localStorage.setItem("tokens",this.user_details[0].JWTtoken)
                // localStorage.setItem("tokens","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdDEiLCJpZCI6IjU1IiwiZGF0ZSI6IjI5LzAzLzIwMjEiLCJpYXQiOiIxNjE2OTk5MDIwIiwiZXhwIjoiMTYxNjk5OTMyMCJ9.K2fOyWO5kihkbqlqlFQuA-4F-P35mnI7d81mseD_LbY")
                localStorage.setItem("col_id", this.user_details[0].moneycollid);
                localStorage.setItem("col_name", this.user_details[0].moneycollname);
                
                this.coll_id = this.user_details[0].moneycollid;
                this.coll_name = this.user_details[0].moneycollname;
                let navigationExtras: NavigationExtras = {
                state: {
                //user: this.coll_id,
                user1: this.coll_name
                }
                };
                this.presentToast('You have Logged in successfully');
                this.router.navigate(['dashboard'], navigationExtras);
              }
            
          }
      
      }, error => {
      this.dismiss();
      this.presentToast("Server Error! Please try later.");
      //alert('Something went wrong')
      })
      }
        
       
   
   
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
    message: 'Logging in,Please wait.....'
    }).then(a => {
    a.present().then(() => {
    console.log('presented');
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
  CheckSpace(event)
  {
     if(event.which ==32)
     {
        event.preventDefault();
        return false;
     }
  }

  Forgot(){
      this.router.navigate(['/forgot-password'])
  }
  
  ionViewWillLeave(){
    this.loginForm.reset();
  }
  terms(){
    this.router.navigate(['/termscondition'])
  }
}
