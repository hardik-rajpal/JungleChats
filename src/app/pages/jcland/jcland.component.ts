import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dynamic.service';
import { JcsnippetsService } from 'src/app/services/jcsnippets.service';

@Component({
  selector: 'app-jcland',
  templateUrl: './jcland.component.html',
  styleUrls: ['./jcland.component.css']
})
export class JclandComponent implements OnInit {
  snippets!:any[]
  waiting:boolean = true;
  constructor(private dataService:JcsnippetsService, private trackservice:DataService) { }

  ngOnInit(): void {
    this.waiting = true;
    this.dataService.getSnippets().subscribe(data=>{
      // let a = [1, 2, 3];
      // a.reverse()
      this.snippets = data.reverse();
      // console.log(data[0])
      this.waiting = false;
    })
    this.trackservice.sendVisitorData("jc");
  }

}
