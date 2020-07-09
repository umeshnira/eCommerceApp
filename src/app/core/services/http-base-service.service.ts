import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';

@Injectable()
export class HttpBaseService {

  constructor() { }

  protected handleError(error: Response): Observable<any> {
    return observableThrowError(error || 'Server error');
  }
}
