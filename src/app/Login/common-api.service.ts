import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tokenName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) { }

loginCredentials(name,password){
    return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'login?userName='+name+'&&password='+password)
}

requestOtp(otp_request){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'ForgotPassword?userName='+otp_request)
}

otpVerification(otp){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'set backend endpoint?optvalue='+otp)
}

resetPassword(username,password){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'PasswordSet?password='+password+' &userName='+username)
}
sameUsername(user){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'GetUserName?userName='+user)
}
sameMobileNumber(member1){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'GetPassword?MemberIDNew='+member1)
}
reset(id,name,password,dob){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/'+'RestPassword?MemberIDNew='+id+"&&userName="+name+'&&Password='+password+'&&DOB='+dob)
}
usertype(username){
  return this.http.get('https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/AppForgotPassword?userName='+username+'')
}
logout(id){
  return this.http.get('https://api.sreevisalam.com/api/SVCFAPI/'+'UpdateLogoutStatus?id='+id)
}

createOrder(payload,token){
  return this.http.post('https://api.sreevisalam.com/api/SVCFAPI/'+'CreateOrder?token='+token,payload)
}
launchSdk(merchantid,orderid,tokName,child,urlret,count){
  return this.http.get('https://uat.billdesk.com/jssdk/v1/dist/'+'flow_config?merchantId='+merchantid+"&&bdOrderId="+orderid+'&&authToken='+tokName+'&&childWindow='+child+'&&retrunUrl='+urlret+'&&retryCount='+count)
}
}

