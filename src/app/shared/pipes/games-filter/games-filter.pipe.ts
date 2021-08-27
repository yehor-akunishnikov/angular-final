import { Pipe, PipeTransform } from '@angular/core';
import { Game } from 'src/app/features/store/models/Game';

interface Filters {
  searchText: string,
  maxPrice: number,
  tags: string[],
}

@Pipe({
  name: 'gamesFilter'
})
export class GamesFilterPipe implements PipeTransform {

  transform(games: Game[], filters: Filters): Game[] {
    const { maxPrice, tags } = filters;
    let { searchText } = filters;

    if (!games) return [];
    searchText = searchText.toLocaleLowerCase();

    return games.filter(game => {
      const criteriaArray = [
        game.name.toLocaleLowerCase().includes(searchText),
        game.price.val < maxPrice || maxPrice === 0,
        tags.every(tag => game.tags.includes(tag)) || tags.length === 0,
      ];

      return criteriaArray.reduce((acc, criteria) => acc && criteria, true);
    });
  }

}
