import { Component, OnInit, ViewChild } from '@angular/core';
// import {FileReader} from '@angular/forms/'
import { DataService } from '../../services/dynamic.service';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-submitpage',
  templateUrl: './submitpage.component.html',
  styleUrls: ['./submitpage.component.css']
})
export class SubmitpageComponent implements OnInit {
  @ViewChild('file') file:any;
  @ViewChild('status') statp:any;
  progress:Number = 0;
  fr = new FileReader();
  arr_raw!:string[]
  
  raw_instances!:string[]
  content:string = "abc";
  wastes:string[] = [
    '<a href=',
    
    '</a>',
    '<br>',
    '</div>',
    '<div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1 mdl-typography--text-right">',
    '<div class="content-cell mdl-cell mdl-cell--12-col mdl-typography--caption"><b>Products:</b>#&emsp;YouTube####<div class="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp"><div class="mdl-grid"><div class="header-cell mdl-cell mdl-cell--12-col"><p class="mdl-typography--title">YouTube#</p>',
    '>',
  ]
  constructor(private dataservice:DataService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { } 
  public escapeRegExp(string:string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  public replaceAll(str:string, find:string, replace:string) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }
  randomString(len:number, charSet:string) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
  processHistory(content:String){
    // console.log(typeof(content), content)
    
    this.arr_raw = content.split('\n')
    let cleaned = this.arr_raw[this.arr_raw.length - 1]
    this.raw_instances = cleaned.split('<div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1">')
    this.raw_instances.splice(0, 1)
    // this.raw_instances.slice(0,2000)
    let len = this.raw_instances.length
    for(let i=0;i<this.raw_instances.length;i++){
      if(!this.raw_instances[i].startsWith('Watched')){
        this.raw_instances[i] = 'None'
        // console.log(this.raw_instances[i])
      }
      this.progress = 100*Math.min(1, i/len);
      this.updateUser(this.progress, "Cleaning: ", "info");
    }
    let temparr = []
    this.progress = 0;
    for(let i=0;i<this.raw_instances.length;i++){
      if(i%65==0){this.progress = 100*Math.min(1, i/len);
      this.updateUser(this.progress, "Formatting: ", "info");}
      if(this.raw_instances[i]=='None'){
        continue
      }
      let ri = this.raw_instances[i]
      let detes = ri.split('Watched\xa0<a')
      let segs;
      try{
        segs = detes[1].split('>')
      }
      catch(error){
        this.raw_instances[i] = 'None'
        continue;
      }
      let title = segs[1].slice(0,segs[1].length-3)
      title = title.replace('&#39', "'")
      title = title.replace('&amp;', '&')
      if(title.startsWith('https')){
        this.raw_instances[i] = 'None'
        continue
      }
      let channel = segs[4].slice(0, segs[4].length-3)
      let link_vid = segs[0].slice(7, segs[0].length-1)
      link_vid = "";
      let link_chan = segs[3].slice(9, segs[3].length - 1)
      link_chan = "";
      let date = segs[6].slice(0, segs[6].length-5) 
      if(date.endsWith('--cap')){
        this.raw_instances[i] = 'None'
        continue
      }
      this.raw_instances[i] = JSON.stringify([title, channel, link_vid, link_chan, date]) 
      
    }
    let charset = '123456789ABCDEF';
    let userId = this.randomString(16,charset);
    this.progress = 0;
    this.updateUser(this.progress, "Processing: ", "info");
    this.dataservice.sendUserData(this.raw_instances, userId).subscribe(data=>{
      let stat = 0;
          // console.log(data)
        localStorage.setItem('cleanedData',data)
        this.progress = 100;
        this.updateUser(this.progress, "Processing: ", "success");
        this.updateUser(this.progress, "Redirecting to Results:", "success")
        setTimeout(()=>{
          this._router.navigate(["/results"], {relativeTo:this._activatedRoute});
        }, 1500)
    }, error=>{
      this.updateUser(-1, "Request Failed. Please retry. ", "danger");
    })
    localStorage.setItem('userId', userId)
    // console.log(userId);
    // console.log(this.raw_instances)

  }
  check(){
    console.log(this.raw_instances[1])
  }
  updateUser(prog:Number=-1,func:String, alert:String){
    this.statp.nativeElement.innerHTML = func 
    if(prog!=-1){
      this.statp.nativeElement.innerHTML = this.statp.nativeElement.innerHTML+ prog.toString() + "% done";
    }

    this.statp.nativeElement.className = "alert alert-" + alert;
  }
  submit(){
    this.updateUser(this.progress,"Cleaning: ", "info");
    this.fr.onload = (e)=>{
      if(!this.fr.result){
        return;
      }
      else{
        this.content = this.fr.result.toString();
      }
      this.processHistory(this.content)
    }
    this.fr.readAsText(this.file.nativeElement.files[0])

  }

  ngOnInit(): void {
    // let data = "Gi";
    // let ipAddress = '';
    this.dataservice.sendVisitorData("kyt");
  }

}
