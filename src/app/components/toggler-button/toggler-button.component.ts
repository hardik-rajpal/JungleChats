import { Component, OnInit, Input} from '@angular/core';
import { OptionsProvider } from 'ngx-chips/core/providers/options-provider';

@Component({
  selector: 'app-toggler-button',
  templateUrl: './toggler-button.component.html',
  styleUrls: ['./toggler-button.component.css']
})
export class TogglerButtonComponent implements OnInit {
  @Input() options!:string[];
  @Input() choice!:number;
  // options_:string[] = this.options.slice(1, this.options.length-2).split(',')
  constructor() { }

  ngOnInit(): void {
  }
  toggleMe(){
    this.choice = (this.choice+1)%this.options.length
  }

}
