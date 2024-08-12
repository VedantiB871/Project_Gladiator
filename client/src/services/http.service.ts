import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName=environment.apiUrl;
//todo: complete missing code..
constructor(private http: HttpClient, private authService:AuthService ){}

private getHeaders(): HttpHeaders {
  const token = this.authService.getToken();
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}

UpdateOrderStatus(newStatus: any, orderId:any): Observable<any>{
  const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put<any>(this.serverName+'/api/supplier/order/update/'+orderId+'?newStatus='+newStatus,{},{headers:headers});
}

// UpdateOrderStatus(id: any, newStatus: any): Observable<any>{

//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`)
//    return this.http.put<any>(this.serverName+'/api/supplier/order/update/'+id+'?newStatus='+newStatus, {},{headers:headers});
// }

addEquipment(details: any,hospitalId: any):Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.post<any>(`${this.serverName}/api/hospital/equipment?hospitalId=${hospitalId}`, details,{headers:headers});
}


getorders():Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.get(`${this.serverName}/api/supplier/orders`,{headers:headers});
}

getMaintenance(): Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.get(`${this.serverName}/api/technician/maintenance`,{headers:headers});
}

getHospital(): Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.get(`${this.serverName}/api/hospitals`,{headers:headers});
}

getEquipmentById(hospitalId: any): Observable<any[]>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.get(`/api/hospital/equipment/${hospitalId}`,{headers:headers}).pipe(
    map((data:any)=>{
      if(Array.isArray(data)){
        return data;
      }
      else{
        return [data];
      }
    })
  );
}

updateMaintenance(details: any, maintenanceId: any): Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.put(this.serverName+'/api/technician/maintenance/update/'+maintenanceId, details,{headers:headers});
}

orderEquipment(details:any, equipmentId: any): Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.post(this.serverName+'/api/hospital/order?equipmentId='+equipmentId, details,{headers:headers});
}

scheduleMaintenance(details:any,equipmentId:any): Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.post(this.serverName+'/api/hospital/maintenance/schedule?equipmentId='+equipmentId, details,{headers:headers});
}

createHospital(hospital: any): Observable<any>{
  const authToken = this.authService.getToken();
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Authorization', `Bearer ${authToken}`);
  return this.http.post(`${this.serverName}/api/hospital/create`, hospital,{headers:headers});
}

Login(loginRequest: any): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(`${this.serverName}/api/user/login`,loginRequest,{headers:headers});

}

registerUser(user:any):Observable<any> {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  return this.http.post(`${this.serverName}/api/user/register`,user,{headers:headers});
}

  
}
