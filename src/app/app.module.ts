import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {LbryInterceptor} from "./_shared/interceptor/lbry.interceptor";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileService} from "./profile/profile.service";
import {UsersComponent} from "./admin/users/users.component";
import {UsersService} from "./admin/users/users.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    SongsComponent,
    SongComponent,
    ProfileComponent,
    PaginationComponent,
    SearchComponent,
    AudioComponent,
    SafeUrlPipe
  ],
  providers: [SongsService, UsersService, SongService, LoginService, ProfileService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: LbryInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: [PaginationComponent, SearchComponent]
})
export class AppModule {
}
