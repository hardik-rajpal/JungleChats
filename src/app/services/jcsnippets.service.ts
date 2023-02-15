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

  // apiURl = 'http://127.0.0.1:8000/thejungle/';
  apiURl = 'https://kyt.hardikrajpal.repl.co/thejungle/';
  
  constructor(private http:HttpClient) { }
  async getUserToken(){
    let usrtkn = localStorage.getItem('userToken')
    let prom;
    if(usrtkn==null){
      localStorage.clear()
      prom = this.http.post(this.apiURl+'usertoken/',httpOptions).subscribe((v:any)=>{
        usrtkn = v.toString()
        localStorage.setItem('userToken',usrtkn!)
      })

    }
    await prom;
    return usrtkn
  }
  getSnippets():Observable<any>{
    return this.http.get(this.apiURl+'snips/', httpOptions);
  }
  getQuotes():Observable<any>{
    return this.http.get(this.apiURl+'quotes/',httpOptions);
  }
  async likeQuote(id:number){
    let usrToken = await this.getUserToken();
    console.log(usrToken)
    return this.http.post(this.apiURl+'quotes/'+id.toString()+'/'+usrToken+'/',httpOptions)
  }
}
