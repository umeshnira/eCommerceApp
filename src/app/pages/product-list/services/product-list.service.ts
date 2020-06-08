import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  url = environment.api.baseUrl;
  constructor(private http: HttpClient) { }


  getProductList() {
    return this.http.get<any>(this.url + '/subProductTypes/getAllSubProdctTypes');
  }

  getSubProductListAganistProductTypeId(id) {
    return this.http.get<any>(this.url + '/subProductTypes/getSubProductTypesAganistProductTypeId/' + id);
  }
}
