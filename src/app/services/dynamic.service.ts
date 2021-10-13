import { Injectable } from '@angular/core';
// import {Task} from '../Task';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { isThisTypeNode } from 'typescript';
import { DatePipe } from '@angular/common';

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
  userId!:string;
  // private apiUrl = "http://127.0.0.1:8000/kytube/data/"
  private apiUrl = "https://kythr.herokuapp.com/kytube/data/"
  // private trackerApi = "http://127.0.0.1:8000/viewtracker/"
  private trackerApi = "https://kythr.herokuapp.com/viewtracker/"
  
  constructor(private http:HttpClient, private datepipe:DatePipe) { }
  
  sendVisitorData(site:string){
    let ip = ""
    let d = Date.now()
    let date = this.datepipe.transform(d, 'yyMMdd')?.toString()
    // console.log(date)
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      ip = res.ip
      this.http.get("https://ipapi.co/"+ip+"/json/").subscribe((data:any)=>{
        let datavisit:string;
        // data = JSON.parse(data)
        datavisit = "000.000.000"+","+data.city + "," + data.country + ',' + date + ',' + site;
        // console.log(datavisit)
        let httpop = {
            params:new HttpParams().set('title', 'Senduserdata').append('visitor', datavisit)
          }
          this.http.post(this.trackerApi, httpop).subscribe(data=>{}, err=>{});
        },err=>{
          let datavisit = ip + ",Ungot,ungot," + date
          
          let httpop = {
            params:new HttpParams().set('title', 'Senduserdata').append('visitor', datavisit)
          }
          this.http.post(this.trackerApi, httpop).subscribe(data=>{}, err=>{})
        })
    }, err=>{

    })
  }
}