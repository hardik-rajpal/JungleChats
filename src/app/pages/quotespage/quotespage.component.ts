import { Component, OnInit } from '@angular/core';
import { JcsnippetsService } from 'src/app/services/jcsnippets.service';

@Component({
  selector: 'app-quotespage',
  templateUrl: './quotespage.component.html',
  styleUrls: ['./quotespage.component.css']
})
export class QuotesPageComponent implements OnInit {
  waiting:boolean = false;
  constructor(private snippetService:JcsnippetsService) { }
  quotes:any[] = [];
  ngOnInit(): void {
    this.snippetService.getQuotes().subscribe(v=>{
      console.log(v)
      this.quotes = v
    })
  }

}
