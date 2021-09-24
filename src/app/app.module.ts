import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TimefiltersComponent } from './components/timefilters/timefilters.component';
import { KwfiltersComponent } from './components/kwfilters/kwfilters.component';
import { HttpClientModule } from '@angular/common/http';

import { TagInputModule } from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TagGroupComponent } from './components/tag-group/tag-group.component';
import { TogglerButtonComponent } from './components/toggler-button/toggler-button.component';
import { InsightsComponent } from './components/insights/insights.component';
import { TableComponent } from './components/table/table.component'

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
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
