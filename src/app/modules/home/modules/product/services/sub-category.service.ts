import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SubCategoryModel } from '../models/sub-category.model';

@Injectable()

export class SubCategoryService {

  url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  getSubCategoriesByCategoryId(id) {

    return this.http.get<any>(this.url + '/categories/' + id + '/subcategories');
  }

  getSubCategoriesTree() {
    return this.http.get<SubCategoryModel>(this.url + '/subcategories');
}
}
