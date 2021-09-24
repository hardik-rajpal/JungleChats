import { Component, Input, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';

import { productSales } from '../../data/products';
@Component({
  selector: 'app-mylinechart',
  templateUrl: './mylinechart.component.html',
  styleUrls: ['./mylinechart.component.css']
})
export class MylinechartComponent implements OnInit {
  @Input() data!:any[]
  @Input() yAxisLabel!:any;
  @Input() xAxisLabel!:any;
  @Input() mytitle!:any;
  
  productSales!:any[]
 
  view:any[] = ["300", "370"];
  colorScheme = {
    domain: ['#FF0000', '#00FF00', '#0000FF', '#00FFFF', '#FF00FF']
  };
  schemeType:ScaleType = ScaleType.Ordinal;//or 'linear' defines colour grad
  gradient: boolean = false;
  xAxis: boolean = true;
  yAxis:boolean = true;

  legendTitleMulti:string = "Months";
  legendPosition:any = 'below';//[right, below]
  legend:boolean = true;
  showXAxisLabel:boolean = true;
  showYAxisLabel:boolean = true;
  animations:boolean = false;
  showGridLines:boolean = true;
  showDataLabel: boolean = true;
  barPadding: number = 5;
  tooltipDisabled:boolean = false;
  roundEdges:boolean = false;
  constructor() {
    Object.assign(this, { productSales})
  }
  ngOnInit(): void {
    console.log(this.data)
  }

}
