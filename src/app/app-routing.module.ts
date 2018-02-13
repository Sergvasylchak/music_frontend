import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SongsComponent} from './songs/songs.component';
import {HomeComponent} from './home/home.component';
import {SongComponent} from './songs/song/song.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'songs', component: SongsComponent},
  {path: 'songs/:id/details', component: SongComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
