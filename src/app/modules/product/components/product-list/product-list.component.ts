import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubProductTypeList, SubProductType } from '../../models/productList.model';
import { SubProductTypeService } from '../../services/subProductType.service';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit, OnDestroy {

  subCategoryList: any;
  subProductTypes: any;
  productTypes: any;
  result: any;
  id: any;
  field: Object;
  modelResult: SubProductTypeList[] = [];
  subscription: ISubscription;

  constructor(
    private service: SubProductTypeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.queryParams.id;
    this.getSubProductList();
  }

  getSubProductList() {

    this.subscription = this.service.getSubProductListAganistProductTypeId(this.id).subscribe(response => {
      if (response) {
        this.result = response;
        const model = new SubProductTypeList();
        model.id = this.result[0].productTypeId;
        model.name = this.result[0].productTypeName;
        model.expanded = true;
        model.subProductType = [];

        if (this.result && this.result.length > 0) {

          this.result.forEach(element => {
            const subProductTypeModel = new SubProductType();
            subProductTypeModel.id = element.subProductTypeId;
            subProductTypeModel.name = element.subProductTypeName;
            model.subProductType.push(subProductTypeModel);
          });
        }
        this.modelResult.push(model);
        this.field = { dataSource: this.modelResult, id: 'id', text: 'name', child: 'subProductType' };

      }
    });
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
