import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubCategoryModel } from '../../modules/home/modules/category/models/sub-category.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { catchError } from 'rxjs/operators';

@Injectable()

export class SubCategoryService extends HttpBaseService {

    baseUrl = environment.api.baseUrl;

    constructor(private http: HttpClient) {

        super();
    }

    addSubCategory(model: SubCategoryModel) {
        const url = `${this.baseUrl}/subcategories`;
        return this.http.post<ApiResponseModel>(url, model)
            .pipe(catchError(this.handleError)
            );
    }

    getSubCategoriesTree() {
        const url = `${this.baseUrl}/subcategories`;
        return this.http.get<SubCategoryModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    editSubCategory(id, model: SubCategoryModel) {
        const url = `${this.baseUrl}/subcategories/${id}`;
        return this.http.put<ApiResponseModel>(url, model)
            .pipe(catchError(this.handleError)
            );
    }

    getSubCategory(id) {
        const url = `${this.baseUrl}/subcategories/${id}`;
        return this.http.get<SubCategoryModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    deleteSubCategory(id) {
        const url = `${this.baseUrl}/subcategories/${id}`;
        return this.http.delete<ApiResponseModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    getAllSubCategories() {
        const url = `${this.baseUrl}/subcategories/path`;
        return this.http.get<ApiResponseModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    getSubCategoriesByCategoryId(id) {
        const url = `${this.baseUrl}/categories/${id}/subcategories`;
        return this.http.get<any>(url);
      }
}
