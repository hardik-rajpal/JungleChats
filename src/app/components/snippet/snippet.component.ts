import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {
  @Input() data: any
  @ViewChild('snipdiv') div!: ElementRef;
  msgs: any[] = []
  tsf: number = 0.1;
  invspeed: number = 50;
  forcehide: boolean = true;
  keepscroll: boolean = true;
  paused: boolean = true;
  end: boolean = false;
  typer: string = "";
  typerclass: String = "";
  title!: string
  timeouts: any = [];
  showmsgs: boolean[] = []
  typing: boolean = false;
  rounded: boolean = true;
  published: boolean = true;
  id!: number
  constructor() { }


  scroller() {
    if (this.forcehide) { return; }
    if (!this.keepscroll) { return; }
    this.div.nativeElement.scrollTo(0, this.div.nativeElement.scrollHeight);
    // if (!this.keepscroll) {
    //   setTimeout(this.scroller, 300);
    //   return false;
    // }
    return;
  }
  playSnips(i: number) {
    if (this.paused) {
      window.setTimeout(() => { this.playSnips(i) }, 1000)
      return;
    }
    if (this.forcehide) { return; }
    if (i > this.msgs.length - 1) {
      this.end = true;
      setTimeout(() => {
        this.scroller();
        this.keepscroll = false;
        this.paused = true;
      }, 100);
      return;
    }
    // this.keepscroll = true;
    this.timeouts.push(
      setTimeout(() => {
        let tempsender: string = this.msgs[i].text.split(/\d\d .. - /)[1].split(': ')[0];
        this.typer = tempsender
        this.typerclass = "sender mini " + this.typer.toLowerCase();
        this.typing = true;
        this.scroller();
        setTimeout(() => {this.scroller()}, 50);
      }, (this.tsf) * this.invspeed * ((i===0)?0:(this.msgs[i-1].text.length)))
    )

    this.timeouts.push(
      setTimeout(() => {
        this.typing = false;
        this.msgs[i].show = true;
        this.playSnips(i + 1);
      }, this.invspeed * ((i===0)?0:(this.msgs[i-1].text.length))))
    this.timeouts.push(
      // setTimeout(() => { this.scroller() }, 300)
    )

  }
  togglePlay(e: Event) {
    e.stopPropagation();
    this.paused = !this.paused;
    // this.keepscroll = !this.keepscroll;
  }
  toggleScroll(e: Event) {
    e.stopPropagation();
    // this.paused = !this.paused;
    this.keepscroll = !this.keepscroll;
  }
  toggleSnip() {
    if (this.div.nativeElement.className == "snip") {
      this.div.nativeElement.className = "snip closed";
      this.forcehide = true;
      for (let timeout of this.timeouts) {
        clearTimeout(timeout)
      }
    }
    else {
      this.forcehide = false;
      this.paused = false;
      this.end = false;
      this.keepscroll = true;
      this.div.nativeElement.className = "snip";
      for (let msg of this.msgs) {
        msg.show = false;
      }
      this.playSnips(0);
    }
  }
  processSnippet(snippet: any) {
    this.id = snippet.id
    this.published = snippet.published

    if (!snippet.published) { return; }
    // console.log(snippet)
    const dateRe = /^\d+[/]\d+[/]/;
    //console.log(snippet)
    let msgs = snippet.snippet.split('\n')
    //console.log(msgs[0])
    this.title = msgs[0].split('H#')[1]
    //console.log(this.title)
    for (let j = msgs.length - 1; j > -1; j--) {
      //console.log(msgs[j])
      if (!dateRe.test(msgs[j])) {
        msgs[j - 1] = msgs[j - 1] + '<br>' + msgs[j]
        msgs[j] = ""
      }
    }

    for (let k = 0; k < msgs.length; k++) {
      if (msgs[k] != "") {
        //console.log(msgs[k])
        this.msgs.push({ text: msgs[k], show: false });
        // this.showmsgs.push(false);
      }
    }
  }

  processMsg(msg: String) {

  }

  ngOnInit(): void {
    //console.log(this.data)
    this.processSnippet(this.data)

  }

}
