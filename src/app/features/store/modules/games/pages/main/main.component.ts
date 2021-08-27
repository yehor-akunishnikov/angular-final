import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GamesService } from 'src/app/core/services/games/games.service';
import { Game } from 'src/app/features/store/models/Game';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public gamesSearchForm: FormGroup = new FormGroup({});
  public games$: Observable<Game[]> = new Observable();
  public loading$: Observable<boolean> = new Observable();

  constructor(
    private readonly gamesService: GamesService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.games$ = this.gamesService.getGames$();
    this.loading$ = this.gamesService.isLoading$();
  }

  private initForm() {
    this.gamesSearchForm = new FormGroup({
      searchInput: new FormControl(''),
      priceSlider: new FormControl(0),
      tagCheckboxes: new FormGroup({
        indie: new FormControl(null),
        action: new FormControl(null),
        adventure: new FormControl(null),
      }),
    });
  }

  public get tags() {
    const tagsObject = this.gamesSearchForm.value.tagCheckboxes;
    return Object.keys(tagsObject).filter(tag => tagsObject[tag]);
  }

  public get filters() {
    const formData = this.gamesSearchForm.value;

    return {
      searchText: formData.searchInput,
      maxPrice: formData.priceSlider,
      tags: this.tags,
    };
  }

  public addGameToLib(game: Game) {
    this.gamesService.addGameToLib$(game._id).subscribe();
  }

  public Logger() {
    console.log(this.tags);
  }

}
