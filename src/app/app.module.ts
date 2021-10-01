import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TimefiltersComponent } from './components/timefilters/timefilters.component';
import {KwfiltersComponent} from './components/kwfilters/kwfilters.component';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module'
import { TagInputModule } from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TagGroupComponent } from './components/tag-group/tag-group.component';
import { TogglerButtonComponent } from './components/toggler-button/toggler-button.component';
import { InsightsComponent } from './components/insights/insights.component';
import { TableComponent } from './components/table/table.component';
import { MylinechartComponent } from './components/mylinechart/mylinechart.component';
import { ResultspageComponent } from './components/resultspage/resultspage.component';
import { SubmitpageComponent } from './components/submitpage/submitpage.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ScatterdaysComponent } from './components/scatterdays/scatterdays.component';
import { JclandComponent } from './components/jcland/jcland.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { JctxtmsgComponent } from './components/jctxtmsg/jctxtmsg.component'
// import {For} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimefiltersComponent,
    KwfiltersComponent,
    TagGroupComponent,
    TogglerButtonComponent,
    InsightsComponent,
    TableComponent,
    MylinechartComponent,
    ResultspageComponent,
    SubmitpageComponent,
    LandingpageComponent,
    ScatterdaysComponent,
    JclandComponent,
    SnippetComponent,
    JctxtmsgComponent,

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
