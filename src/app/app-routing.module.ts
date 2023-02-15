import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { JclandComponent } from './pages/jcland/jcland.component';
import { QuotesPageComponent as QuotesPageComponent } from './pages/quotespage/quotespage.component';
const routes:Routes = [
    {path:'', component:JclandComponent},
    {path:'thejungle', component:JclandComponent},
    {path:'quotes', component:QuotesPageComponent},
    {path:'about', component:AboutComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
