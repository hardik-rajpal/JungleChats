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
  userId!:string;
  private apiUrl = "http://127.0.0.1:8000/kytube/data/"
  // private apiUrl = "https://kythr.herokuapp.com/kytube/data/"
  
  constructor(private http:HttpClient) { }
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
}