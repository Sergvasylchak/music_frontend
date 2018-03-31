import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SongsService} from './songs/songs.service';
import {SongsComponent} from './songs/songs.component';
import {HomeComponent} from './home/home.component';
import {PaginationComponent} from './_shared/pagination/pagination.component';
import {SearchComponent} from './_shared/search/search.component';
import {AudioComponent} from './_shared/audio/audio.component';
import {SafeUrlPipe} from './_shared/pipes/SafeUrlPipe';
import {SongComponent} from './songs/song/song.component';
import {SongService} from './songs/song/song.service';

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
    SongComponent,
    HomeComponent,
    PaginationComponent,
    SearchComponent,
    AudioComponent,
    SafeUrlPipe
  ],
  providers: [SongsService, SongService],
  bootstrap: [AppComponent],
  exports: [PaginationComponent, SearchComponent]
})
export class AppModule {
}
