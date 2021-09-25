import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { TagModel } from 'ngx-chips/core/accessor';

@Component({
  selector: 'app-tag-group',
  templateUrl: './tag-group.component.html',
  styleUrls: ['./tag-group.component.css']
})
export class TagGroupComponent implements OnInit {
  @Input() gnum!:number;
  @Input() tags_list!:string[];
  @Output() onadd:EventEmitter<any> = new EventEmitter();
  @Output() onremove:EventEmitter<any> = new EventEmitter();
  items:string[] = this.tags_list
  temp:any;
  constructor() {}

  ngOnInit(): void {
    console.log((this.tags_list));
    console.log(this.gnum);
  }
  onAdding(tag:TagModel){
    this.temp = this.tags_list.pop();
    this.tags_list.push(this.temp.display)
    this.onadd.emit({tag:this.temp.display, gnum:this.gnum});
    // console.log(this.tags_list);
  }
  onRemoving(){
    this.onremove.emit(this.gnum)
  }
}
