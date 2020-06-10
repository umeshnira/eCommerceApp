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

export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

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
            const tempArray = new SubProductType();
            tempArray.id = element.subProductTypeId;
            tempArray.name = element.subProductTypeName;
            model.subProductType.push(tempArray);
          });
        }
        this.modelResult.push(model);
        this.field = { dataSource: this.modelResult, id: 'id', text: 'name', child: 'subProductType' };

      }
    });
  }

  ngAfterViewInit() {

    this.loadScript('assets/products/js/jquery-2.1.4.min.js');
    this.loadScript('assets/products/js/jquery-ui.js');
    this.loadScript('assets/products/js/easyResponsiveTabs.js');
    this.loadScript('assets/products/js/creditly.js');
    this.loadScript('assets/products/js/SmoothScroll.min.js');
    this.loadScript('assets/products/js/move-top.js');
    this.loadScript('assets/products/js/easing.js');
    this.loadScript('assets/products/js/imagezoom.js');
    this.loadScript('assets/products/js/jquery.flexisel.js');
    this.loadScript('assets/products/js/jquery.flexslider.js');
    this.loadScript('assets/products/js/bootstrap.js');
    this.loadScript('assets/products/js/carousel.js');
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadScript(scriptUrl: string) {

    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
