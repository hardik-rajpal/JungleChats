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
  senderclass!:String;
  constructor() { }
  processMsgData(data:string){
    const forwardRe = /#F#/
    const replytoRe = /#R:\w+#/g;
    let metarr = data.split(/\d\d .. - /);
    let dt = metarr[0]
    let content = metarr[1]
    ////console.log(content)
    // let sender = this.alias[content.split(': ')[0]]
    let sender = content.split(': ')[0]
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
    this.senderclass = "sender "+sender.split(' ')[1].toLowerCase();
    this.forwarded = forwarded;
    if(this.forwarded){
      ////console.log(this.forwarded)
    }
    this.replyto = replyto; 
  }
  ngOnInit(): void {
    //console.log(this.data)
    this.processMsgData(this.data.text) 
  }

}
