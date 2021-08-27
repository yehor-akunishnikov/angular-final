import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ProfileInfo } from 'src/app/features/store/models/ProfileInfo';
import { User } from 'src/app/features/store/models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public profileForm: FormGroup = new FormGroup({});
  public profile: User | null = null;

  constructor(
    private readonly profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.profileService.getProfileData$().subscribe(
      (user: User) => {
        this.profile = user;
        this.profileForm.patchValue({
          username: user.username,
          age: user.age,
          email: user.email,
        });
      },
    );
    this.initForm();
  }

  private initForm() {
    this.profileForm = new FormGroup({
      username: new FormControl(null),
      age: new FormControl(null),
      email: new FormControl(null),
    });
  }

  public submitForm() {
    this.profileService.postProfileData$(this.profileForm.value)
      .subscribe();
  }

}
