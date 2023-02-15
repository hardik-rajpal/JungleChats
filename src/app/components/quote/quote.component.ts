import { Component, Input, OnInit } from '@angular/core';
import { JcsnippetsService } from 'src/app/services/jcsnippets.service';
// import * as twttr from '../../../assets/widgets';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @Input('data') quote:any = {
    text:'Check out this quotes page!'
  };
  constructor(private quoteService:JcsnippetsService) { }
  numStyles:number = 4;
  quoteClass:string = 'quoteholder q0';
  creditsClass:string = 'credits c0';
  likedQuote = false;
  waiting=false;
  
  //shareOptions.text is a placeholder, to be replaced by the quote.
  shareOptions = { size: 'large', text: 'Checkout the quoteWall @ JungleChats' }
  likeQuote(){
    if(this.likedQuote){
      this.waiting = true;
      this.quoteService.likeQuote(this.quote.id).then(prom=>{
        prom.subscribe(data=>{
          this.quote = data
          this.likedQuote = false;
          localStorage.removeItem('likeToken-'+this.quote.id.toString())
          this.waiting = false;
        })
      })
      return;
    }
    this.waiting = true;
    this.quoteService.likeQuote(this.quote.id).then(prom=>{
      prom.subscribe((data:any)=>{
        
        this.quote = data
        localStorage.setItem('likeToken-'+this.quote.id.toString(),'true')
        this.likedQuote = true;
        this.waiting = false;
        // console.log(this.quote)
      })
    });
  }
  htmlToUniCode(s:string){
    while(s.includes('<br/>')){
      s = s.replace('<br/>','\n',)
    }
    while(s.includes('<br />')){
      s = s.replace('<br />','\n')
    }
    return s
  }
  ngOnInit(): void {

    if(this.quote){
      let rn = Math.floor(Math.random()*100)%this.numStyles;
      // if(rn==0){rn = 1+Math.floor(Math.random()*100)%2;}
      this.quoteClass = this.quoteClass.slice(0,-1)+(rn).toString()
      this.creditsClass = this.creditsClass.slice(0,-1)+(rn).toString()
      let tempLikedQuote = localStorage.getItem('likeToken-'+this.quote.id.toString());
      if(tempLikedQuote!=null){
        if(tempLikedQuote!='false'){
          this.likedQuote = true
        }
      }
      this.shareOptions.text = this.htmlToUniCode(this.quote.text).substring(0,280-47)+'\n - '+this.quote.author+'\n'
      // if(280-this.shareOptions.text.length >=36)
    }
  }

}
