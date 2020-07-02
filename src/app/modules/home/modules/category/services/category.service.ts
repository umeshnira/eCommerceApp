import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';

@Injectable()

export class CategoryService {

    url = environment.api.baseUrl;

    constructor(private http: HttpClient) { }

    addCategory(model) {
        return this.http.post<ApiResponseModel>(this.url + '/ecommerce/categories', model);
    }

    getCategories() {
        return this.http.get<CategoryModel>(this.url + '/ecommerce/categories');
    }

    getCategory(id) {
        return this.http.get<CategoryModel>(this.url + '/ecommerce/categories/' + id);
    }

    editCategory(id, model: CategoryModel) {
        return this.http.put<any>(this.url + '/ecommerce/categories/' + id , model);
    }

    deleteCategory(id) {
        return this.http.delete<ApiResponseModel>(this.url + '/ecommerce/categories/' + id);
    }

}
