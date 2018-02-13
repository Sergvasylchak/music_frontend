import {Component, OnInit, ViewChild} from '@angular/core';
import {Song} from '../../models/song';
import {SongService} from './song.service';

import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import {AudioComponent} from '../../_shared/audio/audio.component';
import {ActivatedRoute} from '@angular/router';
import {constants} from '../../_shared/utils/constants';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @ViewChild(AudioComponent) audio: AudioComponent;

  id: number;
  private song: Song;
  private sub: any;
  private url: string = constants.PARAMS.BLANK;

  constructor(private songsService: SongService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getSong(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete(song: Song) {
    this.songsService.delete(song)
      .subscribe(() => this.getSong(this.id))
  }

  getSong(id: number) {
    this.songsService.getSongById(id)
      .subscribe(song => {
        this.song = song;
        this.url =  'https://www.youtube.com/embed/' + this.song.url + '?autoplay=1';
      });
  }
}
