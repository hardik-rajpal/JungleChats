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
  speed:number = 70;
  typer:string = "";
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
  playSnips(i:number){
    if(i>this.msgs.length-1){
      return;
    }
    setTimeout(()=>{
      let tempsender:string = this.msgs[i].text.split(/\d\d - /)[1].split(': ')[0];
      this.typer = (this.alias as any)[tempsender]
      this.typing = true;
    }, (this.tsf)*this.speed*this.msgs[i].text.length)
    setTimeout(()=>{
      this.typing = false;
    }, (0.99)*this.speed*this.msgs[i].text.length)
    
    setTimeout(()=>{
      this.msgs[i].show = true;
      this.playSnips(i+1);
      window.scrollTo(0,100*document.body.scrollHeight);
      
    }, this.speed*this.msgs[i].text.length)
  }
  displaySnip(){
    if(this.div.nativeElement.className =="snip"){
      this.div.nativeElement.className = "snip closed";
    }
    else{
      this.div.nativeElement.className = "snip";
      this.playSnips(0);
    }


  }
  processSnippet(snippet:any){
    this.id = snippet.id
    console.log(snippet)
    const dateRe = /^\d\d/;
    // console.log(snippet)
    let msgs = snippet.snippet.split('\n')
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
