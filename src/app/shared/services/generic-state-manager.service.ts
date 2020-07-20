import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class GenericStateManagerService {

  categoryId: number;

  categoryIdChanged = new Subject<number>();

  constructor() { }

  emitCategoryId(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryIdChanged.next(this.categoryId);
  }

}
