import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/features/store/models/User';

@Pipe({
  name: 'searchFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(users: User[], searchText: string): any[] {
    if (!users) return []; 
    if (!searchText) return users;
    
    searchText = searchText.toLocaleLowerCase();
    return users.filter(user => {
      return user.username.toLocaleLowerCase().includes(searchText);
    });
  }

}
