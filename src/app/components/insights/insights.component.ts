import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dynamic.service';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  data:any
  monthData:any
  rows:string[][] = [
    ['1', 'TS22', '24'],
    ['2', 'TS1989', '22']
  ];
  viewfreqs:any
  title:string = "Most Watched Videos";
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data)=>{
      this.data = JSON.parse(data);
      this.rows = this.data.User1.TopNVideos;
      this.viewfreqs = this.data.User1.viewFreq;
      this.monthData = this.viewfreqs[0]
      console.log(this.data.User1)
    })
  }

}
