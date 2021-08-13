import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchValidator } from 'src/app/core/validators/matchPassword.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});

  constructor() { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_-]{3,16}$"),
      ]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.pattern("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$"),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required, 
        MatchValidator.bind(this),
      ]),
    });
  }
}
