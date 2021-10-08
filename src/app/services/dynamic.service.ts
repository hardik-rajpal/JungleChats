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
  getFilteredData(vals:string[]):Observable<any>{
    let cd = localStorage.getItem('cleanedData')
    let id = localStorage.getItem('userId')
    if(cd!=null && id!=null){
      let httpOp = {
        params:new HttpParams().set('title', 'Filteruserdata').append('userid', id)
        .append('datetime', JSON.stringify(vals)).append('cleanedData',cd)
      }
      return this.http.post(this.apiUrl, httpOp)
    }
    else if(id==null){
      console.log('userId not found')
    }
    else{
      console.log('cd not found')
    }

    return this.http.post(this.apiUrl, httpOptions)
} 
getStatus():Observable<any>{
    return this.http.get<any>(this.apiUrl, httpOptions)
  }
  sendUserData(instances:string[], userId:string):Observable<any>{
    this.userId = userId//probably not needed
    const httpOp = {
      params:new HttpParams().set('title', 'Senduserdata').append('userid', userId)
      .append('data', JSON.stringify(instances))
    }
    return this.http.post<any>(this.apiUrl, httpOp)
  }
  getData():Observable<any>{
    let id = localStorage.getItem('userId');
    let cd = localStorage.getItem('cleanedData');
    if(id!=null && cd!=null){
      console.log(id)
      const httpOp = {
        params:new HttpParams().set('title', 'Userdata').append('userid',id)
        .append('rows', 'None').append('cleanedData',cd)
      }
      return this.http.post<any>(this.apiUrl, httpOp)
    }      
    else if(id==null){
      console.log('userId not found')
    }
    else{
      console.log('cd not found')
    }
    return this.http.post<any>(this.apiUrl, httpOptions)
  }
  
  getGroupData(groups:any):Observable<any>{
    let id = localStorage.getItem('userId');
    let cd = localStorage.getItem('cleanedData');
    if(id!=null && cd!=null){
      console.log(id)
      const httpOp = {
        params:new HttpParams().set('title', 'Groupwise').append('userid',id)
        .append('groups', JSON.stringify(groups)).append('cleanedData',cd)
      }
      return this.http.post<any>(this.apiUrl, httpOp)
    }      
    else if(id==null){
      console.log('userId not found')
    }
    else{
      console.log('cd not found')
    }
    return this.http.post<any>(this.apiUrl, httpOptions)
  }
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