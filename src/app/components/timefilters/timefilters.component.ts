import { Time } from '@angular/common';
import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-timefilters',
  templateUrl: './timefilters.component.html',
  styleUrls: ['./timefilters.component.css']
})
export class TimefiltersComponent implements OnInit {
  @Input() minDate!:string
  @Input() maxDate!:string
  @ViewChild('minDateField') mindf:any
  @ViewChild('maxDateField') maxdf:any 
  @Output() getFiltered:EventEmitter<any> = new EventEmitter();
  minTime:string = '00:00:00'
  maxTime:string = '23:59:59'
  constructor() { }

  ngOnInit(): void {
    
  }
  updateResults(){
    //update results.
  }
  filter(){
    this.getFiltered.emit([this.minDate, this.maxDate, this.minTime, this.maxTime])
  }
}
