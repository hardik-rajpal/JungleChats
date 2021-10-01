import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class JcsnippetsService {

  // apiURl = 'http://127.0.0.1:8000/thejungle/snips/';
  apiURl = 'http://kythr.herokuapp.com/thejungle/snips/';
  
  constructor(private http:HttpClient) { }
  getSnippets():Observable<any>{
    return this.http.get(this.apiURl, httpOptions);
  }
}
