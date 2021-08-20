import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private readonly authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.authService.unSub();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_-]{3,10}$"),
      ]),
      password: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  public onSubmit() {
    this.authService.login$(this.loginForm.value);
  }
}
