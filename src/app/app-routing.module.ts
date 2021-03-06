import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SongsComponent} from './songs/songs.component';
import {HomeComponent} from './home/home.component';
import {SongComponent} from './songs/song/song.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./admin/users/users.component";
import {ListsComponent} from "./lists/lists.component";
import {ListComponent} from "./lists/list/list.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'songs', component: SongsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
  {path: 'lists/:id/details', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'songs/:id/details', component: SongComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},

  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
