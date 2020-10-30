import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostingsComponent } from './postings/postings.component';
import { DetailsComponent } from './details/details.component';
import { DetailsResolver } from './details/details-resolver.service';

import { DetailsGuard } from './details/details-guard.service';

const routes: Routes = [
  { path: '', component: PostingsComponent },
  { path: 'details/:id',
    canActivate: [ DetailsGuard ],
    component: DetailsComponent,
    resolve: { details: DetailsResolver }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
