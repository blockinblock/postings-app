import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostingsComponent } from './postings/postings.component';
import { DetailsComponent } from './details/details.component';
import { DetailsResolver } from './details/details-resolver.service';
import { SanitizeHtmlPipe } from './details/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostingsComponent,
    DetailsComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DetailsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
