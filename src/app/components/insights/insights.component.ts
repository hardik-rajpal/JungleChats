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
    console.log(mi)
    this.temp = this.ntomonth[Math.round(12*(mi - Math.floor(mi)))]
    return this.temp + "20" + String(Math.floor(mi))
  }
  ngOnInit(): void {
    this.dataService.getData().subscribe((data)=>{
      this.data = JSON.parse(data);
      this.rows = this.data.User1.TopNVideos;
      this.viewfreqs = this.data.User1.viewFreq;
      for(let i=0;i<this.viewfreqs[0][0].length;i++){
        this.monthData.push([this.viewfreqs[0][0][i],this.viewfreqs[0][1][i]])
      }
      this.linechartdata = [
        {
          "name": "Videos",
          "series": []
        }  ]
      for(let i=0;i<this.monthData.length;i++){
        // console.log("hi")
        this.linechartdata[0]["series"].push({"name":this.strpmi(this.monthData[i][0]), "value": this.monthData[i][1]})
      }
      this.daytimedata = []
      for(let key of Object.keys(this.data.User1.daytime)){
        this.daytimedata.push({"name":key,
          "series":[]
      })
        for(let i=0;i<this.data.User1.daytime[key].length;i++){
          this.temp = this.data.User1.daytime[key][i];
          this.daytimedata[this.daytimedata.length-1]["series"].push({"name": String(i), "value":this.temp})
        }
      
      }
      console.log(this.daytimedata)
      // for(let key of Array.from(Object.keys(this.data.User1.daytime))){
      //   console.log(key)
      // }
    })
  }

}
