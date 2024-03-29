import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VoteComponent } from './vote/vote.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
    { path: '', component: VoteComponent },
    { path: 'vote', component: VoteComponent },
    { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
