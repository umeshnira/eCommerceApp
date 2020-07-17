import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class HeaderService {

  subject: Subject<any> = new Subject<any>();
  observable: Observable<any> = this.subject.asObservable();

  constructor() { }

  emitCategoryId(categoryId: number) {
    this.subject.next(categoryId);
  }

  getCategoryId(): Observable<any> {
    return this.subject.asObservable();
}
}
