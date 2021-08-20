import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

interface CustomError extends Error {
  error: {
    message: string,
  }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public handleError$(error: CustomError) {
    alert(error.error.message);
    return throwError(error);
  }
}
