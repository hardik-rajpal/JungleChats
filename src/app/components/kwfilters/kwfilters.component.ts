import { Component, OnInit,ComponentFactoryResolver,
  ViewChild,
  ElementRef,
  ViewContainerRef } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { DataService } from '../../services/dynamic.service';
import { InsightsComponent } from '../insights/insights.component';
@Component({
  selector: 'app-kwfilters',
  templateUrl: './kwfilters.component.html',
  styleUrls: ['./kwfilters.component.css']
})
export class KwfiltersComponent implements OnInit {
  checkTitle!:boolean;
  taggroups:string[][] = [
    ['Youtube', ''],
  ];
  checkChannel!:boolean;
  group_count:number = 0;
  newgroup:any;
  holder:any;
  @ViewChild('container', {read:ViewContainerRef})
  container!:ViewContainerRef;
  constructor(private dataService:DataService){}
  addGroup():void{
    // const taggroupfactory = this.componentFactoryResolver.resolveComponentFactory(TagGroupComponent);
    // const componentRef = this.container.createComponent(taggroupfactory);
    this.taggroups.push([]);
  }
  getGroupdata(){
    this.dataService.getGroupData(this.taggroups)
  }
  update(data:any){
    this.taggroups[data.gnum].push(data.tag)
    console.log(this.taggroups);
  }
  ngOnInit(): void {
  }
}
