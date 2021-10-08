import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DataService } from '../../services/dynamic.service';
import { Chart } from 'node_modules/chart.js';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements AfterViewInit,OnInit {
  @ViewChild('status') statp!:ElementRef;
  ngAfterViewInit(){
    this.statp.nativeElement.innerHTML = "Receiving Processed Data...";
    this.statp.nativeElement.className = "alert alert-info";
    this.dataService.getData().subscribe(data=>{
      this.presentData(JSON.parse(data));
    }, error=>{
      this.updateUser("Request Failed. Please retry.", "danger");
    })
    this.data = localStorage.getItem('cleanedData');
  }
  data:any
  days:any[] = []
  hours:any
  monthData:any = []
  minDate:string="2000-01-01"
  maxDate:string="2000-01-02"
  rows:string[][] = [
    ['1', 'TS22', '24'],
    ['2', 'TS1989', '22']
  ];
  scatterData!:any[]

  viewfreqs:any
  viewfreq_xlabel = "The months gone by..."
  viewfreq_ylabel = "Number of videos/month"
  viewfreq_title = "View Frequency"
  linechartdata:any;
  daytime:any
  daytimedata:any;
  daytime_title = "Hours Most Videos Were Viewed"
  daytime_xlabel = "Hour of Day";
  daytime_ylabel = "Fraction of Videos";
  title:string = "Most Watched Videos";
  constructor(private dataService:DataService) { }
  ntomonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  temp:any
  kwtags:any = [['Youtube', '']]
  updateTags(tags:any){
    this.kwtags = tags;
  }
  sendGroupRequest(groups:any){
    this.updateUser("Getting tagged Data", "info");
    let temp = localStorage.getItem('cleanedData');
    console.log(temp);
    console.log(this.data)
    if(temp!=null){
      localStorage.setItem('cleanedData', this.data);
    // this.getFilteredData([])//assigns filtered table to this.data
    this.dataService.getGroupData(this.kwtags).subscribe(data=>{
    console.log(temp)
      if(temp!=null) {
      data = JSON.parse(data)
      console.log(data)
      this.presentData(data)
      localStorage.setItem('cleanedData', temp);
      this.updateUser("All Done!", "success")
      // this.statp.nativeElement.className = "alert alert-success";
      // console.log(localStorage.getItem("cleanedData"))
    }     
          
    }, error=>{
      this.updateUser("Request Failed. Please retry.", "danger");
    })
  }
  }
  strpmi(mi:number):string{

    this.temp = this.ntomonth[Math.round(12*(mi - Math.floor(mi)))]
    return this.temp + "20" + String(Math.floor(mi))
  }
  decimaltotime(time:number){
    return (Math.floor(time)).toString() + ":" + (60*(time - Math.floor(time))).toString()
  }
  processmostWatchedDays(data:any){
    this.days = [];
    this.days.push(['Rank', 'Date', 'Number of Videos'])
    for(let k=0;k<data.hours.length;k++){
      this.days.push([k+1, data.days[k][0], data.days[k][1]]);
    }
    console.log(this.days)
    this.scatterData = []
    let elems = []
    for(let i=0;i<data.days.length;i++){
      elems.push({
        name:data.days[i][0],
        x:data.days[i][0],
        y:0,
        r:3
      })
      // elems[elems.length - 1].y = 12
    }
    // console.log(elems)
    // console.log(data.hours[0].length)
    for(let i=0;i<data.hours.length;i++){
      for(let j=0;j<data.hours[i].length;j++){
        if(j==0){
          elems[i].y = data.hours[i][j]
          this.scatterData.push({
            name:'',
            series:[
              elems[i]
            ]
          })
        }
        else{
          elems[i].y = data.hours[i][j]
          if(elems[i].y!=0){
            this.scatterData[i].series.push({
              name:elems[i].name,
              x:elems[i].x,
              y:data.hours[i][j],
              r:elems[i].r
            })
  
          }
        }

      }
    
    // this.hours = data.hours
    // this.days = data.days
    }
    console.log(this.scatterData)
  }
  processviewFreqs(viewfreqs:any){
    this.temp = [];
    this.linechartdata = []
    // console.log(viewfreqs)
    for(let key of Object.keys(viewfreqs)){
      this.linechartdata.push({"name":key,
        "series":[]
    })
    this.monthData = []
    for(let i=0;i<viewfreqs[key][0][0].length;i++){
      this.monthData.push([viewfreqs[key][0][0][i],viewfreqs[key][0][1][i]])
      // this.temp.push(this.strpmi(viewfreqs[key][0][0][i]))
    }
    // console.log(this.monthData)
    for(let i=0;i<this.monthData.length;i++){
      this.linechartdata[this.linechartdata.length - 1]["series"].push({"name":this.strpmi(this.monthData[i][0]), "value": this.monthData[i][1]})
    }

  }
  // console.log(this.linechartdata)
}

  processdaytime(daytime:any){
    this.daytimedata = []
    for(let key of Object.keys(daytime)){
      this.daytimedata.push({"name":key,
        "series":[]
    })
    // console.log(this.daytimedata)
      for(let i=0;i<daytime[key].length;i++){
        this.temp = daytime[key][i];
        this.daytimedata[this.daytimedata.length-1]["series"].push({"name": String(i), "value":this.temp})
      }
    
    }
    // console.log(this.daytimedata)
    
  }
  getFilteredData(vals:string[]){
    // console.log(vals)
    // console.log(this.minDate, this.maxDate)
    let dates = [vals[0], vals[1]]
    for(let i=0;i<dates.length;i++){
      let ymd = dates[i].split('-')
      //y = [0]
      //d = [2]
      let m = this.ntomonth[(Number(ymd[1]))-1];
      let ans = m + ' '+Number(ymd[2]).toString() + ', ' + ymd[0]
      // console.log(ans)
      vals[i] = ans;
    }
    this.updateUser("Filtering by Time", "info");
    this.dataService.getFilteredData(vals).subscribe(data=>{
      this.data = data
      this.sendGroupRequest(this.kwtags);
    }, error=>{
      this.updateUser("Request Failed. Please retry.", "danger");
    })
  }
  presentData(data:any){
    this.updateUser("Data Received Successfully. Sketching the Graphs...", "success");
    // this.statp.nativeElement.className = "alert alert-success";
    let extdates:string[] = data.extDates
    for(let i=0;i<extdates.length;i++){
      let date = extdates[i];
      let comps = date.split(',')
      let mi = (1+this.ntomonth.indexOf((comps[0].split(' ')[0]))).toString()
      // console.log(mi)
      let di = comps[0].split(' ')[1];
      if(mi.length ==1){
        mi  = '0'+mi
        // console.log(mi)
      }
      if(di.length ==1){
        di  = '0'+di
        // console.log(mi)
      }
      date = comps[1].slice(1, comps[1].length) + '-' + mi+'-' + di
      extdates[i] = date
    }
    // console.log(extdates)
    this.minDate = extdates[0]
    this.maxDate = extdates[1]
    this.rows = data.TopNVideos
    this.daytime = data.daytimeFreq
    this.processdaytime(this.daytime)
    this.viewfreqs = data.viewFreq
    this.processviewFreqs(this.viewfreqs)
    // console.log(JSON.parse(data.topNDays).hours)
    this.processmostWatchedDays(JSON.parse(data.topNDays))
    this.updateUser("All Done!", "success");
  }
  updateUser(stat:String, alert:String){
  // console.log(this.statp.nativeElement)
    this.statp.nativeElement.innerHTML = stat;
    this.statp.nativeElement.className = "alert alert-" + alert;
  }
  ngOnInit(): void {
    // this.statp.nativeElement.innerHTML = "stat";
    // this.updateUser("Getting Processed Data");
      
  }

}
