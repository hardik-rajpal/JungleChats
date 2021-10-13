import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module'
import { TagInputModule } from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { JclandComponent } from './pages/jcland/jcland.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { JctxtmsgComponent } from './components/jctxtmsg/jctxtmsg.component'
import  {DatePipe} from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
// import {For} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    JclandComponent,
    SnippetComponent,
    JctxtmsgComponent,
    AboutComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxChartsModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
