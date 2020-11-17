import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostingsComponent } from './postings/postings.component';
import { FilterPipe } from './postings/filter.pipe';
import { DetailsComponent } from './details/details.component';
import { DetailsResolver } from './details/details-resolver.service';
import { SanitizeHtmlPipe } from './details/sanitize-html.pipe';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';
import { DetailsGuard } from './details/details-guard.service';
import { State } from './state.service';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PostingsComponent,
    DetailsComponent,
    SanitizeHtmlPipe,
    FilterPipe,
    LoadingSpinnerComponent,
    ResultsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ DetailsResolver, DetailsGuard, State ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
