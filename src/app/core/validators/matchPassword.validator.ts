import { AbstractControl, ValidationErrors } from '@angular/forms';

export const MatchPasswordValidator = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('password');
  const repeatPassword = form.get('repeatPassword');

  if(password?.dirty && repeatPassword?.dirty && password.value !== repeatPassword.value){
    repeatPassword.setErrors({notMatch: true});
    return {notMatch: true};
  }
  return null;
};