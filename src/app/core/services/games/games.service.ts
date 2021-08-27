import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Game } from 'src/app/features/store/models/Game';
import { gamesUrl, userLibUrl } from '../../constants/urls';
import { Store } from '../../stores/defaultStore';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends Store<Game> {
  constructor(
    private readonly http: HttpClient,
  ) {
    super();
  }

  public getGames$(): Observable<Game[]> {
    this.getGamesFromServer$().subscribe(entities => {
      this.setState({entities: this.transformArray(entities, '_id')});
    });

    return this.getState$()
      .pipe(
        map(({entities}) => Object.values(entities)),
      );
  }

  public addGameToLib$(gameId: string) {
    return this.http.put(userLibUrl, { gameId })
      .pipe(
        finalize(() => this.deleteEntity(gameId))
      );
  }

  private getGamesFromServer$(): Observable<Game[]> {
    this.setState({isLoading: true});
    return this.http.get<Game[]>(gamesUrl)
      .pipe(
        finalize(() => this.setState({isLoading: false}))
      );
  }
}
