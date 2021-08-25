import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPasswordValidator } from 'src/app/core/validators/matchPassword.validator';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup = new FormGroup({});

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
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_-]{3,10}$"),
      ]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.pattern("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$"),
      ]),
      repeatPassword: new FormControl(null, Validators.required),
    }, MatchPasswordValidator);
  }

  public onSubmit() {
    this.authService.register(this.registerForm.value);
  }
}
