import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dynamic.service';
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  data:any
  rows:string[][] = [
    ['1', 'TS22', '24'],
    ['2', 'TS1989', '22']
  ];
  title:string = "Most Watched Videos";
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getTasks().subscribe((data)=>{
      this.data = data;
    })
  }

}
