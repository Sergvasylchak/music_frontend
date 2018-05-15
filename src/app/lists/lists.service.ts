import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SavedList} from "../models/saved.list";

@Injectable()
export class ListsService {
  private listsUrl = 'api/lbry/lists/';

  constructor(private httpClient: HttpClient) {
  }

  getSavedLists() {
    return this.httpClient.get<SavedList[]>(this.listsUrl)
      .map((res: SavedList[]) => res);
  }

  delete(list: SavedList) {
    return this.httpClient.delete<any>(this.listsUrl + list.id.toString())
      .map(res => res);
  }
}
