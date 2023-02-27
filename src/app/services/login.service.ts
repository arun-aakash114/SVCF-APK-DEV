import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  user_authentication(username,password,id){
    return this.http.get('https://emp.sreevisalam.com/SVCF_Service/Service1.svc/'+'moneycollectorlogin/username?username='+username +'&Password=' +password +'&Deviceid=' +id)

  }
}
