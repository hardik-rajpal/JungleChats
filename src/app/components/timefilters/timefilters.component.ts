import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timefilters',
  templateUrl: './timefilters.component.html',
  styleUrls: ['./timefilters.component.css']
})
export class TimefiltersComponent implements OnInit {
  days_start!:Date
  days_end!:Date
  hours_start!:Time
  hours_end!:Time
  constructor() { }

  ngOnInit(): void {
  }
  updateResults(){
    console.log(this.days_start);
    console.log(this.days_end);
    console.log(this.hours_start);
    console.log(this.hours_end);
    //update results.
  }
}
