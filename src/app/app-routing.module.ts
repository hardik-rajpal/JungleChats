import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResultspageComponent} from '../../src/app/components/resultspage/resultspage.component'
import {SubmitpageComponent} from '../../src/app/components/submitpage/submitpage.component'
import { LandingpageComponent } from './components/landingpage/landingpage.component';
const routes:Routes = [
    {path:'', component:LandingpageComponent},
    {path:'submitfile', component:SubmitpageComponent},
    {path:'results', component:ResultspageComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
export const routingComponents = [ResultspageComponent, SubmitpageComponent]