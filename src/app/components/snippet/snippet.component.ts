import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {
  @Input() data:any
  @ViewChild('snipdiv') div!:ElementRef;
  msgs:any[] = []
  tsf:number = 0.3;
  speed:number = 10;
  forcehide:boolean = true;
  keepscroll:boolean = true;
  paused:boolean = true;
  end:boolean = false;
  typer:string = "";
  typerclass:String = "";
  title!:string
  timeouts:any = [];
  showmsgs:boolean[] = []
  typing:boolean = false;
  id!:number
  constructor() { }
  alias = {
    'Sourish Wockrell':'The Bear',
    'Srikar rockwell New':'The Deer',
    '+1 (385) 296-8922':'The Koala',
    'Hardik Rajpal':'The Tiger'
}

  scroller(){
    if(this.forcehide){return;}
    if(!this.keepscroll){return;}
    this.div.nativeElement.scrollTo(0,this.div.nativeElement.scrollHeight);
    this.div.nativeElement.scrollTo(0,this.div.nativeElement.scrollHeight);
    this.div.nativeElement.scrollTo(0,this.div.nativeElement.scrollHeight);
    console.log("scrolled");
    if(this.keepscroll){
      setTimeout(this.scroller, 300);
    }}
  playSnips(i:number){
    if(this.paused){
      window.setTimeout(()=>{this.playSnips(i)}, 1000)
      return;
    }
    if(this.forcehide){return;}
    if(i>this.msgs.length-1){
      this.end = true;
      console.log("Ended");
      
      setTimeout(() => {
        this.scroller();
        this.keepscroll = false;
        this.paused = true;
      }, 300);
      
      return;
    }
    // this.keepscroll = true;
    this.timeouts.push(
    setTimeout(()=>{
      let tempsender:string = this.msgs[i].text.split(/\d\d - /)[1].split(': ')[0];
      this.typer = (this.alias as any)[tempsender]
      this.typerclass = "sender mini " + this.typer.toLowerCase();
      this.typing = true;
    }, (this.tsf)*this.speed*this.msgs[i].text.length)
    )
    this.timeouts.push(setTimeout(()=>{
      this.typing = false;
    }, (0.99)*this.speed*this.msgs[i].text.length)
    )
    

    
    this.timeouts.push(
    setTimeout(()=>{
      this.msgs[i].show = true;
      this.playSnips(i+1);      
    }, this.speed*this.msgs[i].text.length))
    this.timeouts.push(
        setTimeout(()=>{this.scroller()}, 300)
      )

  }
  togglePlay(){
    this.paused = !this.paused;
    // this.keepscroll = !this.keepscroll;
  }
  toggleScroll(){
    // this.paused = !this.paused;
    this.keepscroll = !this.keepscroll;
  }
  toggleSnip(){
    if(this.div.nativeElement.className =="snip"){
      this.div.nativeElement.className = "snip closed";
      this.forcehide = true;
      for(let timeout of this.timeouts){
        clearTimeout(timeout)
      }
    }
    else{
      this.forcehide = false;
      this.paused = false;
      this.end = false;
      this.keepscroll = true;
      this.div.nativeElement.className = "snip";
      for(let msg of this.msgs){
        msg.show = false;
      }
      this.playSnips(0);
    }


  }
  processSnippet(snippet:any){
    this.id = snippet.id
    console.log(snippet)
    const dateRe = /^\d\d/;
    // console.log(snippet)
    let msgs = snippet.snippet.split('\n')
    // console.log(msgs[0])
    this.title = msgs[0].split('H#')[1]
    for(let j=msgs.length-1;j>-1;j--){
      // console.log(msgs[j])
      if(!dateRe.test(msgs[j])){
          msgs[j-1] = msgs[j-1] + '<br>' + msgs[j]
          msgs[j] = ""
    }
    
  }
  // console.log(msgs)
  for(let k=0;k<msgs.length;k++){
    if(msgs[k]!=""){
      this.msgs.push({text:msgs[k], show:false});
      // this.showmsgs.push(false);
    }
  }
  console.log(this.msgs)

}
  processMsg(msg:String){
    
}
  ngOnInit(): void {
    this.processSnippet(this.data)
    console.log(this.data)
  }

}
