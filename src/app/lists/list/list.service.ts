import {Injectable} from "@angular/core";
import {SavedList} from "../../models/saved.list";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ListService {
  private listsUrl = 'api/lbry/lists/';

  constructor(private httpClient: HttpClient) {
  }

  getSavedList(id: number) {
    return this.httpClient.get<SavedList>(this.listsUrl + id.toString())
      .map((res: SavedList) => {
        res.songs.filter(s => Array.isArray(s.performers) && s.performers.length)
          .forEach(song => song.display = song.performers.reduce(c => c).name);
        return res;
      });
  }

  updateList(list: SavedList) {
    return this.httpClient.put<SavedList>(this.listsUrl + list.id.toString(), list)
      .map(res => res);
  }

  createList(list: SavedList) {
    return this.httpClient.post<SavedList>(this.listsUrl, list)
      .map(res => res);
  }
}
