import { Injectable } from '@angular/core';
// import {Task} from '../Task';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

// import{of}
@Injectable({
  providedIn: 'root'

})
export class DataService {
  sharedData:any;
  data:any;
  private apiUrl = "http://127.0.0.1:8000/kytube/data/"
  constructor(private http:HttpClient) { }
  getData():Observable<any>{
    return this.http.get<any>(this.apiUrl, httpOptions)
  }
  getSharedData(){
    console.log(this.sharedData)
    return this.sharedData
  }
  getGroupData(groups:any):Observable<any>{
    let posthttpOptions = {
      params:new HttpParams().set('title', 'Groupwise')
      .append('groups', JSON.stringify(groups)).append('userid', 'User1')
    }
    return this.http.post<any>(this.apiUrl, posthttpOptions)
  }
}