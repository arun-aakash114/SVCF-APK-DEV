import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import {Router} from'@angular/router'
import { CommonApiService } from 'src/app/Login/common-api.service';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import {format} from "date-fns";
import { DashboardService } from '../services/dashboard.service';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  resetForms: FormGroup;
  mobilepass: any;
  patternval: boolean=false;
  mob: any;
  userdata: any=[];
  show:boolean;
  show1:boolean;
  mobile: any=[];
  constructor(private fb:FormBuilder,public dashboardservice:DashboardService,private router:Router,public commonserv: CommonApiService,public toastController: ToastController,
    public loadingcontroller:LoadingController,private platform: Platform) {
    this.resetForms = this.fb.group({
      name: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9]+$")]],
      // mobilenumber: ['',Validators.maxLength(11)], 
      dob: ['', Validators.required],
      oldpassword: ['',[Validators.required]], 
      newpassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})" || /^\S*$/)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})" || /^\S*$/),this.equalto('newpassword')]],
   })
   
   }
     ngOnInit() {
    }
   async ionViewWillEnter(){
      const loading = await this.loadingcontroller.create({
        message: 'Please Wait',
        translucent: true,
      });
      await loading.present();
      let data=JSON.parse(localStorage.getItem("firstdata"));
      console.log(data)
      this.resetForms.get("oldpassword").setValue(data.name);
      this.resetForms.get("dob").setValue(data.dob);
      let id=localStorage.getItem('memberid');
      this.commonserv.sameMobileNumber(id).subscribe((res) => {
        this.mobilepass=res
         loading.dismiss();
        // if(this.mobilepass.MobileNo.length>0){
         this.mobile=this.mobilepass?.MobileNo.replaceAll(' ', "")
        //  }
     })
  
    }
     CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}

  checkname(){
  
   setTimeout(()=>{
    let names=this.resetForms.get('name').value                           
    if(names.length>=1){
      this.commonserv.sameUsername(names).subscribe((res) => {
        console.log(res)
         if(res['Message'] === "UserName is Available"){
          this.presentToast('UserName is Available.');
          
        }
        else if(res['Message'] === "UserName is not Available"){
          this.presentToast('UserName is not Available.');
          this.resetForms.get('name').reset("");
        }
        })
       }
}, 3000);
 }
   async presentToast(message) {
      const toast = await this.toastController.create({
          message: message,
          duration: 1000
       });
        toast.present();
    }
  

    checkMobNo(){

      this.mob=this.resetForms.get("mobilenumber").value
     var pattern=new RegExp(('[0-9]{10}') ||('[0-9]{11}'));
     console.log(pattern.test(this.mob))
     this.patternval=pattern.test(this.mob)
       }
  
   validation_messages = {
    'name': [
      { type: 'required', message: 'Username is required.' },
      { type: 'pattern', message: 'Special Characters Not Allowed.' },
    ],

    'mobilenumber': [
        { type: 'required', message: 'Mobile Number is required.' },],

    'oldpassword': [
          { type: 'required', message: 'Old password is required.' },],

    'newpassword': [
        { type: 'required', message: 'New password is required.' },
      
        { type: 'pattern', message: 'Password should contain 8 to 20 characters ,1 digit,1 uppercase letter, 1 lowercase letter and 1 special symbol (“@#$%”) and without space.'} ],

    'confirmpassword': [
        { type: 'required', message: 'Confirm Password is required.' },],
    
    }
  
    equalto(field_name): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} => {
		let input = control.value;
		let isValid=control.root.value[field_name]==input
		if(!isValid){
		return { 'equalTo': {isValid} }
		}
		else{
		return null
		}
		}
    }

    submitsForm(val){
      
       console.log(this.resetForms)
       let id= localStorage.getItem('memberid');
       let name=this.resetForms['value']['name']
       let password=this.resetForms['value']['confirmpassword']
       let dob=this.resetForms['value']['dob']
       let Dob= format(new Date(dob), "yyyy/MM/dd");
       this.commonserv.reset(id,name,password,Dob).subscribe((res) => {
        console.log(res)
        if(res['Status']==="Success"){
          this.commonserv.logout(localStorage.getItem("memberid")).subscribe(res=>{
            if(res){
              this.router.navigate(['/selectapp'])
              localStorage.clear()
              this.presentToast('Password Changed Successfully And Use New Password To Login.');
            }
            //user
          })
          
        }
        else{
          this.presentToast('please Enter Valid Details');
        }
       })
      }
  
     
   
  back(){
    if(localStorage.getItem("whichpage")=="login"){
      
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{ })
      this.router.navigate(['/login'])
      localStorage.clear()
    }else{
      this.router.navigate(['/subscribe-list/person-detail'])
    }

  }

  back1(){
    if(localStorage.getItem("col_id")){
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{})
    }else if(localStorage.getItem("memberid")){
      this.commonserv.logout(localStorage.getItem("memberid")).subscribe(res=>{})
    }
    this.router.navigate(['/login'])
    localStorage.clear()
  }
  ngOnDestroy(){
    this.resetForms.reset("");
  }
}
