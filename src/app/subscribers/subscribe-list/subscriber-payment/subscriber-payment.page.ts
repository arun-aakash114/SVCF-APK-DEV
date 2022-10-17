import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Router, ActivatedRoute,NavigationExtras} from'@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { SubscriberApiService } from '../../subscriber-api.service';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { format } from 'date-fns';
import { CommonApiService } from 'src/app/Login/common-api.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

declare var RazorpayCheckout: any; 

@Component({
  selector: 'app-subscriber-payment',
  templateUrl: './subscriber-payment.page.html',
  styleUrls: ['./subscriber-payment.page.scss'],
})
export class SubscriberPaymentPage implements OnInit {
    payment_details:any=[];
    formcount:any;
    PaymentForm:FormGroup;
    grandtotal:any=[];
    personal:any=[];
    num: number;
    total_details:any=[];
    storepayment: any;
    payment_detail: { Chitnumber: any; MemberId: string; PayableAmount: any; ArrierAmount: any; InterestAmount: number; Prized: any; Branch: any; Current_insta_no: any; };
    total: number;
    data1: number;
    data2: number;
    // newly added
    arrearamount: number;
    Amounts: number;
    payamount:number;
    // day:number;
    // month:number;
    // year:number;
    currentdate:string;
    storepayment1: any;
    carddata:any;
    storepayment2: any;
    storepayment3: any;
    array:any=[];
    nedate:any;
    day:any;
    month:any;
    year:any;
    card:any;
    card1:any;
    final:any;
    final1:any;
    finals:any;
    vouchercounts:any;
    count: number=0;
    data3: number;

    getvouchercount:any=[];
    payment_data:any=[];
    cashdata:any=[];
    cashdata1:any;
    receiptno:any=[];
    receiptletters: any=[];
    Receipt_code: any;
    todaypaidamount: any;
  totals: number;
  enteramount: any;
  enteramounts: any=[];
  conf:any;
  htmlfile : any =
  `<!DOCTYPE html>
  <html lang="en">
  
  <head>
  
  <script type="module" src="../subscriber-payment/subscriber-payment.page.ts"></script>
  </head>
  
  <body>
    <div class="container">
      <div class="jumbotron mt-3">
        <h1>BillDesk SDK</h1>
        <button class="btn btn-lg btn-primary" onclick="loadXMLDoc()" type="button">Launch D»</button>
      </div>
      <div id="spinner" style="display: none;" class="mt-3 text-center">
        <div class="spinner-border" role="status" style="width: 5rem; height: 5rem;">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div id="result" class="jumbotron mt-3">
      </div>
    </div>
    
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
      integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous">
      </script>
     
    <script type="module" src="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js"></script>
    <script nomodule src="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk.js"></script>
    <link href="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.css" rel="stylesheet">
    <script type="text/javascript">
    function hideSpinner() {
      document.getElementById('spinner').style.display = 'none';
    }
  
    function showSpinner() {
      document.getElementById('spinner').style.display = 'block';
    }
    
    
    var flow_config = {
      merchantId: "BDUATV2TND",
      bdOrderId: "OAD319XTPNTZQC",
      authToken: "OToken B9D9DE985F4E4547DDADC8DAF81B1645EFB77E5E4533A2E1B9CFEC537942F06D2B8336ED6F3D78C9DD3F9AF008E50B7347FFAE241665C0F48C970B2ECC4B54FFE3DCC0FC1FC2F490A149308726A60F0A0DE117B6126EB4A76808316CA81A74C28E8AB3D30C6A6B7E9F8B76316DB85F35D1CD942C1F81B094F9A7D7774E9F2D7C570BEA124B094955508A730E33146937C3D80A55C9B3464534100C.4145535F55415431",
      childWindow: true,
      returnUrl: "https://www.billdesk.com/"
  };	
    var config = {
      merchantLogo: "data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMJcAAht8ZAbQJp9wAAAAASUVORK5CYII=",
      flowConfig: flow_config,
      flowType: "payments"
    };
  
    function loadXMLDoc() { 
      document.getElementById("result").innerHTML = "";
      var xmlhttp = new XMLHttpRequest();
      var jsonObj = "";
            window.loadBillDeskSdk(this.conf);
          }
          
      
    
    </script>
  </body>
  
  </html>`;
  constructor(private formBuilder: FormBuilder,public toastController: ToastController, public subscribeServ: SubscriberApiService, private router:Router,public route: ActivatedRoute,public loadingController: LoadingController,
    public platform:Platform,public alertController: AlertController,private webIntent: WebIntent,private common:CommonApiService,private sanitizer:DomSanitizer,private iab: InAppBrowser) {
    this.route.queryParams.subscribe(params => {
      this.payment_details = JSON.parse(params.state);
           console.log(this.payment_details)
 
      this.formcount=this.payment_details.length     
    })
     this.PaymentForm = this.formBuilder.group({
       AmountDetails:this.formBuilder.array([])
     });
 
   
 }
 ngOnInit() {
}
ionViewWillEnter(){
console.log(this.formcount)
for( let i=0;i<this.formcount;i++){
this.AmountDetail()
this.addrow();
this.newArray();
}
}

ionViewDidEnter(){
  
this.addmethod();
}
back(){
  this.router.navigate(["/subscribe-list"])
    }

    public getSafehtml(html:string){
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

addmethod() {
  this.grandtotal=this.payment_details
  var num = 0;
for(let i=0;i<this.grandtotal.length;i++){
 
     if(this.grandtotal[i].CurrentDueAmount){
 
      num +=( parseFloat(this.grandtotal[i].CurrentDueAmount))
      this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(parseFloat(this.grandtotal[i].CurrentDueAmount));
      if(this.grandtotal[i].IsPrized=="Y"){
       
        this.PaymentForm.get(['AmountDetails', i, 'Arrearamount']).setValue(parseFloat(this.grandtotal[i].PrizedArrier));
        num +=(parseFloat( this.grandtotal[i].PrizedArrier))
      }
       else {

        this.PaymentForm.get(['AmountDetails', i, 'Arrearamount']).setValue(parseFloat( this.grandtotal[i].NonPrizedArrier));
        num +=(parseFloat( this.grandtotal[i].NonPrizedArrier))
      }
      num +=(parseFloat(this.grandtotal[i].Interest))
      this.num=num 
      console.log(this.num)
    
   }
   
      
  }
 
  this.total_details=[];
  for(let i=0;i<this.grandtotal.length;i++){
    this.data1=0;
    this.data2=0;
    this.total=0;
    this.data3=0;
    this.data1=parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)
    this.data2 =parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)
    this.data3=parseFloat(this.grandtotal[i].Interest)
    console.log(this.data1)
    this.total += this.data1
    this.total += this.data2
    this.total += this.data3
    this.total_details.push(this.total)
    console.log( this.total_details)
  }

  function colName(n) {
    var ordA = 'a'.charCodeAt(0);
    var ordZ = 'z'.charCodeAt(0);
    var len = ordZ - ordA + 1;
  
    var s = "";
    while(n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s;
  }
  
  // Example:
  this.receiptletters=[]
  for(let n = 0; n < 18278; n++){
    var val=  colName(n)
    this.receiptletters.push(val)
  }
  console.log(this.receiptletters)
  let token=localStorage.getItem('token')
  
this.subscribeServ.Vouchercode(token).subscribe(res=>{
  console.log(res['VoucherCode'],"vouchercode")
  this.Receipt_code=res['VoucherCode']
  console.log(this.Receipt_code)
},(error:HttpErrorResponse)=>{
  if(error.status ===401){ 
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })     
    this.presentToast("Session timeout, please login to continue.");
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){    
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
  })  
  this.presentToast("Session timeout / Server Error! Please login again");
  this.router.navigate(["/login"]);
}
else{
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
  })  
  this.presentToast("Session timeout / Server Error! Please login again");
  this.router.navigate(["/login"]);
 }
})

}

AmountDetail():FormArray{
  return this.PaymentForm.get('AmountDetails') as FormArray
}

newArray():FormGroup{
  return this.formBuilder.group({
    AmountPayable: ['',Validators.required],
    Arrearamount: ['',Validators.required],
    // extraamount:['',[Validators.pattern("^[a-zA-Z0-9]+$")]],
    })
}
addrow(){
  this.AmountDetail().push(this.newArray())
}
// extraamount(i){
//   if(this.PaymentForm.valid){
//     if(this.PaymentForm.get('AmountDetails').value[i].extraamount){
//       this.total_details[i]=parseFloat(this.PaymentForm.get('AmountDetails').value[i].extraamount)+parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)+
//       parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)+parseFloat(this.grandtotal[i].Interest)
   
//     }else{
//       this.total_details[i]=parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)+
//       parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)+parseFloat(this.grandtotal[i].Interest)
//     }
//   }else{
//     this.total_details[i]=parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)+
//     parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)+parseFloat(this.grandtotal[i].Interest)
//   }
//   let sum: number = 0;
//   this.total_details.forEach(a => sum += a);
//   console.log(sum );
//       this.num=sum
//  }
erasedata(){
  console.log(this.payment_details)
this.payment_details=[];
console.log(this.payment_details)
}
//   public submit() {
//    this.newcheck('8')
// }
submit(val){
  console.log(val)
  let memidnew=localStorage.getItem('memberid')
  let token=localStorage.getItem('token')
  this.subscribeServ.duplicantpaymentdetails(token).subscribe(res=>{
    console.log(res)
    let balancetime=res['BalanceExpiration']
    console.log(balancetime)
    if(balancetime>300){
     this.check();
    }else{
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })  
      this.presentToast1("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
    }
  },(error:HttpErrorResponse)=>{
    if(error.status ===401){ 
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })     
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){ 
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })     
    this.presentToast("Session timeout / Server Error! Please login again");
    this.router.navigate(["/login"]);
  }
  else{
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })  
    this.presentToast("Session timeout / Server Error! Please login again");
    this.router.navigate(["/login"]);
   }
})

}

  check(){
    this.totals=0
    let memidnew=localStorage.getItem('memberid')
    let token=localStorage.getItem('token')
    this.upialert()
//     this.subscribeServ.toddayamount(memidnew,token).subscribe(res=>{
//       console.log(res["TotalPaidAmount"])
//       this.todaypaidamount= res['TotalPaidAmount']
//       this.enteramount=this.num
//       if(this.todaypaidamount>-1){
//         this.totals +=this.todaypaidamount
//         this.totals += this.num
//         console.log(this.totals)
//         if(this.totals<200000){
//         // this.payWithRazorpay()
//         this.upialert()
//         }
//         else{
//         this.presentAlertConfirm2();
//         }
//       }}
//       ,(error:HttpErrorResponse)=>{
//         if(error.status ===401){   
//           this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
//           })   
//           this.presentToast("Session timeout, please login to continue.");
//           this.router.navigate(["/login"]);
//        }
//        else if(error.status ===400){    
//         this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
//         })  
//         this.presentToast("Session timeout / Server Error! Please login again");
//         this.router.navigate(["/login"]);
//       }
//       else{
//         this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
//         })  
//         this.presentToast("Session timeout / Server Error! Please login again");
//         this.router.navigate(["/login"]);
//        }
// })
  }

async presentAlertConfirm2() {
  const alert = await this.alertController.create({
  message: 'You have exceeded the Cash limit of ₹2 lakh/day',
  buttons: [
   {
  text: 'Ok',
  role: 'cancel',
  handler: () => {
  }
  }
  ]
  });
  await alert.present();
  }

// payWithRazorpay(){
//   let amount=this.num*100;
//   var options = {
//   description: 'Credits towards consultation',
//   image: 'https://i.imgur.com/3g7nmJC.png',
//   currency: 'INR',
//   key:'rzp_test_j19AUM7dFqeMks',
//   amount:amount,
//   name: 'Acme Corp',
//   theme: {
//     color: '#3399cc'
//       }
//   }
// var successCallback = (success) =>{
// var paymentId = success.razorpay_payment_id
// var signature = success.razorpay_signature
// this.newcheck(paymentId); 


// }
// var cancelCallback = (error) =>{
// // alert(error.description + ' (Error '+error.code+')')
// alert(error.description)
// }
// RazorpayCheckout.on('payment.success', successCallback)
// RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options)
// }
async upialert(){
    
  const alert =await this.alertController.create({
    message:'Make payment through available UPI',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
       }
    },{
      text: 'Ok',
      handler: () =>{
        // this.upiIntegraction()
        this.billdesk()
      }
    }]
  })

  await alert.present();
}

hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
}

showSpinner() {
  document.getElementById('spinner').style.display = 'block';
}

billdesk(){
  let data = {
    "MemberName":"BALA",
    "MemberId": "12345",
    "ChitNumbers": "ML01/1",
    "Amount": "100.00"
}
 this.common.createOrder(data,localStorage.getItem('token')).subscribe(res=> {
  console.log(res)
  var flow_config = {
    merchantId:res['merchantId'],
    bdOrderId:res['bdOrderId'],
    authToken:res['authToken'],
    childWindow:true,
    returnUrl:"http://localhost/dashboard",
    retryCount: 3,
    prefs: {"payment_categories":["card","emi"]}
   }
  var config = {
    merchantLogo: "data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMJcAAht8ZAbQJp9wAAAAASUVORK5CYII=",
    flowConfig: flow_config,
    flowType: "payments"
  };
  this.conf = config
  let data = JSON.stringify(this.conf)
  let navigationExtras: NavigationExtras = {
  queryParams: { state:data },
  skipLocationChange: true
  };
  this.router.navigate(['/subscribe-list/pay'],navigationExtras)
 })
}


upiIntegraction() {
  const tid = this.getRandomString();
  const orderId = this.getRandomString();
  const totalPrice = 5.00;
  const UPI_ID = 'gokuldsp01@oksbi';
  const UPI_NAME = 'Gokul%20Gogul';
  const UPI_TXN_NOTE = 'Finance%20Amount';
  const url = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&tid=${tid}&am=${totalPrice}&cu=INR&tn=${UPI_TXN_NOTE}&tr=${orderId}`;
  const options = {
    action: this.webIntent.ACTION_VIEW,
    url
  };
  console.log(options)
  this.webIntent.startActivityForResult(options).then(success => {
    console.log(success);
    if (success.extras.Status == 'SUCCESS') {
      // SUCCESS RESPONSE
      this.paymentSuccess(orderId, 'UPI');
    } else if (success.extras.Status == 'SUBMITTED') {
      this.paymentSuccess(orderId, 'UPI');
      // SUBMITTED RESPONSE
    } else if (success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
      // FAILED RESPONSE
    } else {
      // FAILED RESPONSE
    }
  }, error => {
    console.log(error);
  });
}
getRandomString() {
  const len = 10;
  const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
  let ans = '';
  for (let i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}
paymentSuccess(orderId: string, paymentMethod: string) {
  alert(`Payment successful Order Id ${orderId} payment method ${paymentMethod}`);
  this.newcheck(orderId); 
}
async newcheck(payment){
  const loading = await this.loadingController.create({
    message: 'Please Wait',
    translucent: true,
  });
  await loading.present();
  this.nedate = new Date();
  // this.day = moment(this.nedate.toLocaleString()).format("DD");
  // this.month = moment(this.nedate.toLocaleString()).format("MM");
  // this.year = moment(this.nedate.toLocaleString()).format("YYYY");

  //this.day=d.getDate();
  //this.month=d.getMonth()+1;
  //this.year=d.getFullYear();
  this.currentdate=this.month+"/"+this.day+"/"+this.year;
  this.getvouchercount=(JSON.parse(localStorage.getItem("voucher")))
  this.count=this.getvouchercount
  console.log(this.getvouchercount)
  this.personal=(JSON.parse(localStorage.getItem("personaldatas")))
  console.log(this.personal)
  console.log(this.grandtotal,"ghjg")
  for(let i=0;i<this.grandtotal.length;i++){
   //let receiptno= this.grandtotal[i].BranchName.substring(0,3).toUpperCase()
   let id=this.personal[0].MemberID
   this.count +=1
   if(this.count>9999999){
    this.count=1;
    this.Receipt_code +=1
   }
  let number=this.padLeadingZeros(this.count, 7);
  //  this.no=this.count
   this.vouchercounts=number
   let customer="C-PAL-"
   let receiptcount=this.receiptletters[this.Receipt_code].toUpperCase()
   this.receiptno.push(customer+receiptcount+number)
   console.log(this.receiptno)
  }
  // this.enteramounts=[];
  // for(let i=0;i<this.grandtotal.length;i++){
  //   if(this.PaymentForm.get('AmountDetails').value[i].extraamount.length !=0){
  //   this.enteramounts.push(this.PaymentForm.get('AmountDetails').value[i].extraamount)
  //    }else{
  //      this.enteramounts.push(0)
  //    }}
  for(let i=0;i<this.grandtotal.length;i++){
  if(this.grandtotal[i].PrizedArrier != 0 ){
  
  this.payment_data = [
  {
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].PrizedArrier,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "Card",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    CurrentDue:this.grandtotal[i].CurrentDueAmount,
    //Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
  },
  {
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].PrizedArrier,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "Card",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    CurrentDue:this.grandtotal[i].CurrentDueAmount,
    //Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].Interest,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].Interest,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
  //  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    }
  ]
  }
  else if(this.grandtotal[i].NonPrizedArrier != 0){
    
  this.payment_data = [
  {
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].NonPrizedArrier,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "Card",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    CurrentDue:this.grandtotal[i].CurrentDueAmount,
    //Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].NonPrizedArrier,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "Card",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    CurrentDue:this.grandtotal[i].CurrentDueAmount,
    //Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: +this.grandtotal[i].Interest,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
   },
  {
    Amount: this.grandtotal[i].Interest,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    }
  ]
  }
  else{
  this.payment_data = [
  {
    Amount: this.grandtotal[i].CurrentDueAmount,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "Card",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    CurrentDue:this.grandtotal[i].CurrentDueAmount,
    //Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].CurrentDueAmount,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "Card",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    CurrentDue:this.grandtotal[i].CurrentDueAmount,
    //Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].Interest,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].Interest,
    AppReceiptno: this.receiptno[i],
    BranchID:this.personal[0].BranchId,
    ChitGroupId:this.grandtotal[i].ChitGroupId,
    Head_Id:this.grandtotal[i].Head_Id,
    ISActive:true,
    IsAccepted:"0",
    IsDeleted:0,
    M_Id:this.grandtotal[i].MoneyCollId, 
    MemberID: this.personal[0].MemberIDNew,
    MoneyCollId:this.grandtotal[i].MoneyCollId,
    
    Other_Trans_Type:1,
    ReceievedBy: "admin",
    RootID: "",
    Series:"CPAPP",
    T_Day: format(new Date(this.nedate), "dd"),
    T_Month: format(new Date(this.nedate), "MM"),
    T_Year: format(new Date(this.nedate), "yyyy"),
    Trans_Medium:"0",
    Trans_Type: "1", 
    TransactionKey:0, 
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    }
  ]
  
  }
  this.cashdata.push(this.payment_data);
  console.log(this.cashdata,"cash")
  this.cashdata1 = [].concat.apply([], this.cashdata);
  for (let i = this.cashdata1.length - 1; i >= 0; --i) {
  if (this.cashdata1[i].Amount == "0") {
  this.cashdata1.splice(i, 1);
  }
  console.log(this.cashdata1,"intewre")
  }
}
let token=localStorage.getItem("token")
  this.subscribeServ.makepayment(this.cashdata1,token).subscribe(res=>{
     console.log(res)
     if(res){
      localStorage.setItem("receipt",JSON.stringify(res))
      this.router.navigate(["/subscribe-list/payment-success"])
      loading.dismiss()
      this.presentToast('Saved successfully')
     }
    //  let navigationExtras: NavigationExtras = {
    //    queryParams: { states:JSON.stringify(res)},
       
    //  };
    // this.router.navigate(["/subscribe-list/payment-success"],navigationExtras)
    },(error:HttpErrorResponse)=>{
      if(error.status ===401){     
        loading.dismiss()     
        this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
        })  
        this.presentToast("Session timeout, please login to continue.");
        this.router.navigate(["/login"]);
     }
     else if(error.status ===400){   
      loading.dismiss()     
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })  
      this.presentToast("Session timeout / Server Error! Please login again");
      this.router.navigate(["/login"]);
    } 
  
    else{
      loading.dismiss()
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })  
      this.presentToast("Session timeout / Server Error! Please login again");
      this.router.navigate(["/login"]);
     }})
  
}
async presentToast(message) {
  const toast = await this.toastController.create({
      message: message,
      duration: 2000
   });
    toast.present();
}
async presentToast1(message) {
  const toast = await this.toastController.create({
      message: message,
      duration: 3000
   });
    toast.present();
}
padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}
indianRupeeFormat(val: number) {
  return Number(val).toLocaleString('en-IN');
}
}