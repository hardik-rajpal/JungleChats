import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dynamic.service';
import { Chart } from 'node_modules/chart.js';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  data:any
  monthData:any = []
  rows:string[][] = [
    ['1', 'TS22', '24'],
    ['2', 'TS1989', '22']
  ];
  viewfreqs:any
  viewfreq_xlabel = "The months gone by..."
  viewfreq_ylabel = "Number of videos/month"
  viewfreq_title = "View Frequency"
  linechartdata:any
  daytimedata:any
  daytime_title = "Hours Most Videos Were Viewed"
  daytime_xlabel = "Hour of Day";
  daytime_ylabel = "Fraction of Videos";
  title:string = "Most Watched Videos";
  constructor(private dataService:DataService) { }
  ntomonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  temp:any
  strpmi(mi:number):string{

    this.temp = this.ntomonth[Math.round(12*(mi - Math.floor(mi)))]
    return this.temp + "20" + String(Math.floor(mi))
  }
  processviewFreqs(viewfreqs:any){
    this.linechartdata = []
    console.log(viewfreqs)
    for(let key of Object.keys(viewfreqs)){
      this.linechartdata.push({"name":key,
        "series":[]
    })
    for(let i=0;i<viewfreqs[key][0][0].length;i++){
      this.monthData.push([viewfreqs[key][0][0][i],viewfreqs[key][0][1][i]])
    }
    console.log(this.monthData)
    for(let i=0;i<this.monthData.length;i++){
      this.linechartdata[this.linechartdata.length - 1]["series"].push({"name":this.strpmi(this.monthData[i][0]), "value": this.monthData[i][1]})
    }
  }
}
  processdaytime(daytime:any){
    for(let key of Object.keys(daytime)){
      this.daytimedata.push({"name":key,
        "series":[]
    })
      for(let i=0;i<daytime[key].length;i++){
        this.temp = daytime[key][i];
        this.daytimedata[this.daytimedata.length-1]["series"].push({"name": String(i), "value":this.temp})
      }
    
    }
  }
  updateDataLoop(){
    this.data = this.dataService.getSharedData()
    this.rows = this.data['TopNVideos'];
    this.viewfreqs = this.data['viewfreq'];
    this.processviewFreqs(this.viewfreqs)
    this.daytimedata = []
    this.processdaytime(this.data['daytime'])
    setTimeout(()=>{
      this.updateDataLoop()
    }, 5000)
  }
  ngOnInit(): void {
      this.dataService.getData()
      setTimeout(()=>{
        this.updateDataLoop()
      }, 3000)

      // for(let key of Array.from(Object.keys(this.data.User1.daytime))){
      //   console.log(key)
      // }
  }

}
