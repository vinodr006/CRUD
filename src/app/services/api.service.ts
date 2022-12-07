import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }
  postdata(data : any){
    return this.http.post<any>("http://localhost:4000/create",data);
  }
  getdata(){
    return this.http.get<any>("http://localhost:4000/");
  }
  
  updatedata(data:any){
    return this.http.put<any>("http://localhost:4000/update/:id",data);
  }

  deletedata(){
    return this.http.delete<any>("http://localhost:4000/delete/:id");
  }
}
