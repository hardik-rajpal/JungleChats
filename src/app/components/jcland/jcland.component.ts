import { Component, OnInit } from '@angular/core';
import { JcsnippetsService } from 'src/app/services/jcsnippets.service';

@Component({
  selector: 'app-jcland',
  templateUrl: './jcland.component.html',
  styleUrls: ['./jcland.component.css']
})
export class JclandComponent implements OnInit {
  snippets!:any[]
  constructor(private dataService:JcsnippetsService) { }

  ngOnInit(): void {
    this.dataService.getSnippets().subscribe(data=>{
      // let a = [1, 2, 3];
      // a.reverse()
      this.snippets = data.reverse();
      // console.log(data[0])
    })
  }

}
