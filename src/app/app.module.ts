import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SongsService} from './songs/songs.service';
import {SongsComponent} from './songs/songs.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    SongsComponent,
    HomeComponent
  ],
  providers: [SongsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
