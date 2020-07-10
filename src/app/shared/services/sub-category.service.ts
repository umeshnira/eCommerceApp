import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SubCategoryModel } from '../../modules/home/modules/category/models/sub-category.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { catchError } from 'rxjs/operators';
import { CategoryTreeViewModel } from 'src/app/modules/home/modules/category/models/category-tree-view.model';

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

    editSubCategory(id: number, model: SubCategoryModel) {
        const url = `${this.baseUrl}/subcategories/${id}`;
        return this.http.put<ApiResponseModel>(url, model)
            .pipe(catchError(this.handleError)
            );
    }

    getSubCategory(id: number) {
        const url = `${this.baseUrl}/subcategories/${id}`;
        return this.http.get<SubCategoryModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    deleteSubCategory(id: number) {
        const url = `${this.baseUrl}/subcategories/${id}`;
        return this.http.delete<ApiResponseModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    getAllSubCategories() {
        const url = `${this.baseUrl}/subcategories/path`;
        return this.http.get<SubCategoryModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    getSubCategoriesByCategoryId(id: number) {
        const url = `${this.baseUrl}/categories/${id}/subcategories`;
        return this.http.get<CategoryTreeViewModel>(url);
      }
}
