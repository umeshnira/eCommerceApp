import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../../modules/home/modules/category/models/category.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { catchError } from 'rxjs/operators';

@Injectable()

export class CategoryService extends HttpBaseService {

    baseUrl = environment.api.baseUrl;

    constructor(private http: HttpClient) {

        super();
    }

    addCategory(model) {
        const url = `${this.baseUrl}/categories`;
        return this.http.post<ApiResponseModel>(url, model)
            .pipe(catchError(this.handleError)
            );
    }

    getCategories() {
        const url = `${this.baseUrl}/categories`;
        return this.http.get<CategoryModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    getCategory(id) {
        const url = `${this.baseUrl}/categories/${id}`;
        return this.http.get<CategoryModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

    editCategory(id, model: CategoryModel) {
        const url = `${this.baseUrl}/categories/${id}`;
        return this.http.put<any>(url, model)
            .pipe(catchError(this.handleError)
            );
    }

    deleteCategory(id) {
        const url = `${this.baseUrl}/categories/${id}`;
        return this.http.delete<ApiResponseModel>(url)
            .pipe(catchError(this.handleError)
            );
    }

}
