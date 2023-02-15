import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dynamic.service';
import { JcsnippetsService } from 'src/app/services/jcsnippets.service';

@Component({
  selector: 'app-jcland',
  templateUrl: './jcland.component.html',
  styleUrls: ['./jcland.component.css']
})
export class JclandComponent implements OnInit {
  snippets:any[] = [
    {
      published:true,
      snippet:""
    }
  ]
  waiting:boolean = true;
  constructor(private dataService:JcsnippetsService, private trackservice:DataService) { }

  ngOnInit(): void {
    this.waiting = true;
    this.dataService.getSnippets().subscribe(data=>{
      // let a = [1, 2, 3];
      // a.reverse()
      this.snippets = data
      for(let i=0;i<data.length;i++){
        if(!this.snippets[i].published){
          this.snippets[i] = "None"
          this.snippets.splice(i, 1);
          i--;
        }
        else{
          this.snippets[i].id = i+1
        }
      }
      this.snippets = this.snippets.reverse()
      //console.log(this.snippets)
      this.waiting = false;
    })
    this.trackservice.sendVisitorData("jc");
  }

}
