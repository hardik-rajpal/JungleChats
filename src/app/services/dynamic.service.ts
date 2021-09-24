import { Injectable } from '@angular/core';
// import {Task} from '../Task';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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
  private apiUrl = "http://127.0.0.1:8000/kytube/data/"
  constructor(private http:HttpClient) { }
  getData():Observable<any>{
    return this.http.get<any>(this.apiUrl, httpOptions)  
  }
  getGroupData():Observable<any>{
    return this.http.post<any>(this.apiUrl, httpOptions)
  }
}