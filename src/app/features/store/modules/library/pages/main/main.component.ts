import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/core/constants/urls';
import { LibraryService } from 'src/app/core/services/library/library.service';
import { Game } from 'src/app/features/store/models/Game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public games$: Observable<Game[]> = new Observable();
  public loading$: Observable<boolean> = new Observable();
  constructor(
    private readonly libService: LibraryService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.games$ = this.libService.getGames$();
    this.loading$ = this.libService.isLoading$();
  }

  public download(game: Game) {
    alert(`${game.name} is downloading now!`);
  }

  public share(game: Game): string {
    return `${baseUrl}${this.router.url}/${game._id}/${game.name}/`;
  }

}
