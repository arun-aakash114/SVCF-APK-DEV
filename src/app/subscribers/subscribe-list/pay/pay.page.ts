import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  config_data: any;
  payment : any;
  htmlfile : any =
  `<!DOCTYPE html>
  <html lang="en">
  
  <head>
   
  
  </head>
  
  <body>
    <div class="container">
      <div class="jumbotron mt-3">
        <h1>BillDesk SDK</h1>
        <a class="btn btn-lg btn-primary"  onclick="callBilldesk()" role="button">Launch D»</a>
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
   
    <link href="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.css" rel="stylesheet">
   
  </body>
  
  </html>`
  constructor(private route: ActivatedRoute,private sanitizer:DomSanitizer,public router:Router,private iab: InAppBrowser) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.config_data = JSON.parse(params.state)
      console.log(this.config_data)
      // this.htmlfile = 'data:text/html;base64,' + btoa(this.htmlfile );
      const browser = this.iab.create(this.htmlfile, "_self", {
        location: 'no',
        clearcache: 'yes',
        hardwareback: 'no',
      });
      // browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      //   console.log(event)
      // });
      // let target = "_self";
      // const url = 'http://localhost:8100/pay'
      // this.iab.create(url,target)
    })
  }
  public getSafehtml(html:any,config_data:any){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  back(){
    this.router.navigate(["/subscribe-list"])
      }

      callBilldesk(){
        console.log('gokul')
        // this.payment.loadXMLDoc();
        // var successCallback = (success) =>{
// var paymentId = success.razorpay_payment_id
// var signature = success.razorpay_signature
// this.newcheck(paymentId); 


// }
      }
}
