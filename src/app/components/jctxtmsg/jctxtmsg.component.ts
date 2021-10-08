import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jctxtmsg',
  templateUrl: './jctxtmsg.component.html',
  styleUrls: ['./jctxtmsg.component.css']
})
export class JctxtmsgComponent implements OnInit {
  @Input() data:any;
  // @ViewChild('forward') forp!:ElementRef;
  content!:String;
  replyto!:String;
  forwarded!:Boolean;
  sender!:String;
  alias:any = {
    'Sourish Wockrell':'The Bear',
    'Srikar rockwell New':'The Deer',
    '+1 (385) 296-8922':'The Koala',
    'Hardik Rajpal':'The Tiger'
  }
  constructor() { }
  processMsgData(data:string){
    const forwardRe = /#F#/
    const replytoRe = /#R:\w+#/g;
    let metarr = data.split(/\d\d - /);
    let dt = metarr[0]
    let content = metarr[1]
    let sender = this.alias[content.split(': ')[0]]
    let line = content.split(': ')[1]
    let forwarded = false
    let replyto = ""
    if(forwardRe.test(line)){
      forwarded = true;
      line = line.split(forwardRe)[1]
    }
    if(replytoRe.test(line)){
      replyto = line.match(replytoRe)![0]
      replyto = replyto.split('#R:')[1].split('#')[0]
      line = line.split(replytoRe)[1]
    }
    this.content = line
    this.sender = sender;
    this.forwarded = forwarded;
    if(this.forwarded){
      console.log(this.forwarded)
    }
    this.replyto = replyto; 
  }
  ngOnInit(): void {
    console.log(this.data)
    this.processMsgData(this.data.text) 
  }

}
