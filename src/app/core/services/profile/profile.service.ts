import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProfileInfo } from 'src/app/features/store/models/ProfileInfo';
import { User } from 'src/app/features/store/models/User';
import { profileUrl } from '../../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getProfileData$(): Observable<User> {
    return this.http.get<User>(profileUrl);
  }

  public postProfileData$(newData: ProfileInfo): Observable<ProfileInfo> {
    return this.http.put<ProfileInfo>(profileUrl, {...newData})
      .pipe(
        finalize(() => alert('Success'))
      );
  }
}
