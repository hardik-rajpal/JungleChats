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
  async getData():Promise<any>{
    return this.http.get<any>(this.apiUrl, httpOptions).subscribe(data=>{
      this.data = JSON.parse(data);
      this.sharedData = {
        'TopNVideos':this.data.User1.TopNVideos,
        'viewfreq':this.data.User1.viewFreq,
        'daytime':this.data.User1.daytime,
      }
      return this.sharedData
    })
  }
  getSharedData(){
    console.log(this.sharedData)
    return this.sharedData
  }
  getGroupData(groups:any){
    let posthttpOptions = {
      params:new HttpParams().set('title', 'Groupwise')
      .append('groups', JSON.stringify(groups)).append('userid', 'User1')
    }
    this.http.post<any>(this.apiUrl, posthttpOptions).subscribe(data=>{
      this.data = JSON.parse(data)
      console.log(this.data)
      this.sharedData['viewfreq'] = this.data.viewfreq
      this.sharedData['daytime'] = this.data.daytime
      // this.sharedData['viewfreqs']
    })
  }
}