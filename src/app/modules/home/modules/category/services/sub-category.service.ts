import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubCategoryModel } from '../models/sub-category.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';

@Injectable()

export class SubCategoryService {

    url = environment.api.baseUrl;

    constructor(private http: HttpClient) { }

    addSubCategory(model: SubCategoryModel) {
        return this.http.post<ApiResponseModel>(this.url + '/ecommerce/subcategories', model);
    }

    getSubCategoriesTree() {
        return this.http.get<SubCategoryModel>(this.url + '/ecommerce/subcategories');
    }

    editSubCategory(id, model: SubCategoryModel) {
        return this.http.put<ApiResponseModel>(this.url + '/ecommerce/subcategories/' + id , model);
    }

    getSubCategory(id) {
        return this.http.get<SubCategoryModel>(this.url + '/ecommerce/subcategories/' + id);
    }

    deleteSubCategory(id) {
        return this.http.delete<ApiResponseModel>(this.url + '/ecommerce/subcategories/' + id);
    }

    getAllSubCategories() {
        return this.http.get<ApiResponseModel>(this.url + '/ecommerce/subcategories/path');
    }
}
