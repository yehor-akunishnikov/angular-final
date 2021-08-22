import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/features/store/models/Friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public getFriends$(url: string): Observable<Friend[]>  {
    return this.http.get<Friend[]>(`http://localhost:8080/api${url}`);
  }

  public addFriend$(friendId: string) {
    return this.http.put('http://localhost:8080/api/users/me/friends', {friendId});
  }

  public removeFriend$(friendId: string) {
    return this.http.patch('http://localhost:8080/api/users/me/friends', {friendId});
  }

}
