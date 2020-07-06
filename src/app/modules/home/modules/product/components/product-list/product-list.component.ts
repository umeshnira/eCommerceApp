import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategoryService } from '../../services/sub-category.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Categories, SubCategories } from '../../models/productList.model';

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
  modelResult: Categories[] = [];
  subscription: ISubscription;

  constructor(
    private service: SubCategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.queryParams.id;
    this.getSubProductList();
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getSubProductList() {

    this.subscription = this.service.getSubCategoriesByCategoryId(this.id).subscribe(response => {
      if (response) {
        this.result = response;
        this.field = { dataSource: this.result, id: 'id', text: 'name', child: 'subCategories' };
      }
    });
  }

}
