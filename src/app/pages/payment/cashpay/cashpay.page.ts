import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PaymentService } from '../../../services/payment.service';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import {format} from "date-fns";
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Toast } from '@ionic-native/toast/ngx';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
selector: 'app-payment',
templateUrl: './cashpay.page.html',
styleUrls: ['../payment.page.scss'],
})
export class CashPayPage implements OnInit {
today = Date.now();
submitForm: FormGroup;
new_id: any
cash_print_preview:any;
new: any;
new_value: any;
edit_value: any;
new_array: any = [];
cashpdata: any;
grandtotal1:any;
nedate: any;
day: any;
month: any;
year: any;
new10: any;
sampletest_check:any;
cashdata: any = [];
cashdat: any = [];
sampletest: any;
cashdata1: any = [];
cashdata2: any = [];
pdata: any;
count: any = 1111;
branch1: any = [];
branch_new: any;
head: any;
api_id:any=[];
sampletest1: any;
sampledata: any = [];
trigger:number=0;
sampledata1: any = [];
num: any;
vnum: any;
print_cash_page:any;
receipt_res: any;
num1: any = [];
vnum1: any = [];
ReceiptTable: any;
res_status: any;
ReceiptTable1: any = [];
sampleinterest: any = [];
message: any;
voucher_res: any;
sampletestcheck: any = [];
voucher_print: any;
second_voucher: any;
newarr: any;
isLoading = false;
post_id:any;
grand_total:any;
new_total:any=[];
result:any;
receipt_name:any;
trigger_sum:any;
new_name:any;
voucher_count:any;
newvoucher_count:any;
B_Groups: any=[];
  arraydata: any=[];
  Receipt_code: any;
  todaypaidamount: any;
  totals: number;
  todayvalue: any;
  userdata: any=[];
  total1: boolean;
  mobileForm: FormGroup;
constructor(private fb: FormBuilder,public dashboardservice:DashboardService,private toast: Toast,private http: HttpClient, public loadingController: LoadingController, private router: Router, private route: ActivatedRoute, public paymentservice: PaymentService) {
this.route.queryParams.subscribe(params => {
if (this.router.getCurrentNavigation().extras.state) {
this.new = this.router.getCurrentNavigation().extras.state.user6;
this.new10 = this.router.getCurrentNavigation().extras.state.user10;
console.log(this.new10)
this.B_Groups=[]
for (let i = 0; i < this.new10.length; i++) {
  this.B_Groups.push(this.new10[i].B_Group)
this.branch_new = (this.new10[i].BranchID);
this.head = (this.new10[i].headID);
this.branch1.push(this.branch_new);
this.sampletest1 = [{
BranchID: this.new10[i].BranchID,
HeadID: this.new10[i].headID
}]
this.sampledata.push(this.sampletest1);
this.sampledata1 = [].concat.apply([], this.sampledata);
}
this.new_array = this.new;
console.log(this.new_array)
}
})
}
ngOnInit() {
  // console.log(Date.now)
  console.log(this.day,this.month,this.year)
  let token1=localStorage.getItem("tokens");
  this.userdata=JSON.parse(localStorage.getItem("user2"))
  let id=this.userdata["MemberID"]
  
  this.totals=0;
  this.todayvalue=localStorage.getItem("totalamounts")
  this.total1=true
  this.paymentservice.toddayamount(id,token1).subscribe(res=>{
    this.todaypaidamount= res
    console.log(this.todaypaidamount, "total3")
if(this.todaypaidamount>-1){
    this.totals +=parseFloat (this.todaypaidamount)
    this.totals += parseFloat(this.todayvalue.replace(/,/g,''))
    console.log(this.totals)
    if(this.totals<190000){
    this.total1=true
    }
    else{
      this.total1=false
    }
  }
  console.log(this.total1)
}
,(error:HttpErrorResponse)=>{
  if(error.status ===401){        
    this.presentToast("Session timeout, please login to continue.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){      
  this.presentToast("Session timeout / Server Error! Please login again");
  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
  })
  this.router.navigate(["/login"]);
}

})



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
  this.arraydata=[]
  for(let n = 0; n < 18278; n++){
    var val=  colName(n)
    this.arraydata.push(val)
  }
  console.log(this.arraydata)



 let token=localStorage.getItem("tokens");
 let colid = localStorage.getItem("col_id")
 if(this.new_array[0].bankname){
      this.paymentservice.Vouchernumforcheq(this.new_array[0].branchid,colid,token).subscribe(res=>{
        console.log(res)
        this.count=res;
      })
      this.voucher_count = 0
      this.Receipt_code = 0
 }else {
  this.paymentservice.receiptseries('BCAPP',colid,token).subscribe(res=>{
    this.voucher_count=res;
    console.log(this.voucher_count)
    },(error:HttpErrorResponse)=>{
      if(error.status ===401){           
        this.presentToast("Session timeout, please login to continue.");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
     }
     else if(error.status ===400){         
      this.presentToast("Session timeout / Server Error! Please login again");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
    } 
    
    })
    this.paymentservice.receiptseries1('BCAPP',colid,token).subscribe(res=>{
      this.Receipt_code=res;
      console.log(this.Receipt_code)
      },(error:HttpErrorResponse)=>{
        if(error.status ===401){          
          this.presentToast("Session timeout, please login to continue.");
          this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
          })
          this.router.navigate(["/login"]);
       }
       else if(error.status ===400){         
        this.presentToast("Session timeout / Server Error! Please login again");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
      }
      
      })
 }

var num=0;
this.result = this.new_array.map(function(el) {
var o = Object.assign({}, el);
o.total = +el.amountpayable.replace(/,/g,'') + +el.interest.replace(/,/g,'') + +el.otheramount.replace(/,/g,'');
o.total1=Number(parseFloat(o.total).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
})
return o;
})
console.log(this.result,"res")
for (let i=0;i<this.result.length;i++){
  if(this.result[i].interest != "" && this.result[i].otheramount == ""){
    this.result[i].otheramount=0;
  }
  else if(this.result[i].otheramount != "" && this.result[i].interest == ""){
    this.result[i].interest=0;
  }
  else if(this.result[i].interest == "" && this.result[i].otheramount== ""){
    this.result[i].interest=0;
    this.result[i].otheramount=0;
  }
  else if(this.result[i].amountpayable == ""){
    this.result[i].amountpayable=0;

  }
  num+=(parseFloat( this.result[i].total))
  this.grand_total=num;
    this.grandtotal1=Number(parseFloat(this.grand_total).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
})
  }

  this.post_id= localStorage.getItem('col_id')
  this.nedate = new Date();
  // this.day = moment(this.nedate.toLocaleString()).format("DD");
  // this.month = moment(this.nedate.toLocaleString()).format("MM");
  // this.year = moment(this.nedate.toLocaleString()).format("YYYY");
  this.submitForm = new FormGroup({
  formArrayName: this.fb.array([])
  })
  this.buildForm1();
  }
  buildForm1() {
  const controlArray = this.submitForm.get('formArrayName') as FormArray;
  this.mobileForm = this.fb.group({
    mobilenumber: ['', [Validators.required,Validators.pattern("[0-9]{10}")]],
    // mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
    })
  Object.keys(this.result).forEach((i) => {
  controlArray.push(
  this.fb.group({
  branchprefix: new FormControl(this.result[i].branchprefix, Validators.required),
  branchname: new FormControl(this.result[i].branchname, Validators.required),
  groupno: new FormControl(this.result[i].groupno, Validators.required),
  totalchit: new FormControl(this.result[i].totalchit, Validators.required),
  branchid: new FormControl(this.result[i].branchid, Validators.required),
  memberid: new FormControl(this.result[i].memberid, Validators.required),
  m_id: new FormControl(this.result[i].m_id, Validators.required),
  rootid: new FormControl(this.result[i].rootid, Validators.required),
  headid: new FormControl(this.result[i].headid, Validators.required),
  chitgroupid: new FormControl(this.result[i].chitgroupid, Validators.required),
  agreement: new FormControl(this.result[i].agreement, Validators.required),
  installment: new FormControl(this.result[i].installment, Validators.required),
  amountreceived: new FormControl(Number(this.new_array[i].amountreceived).toLocaleString('en-IN')),
    amountpayable: new FormControl(Number(this.new_array[i].amountpayable).toLocaleString('en-IN')),

  prizedarrear: new FormControl(this.new_array[i].prizedarrear),
  nonprizedarrear: new FormControl(this.new_array[i].nonprizedarrear),
  interest: new FormControl(this.result[i].interest),
  otheramount: new FormControl(Number(this.result[i].otheramount).toLocaleString('en-IN')),
  bankname : new FormControl((this.result[i].bankname ? this.result[i].bankname:'')),
  customerbankname : new FormControl((this.result[i].customerbankname ? this.result[i].customerbankname:'')),
  chequenumber : new FormControl((this.result[i].chequenumber ? this.result[i].chequenumber:'')),
  chequedate : new FormControl((this.result[i].chequedate ? format(new Date(this.result[i].chequedate), "yyyy/MM/dd"): '')),
  mobilenumber : new FormControl('')
  // narration: new FormControl(this.result[i].narration)
  })
  )
  })
  console.log(controlArray)
  }
  previous() {
  this.router.navigateByUrl('/payment/cash')
  }
  edit() {
  let navigationExtras: NavigationExtras = {
  state: {
  user7: true,
  user8: this.new_array
  }
  };
  this.router.navigate(['payment/cash'], navigationExtras);
  }


submitfunction(s){
   
    if(this.totals<190000 && this.total1==true){
    this.submitcash(s);
    }
    else{
      console.log("max limit")
      this.presentToast1("You have exceeded the Cash limit of ₹1,90,000/day")
    }
  
}

 submitcash(s) {
  this.present()
 this.sampletest = s.formArrayName;
  console.log(this.sampletest)
  var pattern=new RegExp(('[0-9]{10}') ||('[0-9]{11}'));
  if(this.mobileForm['value']['mobilenumber'] == ""){
    this.dismiss();
    this.presentToast("Please enter Mobile Number");
  }
  else if(pattern.test(this.mobileForm['value']['mobilenumber']) == true && this.mobileForm.valid){
    // console.log(pattern.test(this.sampletest[0].mobilenumber))
    this.paymentservice.cash_details(this.sampledata1,localStorage.getItem("tokens")).subscribe(res => {
      console.log(res);
      this.receipt_res = res;
      if (this.receipt_res != null) {
      for (let i = 0; i < this.receipt_res.length; i++) {
      console.log(this.receipt_res[i].AlreadyusedNo);
      this.num = this.receipt_res[i].AlreadyusedNo + 1;
      this.vnum = this.receipt_res[i].BranchName + '' + this.num;
      this.num1.push(this.num);
      console.log(this.num1);
      this.vnum1.push(this.vnum)
      console.log(this.vnum1)
      this.ReceiptTable = {
      "AlreadyusedNo": this.num,
      "BranchID": this.receipt_res[i].BranchID,
      "HeadID": this.receipt_res[i].HeadID,
      "BranchName": this.receipt_res[i].BranchName,
      "From": this.receipt_res[i].From,
      "ID": this.receipt_res[i].ID,
      "Isfinished": this.receipt_res[i].Isfinished,
      "To": this.receipt_res[i].To,
      "VoucherCode": this.receipt_res[i].VoucherCode,
      "VoucherNumber": this.vnum
      };
      console.log(this.ReceiptTable);
      this.ReceiptTable1.push(this.ReceiptTable);
      console.log(this.ReceiptTable1);
      }
      this.paymentservice.receipt_update(this.ReceiptTable1,localStorage.getItem("tokens")).subscribe(res => {
      console.log(res);
      this.res_status = res;
      console.log(this.res_status)
      if (this.res_status == 0) {
      for (let obj of this.sampletest) {
      console.log("object:", obj);
      for (let key in obj) {
      }
      }
      for (let i = 0; i < this.sampletest.length; i++) {
       
      this.sampletest[i].prizedarrear = this.sampletest[i].prizedarrear.replace(/,/g, '');
      this.sampletest[i].nonprizedarrear = this.sampletest[i].nonprizedarrear.replace(/,/g, '');
      this.sampletest[i].amountreceived = this.sampletest[i].amountreceived.replace(/,/g, '');
    if(this.sampletest[i].amountpayable != ""){
      this.sampletest[i].amountpayable= this.sampletest[i].amountpayable.replace(/,/g, '');
    
    }
    else{
      this.sampletest[i].amountpayable =0;
    }
    console.log(this.sampletest[i].interest)
    
      // var strFirstThree = this.sampletest[i].branchprefix.substring(0,3).toUpperCase();;
      var strFirstThree = this.sampletest[i].branchprefix;
      this.voucher_count +=1
    
      if(this.voucher_count>9999999){
        this.voucher_count=1;
        this.Receipt_code +=1
    }
      let number=this.padLeadingZeros(this.voucher_count, 7);
      this.newvoucher_count=number;
      console.log(this.newvoucher_count,"dashb")
      this.new_name=strFirstThree;
      //this.voucher_count=this.voucher_count+1;
      console.log(this.trigger,"trigg")
      let receiptcount=this.arraydata[this.Receipt_code].toUpperCase()
      this.receipt_name='B' + '-'+ this.new_name+localStorage.getItem('col_id')+'-'+receiptcount+ this.newvoucher_count;
      console.log(this.receipt_name,"rec")
      if(this.sampletest[i].prizedarrear !=0 ){
      this.cashpdata = [
      {
      "Amount": this.sampletest[i].amountpayable,
      "PArrear":this.sampletest[i].prizedarrear,
      "CurrentDue":this.sampletest[i].amountreceived,
      "B_Group":this.B_Groups[i],
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,            //member id converted to m_id
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "C",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid ,
      "M_Id": this.sampletest[i].memberid,
      "Type": this.new_array[0].bankname ? "Cheque" : "Cash",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": this.sampletest[i].amountpayable,
        "CurrentDue":this.sampletest[i].amountreceived,
        "B_Group":this.B_Groups[i],
      "PArrear":this.sampletest[i].prizedarrear,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "IsAccepted": "0",
      "Voucher_Type": "D",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1 ,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": this.new_array[0].bankname ? "Cheque" : "Cash",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
      "Interest":this.sampletest[i].interest,
      "B_Group":this.B_Groups[i],
      "OtherAmt":this.sampletest[i].otheramount,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "C",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": "DefaultInterest",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankName":this.sampletest[i].bankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
      "Interest":this.sampletest[i].interest,
      "B_Group":this.B_Groups[i],
      "OtherAmt":this.sampletest[i].otheramount,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "D",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": "DefaultInterest",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankName":this.sampletest[i].bankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      }
      ]
      }
      else if(this.sampletest[i].nonprizedarrear != 0){
      this.cashpdata = [
      {
      "Amount": this.sampletest[i].amountpayable,
      "CurrentDue":this.sampletest[i].amountreceived,
      "B_Group":this.B_Groups[i],
      "NPArrear":this.sampletest[i].nonprizedarrear,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "C",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": this.new_array[0].bankname ? "Cheque" : "Cash",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": this.sampletest[i].amountpayable,
      "CurrentDue":this.sampletest[i].amountreceived,
      "B_Group":this.B_Groups[i],
      "NPArrear":this.sampletest[i].nonprizedarrear,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "IsAccepted": "0",
      "Voucher_Type": "D",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": this.new_array[0].bankname ? "Cheque" : "Cash",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
      "Interest":this.sampletest[i].interest,
      "OtherAmt":this.sampletest[i].otheramount,
      "B_Group":this.B_Groups[i],
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "C",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": "DefaultInterest",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
      "Interest":this.sampletest[i].interest,
      "B_Group":this.B_Groups[i],
      "OtherAmt":this.sampletest[i].otheramount,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "D",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": "DefaultInterest",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankName":this.sampletest[i].bankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      }
      ]
      }
      else{
      this.cashpdata = [
      {
      "Amount": this.sampletest[i].amountpayable,
        "CurrentDue":this.sampletest[i].amountreceived,
        "B_Group":this.B_Groups[i],
      "NPArrear":this.sampletest[i].nonprizedarrear,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "C",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": this.new_array[0].bankname ? "Cheque" : "Cash",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": this.sampletest[i].amountpayable,
       "CurrentDue":this.sampletest[i].amountreceived,
       "B_Group":this.B_Groups[i],
      "NPArrear":this.sampletest[i].nonprizedarrear,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "IsAccepted": "0",
      "Voucher_Type": "D",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": this.new_array[0].bankname ? "Cheque" : "Cash",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
      "Interest":this.sampletest[i].interest,
      "B_Group":this.B_Groups[i],
      "OtherAmt":this.sampletest[i].otheramount,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "C",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": "DefaultInterest",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      },
      {
      "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
      "Interest":this.sampletest[i].interest,
      "B_Group":this.B_Groups[i],
      "OtherAmt":this.sampletest[i].otheramount,
      "IsDeleted": 0,
      "MemberID": this.sampletest[i].m_id,
      "ReceievedBy": "admin",
      "Series": this.new_array[0].bankname ? "CHEQUE":"BCAPP",
      "T_Day": format(new Date(this.nedate), "dd"),
      "T_Month": format(new Date(this.nedate), "MM"),
      "T_Year": format(new Date(this.nedate), "yyyy"),
      "Trans_Medium": "0",
      "Trans_Type": "1",
      "TransactionKey": 0,
      "Voucher_No": this.count + 1,
      "Voucher_Type": "D",
      "IsAccepted": "0",
      "AppReceiptno": this.new_array[0].bankname ? "" : this.receipt_name,
      "ISActive": true,
      "BranchID": this.sampletest[i].branchid,
      "ChitGroupId": this.sampletest[i].chitgroupid,
      // "Narration": this.sampletest[i].narration,
      "Head_Id": this.sampletest[i].headid,
      "Other_Trans_Type": this.new_array[0].bankname ? 0 : 1,
      "RootID": this.new_array[0].bankname ? "3" : this.sampletest[i].rootid,
      "M_Id": this.sampletest[i].memberid,
      "Type": "DefaultInterest",
      "MoneyCollId":this.post_id,
      "VoucherCount":this.newvoucher_count,
      "VoucherCode":this.Receipt_code,
      "BankName":this.sampletest[i].bankname,
      "CustomerBankName":this.sampletest[i].customerbankname,
      "BankHeadID":this.result[0].bankheadid,
      "ChequeNo":this.sampletest[i].chequenumber,
      "ChequeDate":this.sampletest[i].chequedate
      }
      ]
      
      }
      console.log(this.cashpdata)
      this.cashdata.push(this.cashpdata);
      this.cashdata1 = [].concat.apply([], this.cashdata);
      for (let i = this.cashdata1.length - 1; i >= 0; --i) {
      if (this.cashdata1[i].Amount == "0") {
      this.cashdata1.splice(i, 1);
      }
      }
      }
      if(this.cashdata1){
        this.cashfunction(this.cashdata1)
      }
     
      }
      else {
      // alert('error');
      // loading.dismiss();
      this.dismiss();
      }
      } ,(error:HttpErrorResponse)=>{
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
       }else{
        this.dismiss();
        this.presentToast("Session timeout / Server Error! Please login again");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
       }
      })
      }
     
    
    
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
       }else{
        this.dismiss();
        this.presentToast("Session timeout / Server Error! Please login again");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
       }
      })
    
  } else {
    this.dismiss();
    this.presentToast("Enter Valid Mobile Number");

  }
 
}

cashfunction(data:any){
  this.paymentservice.verify_collector(localStorage.getItem("col_id")).subscribe((res) => {
    if(res == 0){
      if(this.new_array[0].bankname){

        this.paymentservice.post_vouchercash(data,localStorage.getItem("tokens"),Number(this.mobileForm['value']['mobilenumber'])).subscribe((res:Observable<any>) => {
          if(res){
            this.voucher_res = res;
            this.dismiss();
        this.presentToast("Cheque Data submited successfully")
        this.router.navigate(['/dashboard'])
          }
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
       }else{
        this.dismiss();
        this.presentToast("Session timeout / Server Error! Please login again");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
       }
      })
        
      }else {
        this.paymentservice.post_vouchercash(data,localStorage.getItem("tokens"),Number(this.mobileForm['value']['mobilenumber'])).subscribe((res:Observable<any>) => {
          if(res){
            this.voucher_res = res;
            this.dismiss();
            this.presentToast('sucessfully updated');
             let navigationExtras: NavigationExtras = {
              queryParams: { state:JSON.stringify(this.voucher_res )},
              // skipLocationChange: true
              };
              // JSON.stringify(this.voucher_res)
              // this.cash_print_preview = JSON.parse(this.voucher_res)
      console.log(this.cash_print_preview)
      this.api_id=[]
      let token=localStorage.getItem("tokens");
      for(let i=0;i<this.voucher_res?.length;i++){
        this.api_id.push(this.voucher_res[i]['ID']);
        }
         this.paymentservice.print_details(this.api_id,token).subscribe(res=>{
          console.log(res)
        this.print_cash_page=res;
        this.paymentservice.mobdetails(this.mobileForm['value']['mobilenumber'],this.print_cash_page).subscribe(res=>{
          console.log(res)
      if(res=="OK"){
        this.presentToast("Receipt SMS successfully send to the mobile number.")
        this.router.navigate(['/cashprint'],navigationExtras)
      }else{
        this.presentToast("Receipt SMS not send to the mobile number.")
      }
        }
        ,(error:HttpErrorResponse)=>{
         if(error.status ===400){      
          this.dismiss();     
          this.presentToast("Session timeout / Server Error! Please login again");
          this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
          })
          this.router.navigate(["/login"]);
       }
       
      })
        }
        ,(error:HttpErrorResponse)=>{
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
       
        }
        
        )
            
          }
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
       }else{
        this.dismiss();
        this.presentToast("Session timeout / Server Error! Please login again");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
       }
      })
      }
    }else if(res==1){
      this.dismiss();
      this.presentToast("Sorry you have been blocked,Please contact admin");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
    }
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
     }else{
      this.dismiss();
      this.presentToast("Session timeout / Server Error! Please login again");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
     }
     })


}

  logout() {
  this.router.navigateByUrl('login');
  localStorage.clear();
  }
  async present() {
  this.isLoading = true;
  return await this.loadingController.create({
  message: 'Saving data, Please wait.....'
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
  padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
  }
  async presentToast(message) {
  this.toast.show(message, '2000', 'bottom').subscribe(
  toast => {
  console.log(toast);
  });
  }
  async presentToast1(message) {
    this.toast.show(message, '3000', 'bottom').subscribe(
    toast => {
    console.log(toast);
    });
    }

    indianRupeeFormat(val: number) {
      return Number(val).toLocaleString('en-IN');
    }
  }

