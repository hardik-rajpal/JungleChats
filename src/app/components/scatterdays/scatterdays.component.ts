import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scatterdays',
  templateUrl: './scatterdays.component.html',
  styleUrls: ['./scatterdays.component.css']
})
export class ScatterdaysComponent implements OnInit {
  @Input() bubbleData!: any[];
  view: any[] = [700, 400];
  Colors:any = {
    domain:['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  // options
  yticks:number[] = [];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Hours';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Most Watched Days';
  yScaleMin: number = 70;
  yScaleMax: number = 85;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { }

  ngOnInit(): void {
    for(let i=1;i<=24;i++){
      this.yticks.push(i)
    }
  
  }

}
