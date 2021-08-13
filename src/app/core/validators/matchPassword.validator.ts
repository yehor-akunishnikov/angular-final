import { AbstractControl, ValidationErrors } from '@angular/forms';

export const MatchValidator = (
    form: AbstractControl, 
  ): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const repeatPassword = form.get('repeatPassword')?.value;

  console.log(this);

  return password === repeatPassword ? null : { match: repeatPassword }
}