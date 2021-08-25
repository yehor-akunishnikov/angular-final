import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, criteria: string): any[] {
    if (!items) return []; 
    if (!searchText) return items;
    
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {
      return it[criteria].toLocaleLowerCase().includes(searchText);
    });
  }

}
