import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module'
import { TagInputModule } from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { JclandComponent } from './pages/jcland/jcland.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { JctxtmsgComponent } from './components/jctxtmsg/jctxtmsg.component'
import  {DatePipe} from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { QuotesPageComponent } from './pages/quotespage/quotespage.component';
import { QuoteComponent } from './components/quote/quote.component';
// import {For} from '@angular/forms';
import { NgxTwitterWidgetsModule } from 'ngx-twitter-widgets';
@NgModule({
  declarations: [
    AppComponent,
    JclandComponent,
    SnippetComponent,
    JctxtmsgComponent,
    AboutComponent,
    QuotesPageComponent,
    QuoteComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxTwitterWidgetsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
