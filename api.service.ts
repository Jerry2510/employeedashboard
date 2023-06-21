import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public loginAPIUrl: string = "https://localhost:44330/api/Login/"
  public employeeAPIUrl: string = "https://localhost:44330/api/Employee/"
  constructor(private http: HttpClient) { }

  postEmployee(data:any)
  {
    return this.http.post<any>(this.employeeAPIUrl+"add_employee",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee()
  {
    return this.http.get<any>(this.employeeAPIUrl+"get_employees")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEmployee(data:any,id:number)
  {
    return this.http.put<any>(this.employeeAPIUrl+"Update_employee",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id : number)
  {
     return this.http.delete<any>("https://localhost:44330/api/Employee/delete_employee/"+id)
     .pipe(map((res:any)=>{
        return res;
     }))
  }
  signUp(data:any){
    return this.http.post<any>(this.loginAPIUrl+"signup",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  login(data:any){
    return this.http.post<any>(this.loginAPIUrl+"login",data).pipe(map((res:any)=>{
      //console.log("response from api is ",res);
      return res;
    }))
  }
  
}
