import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { ProductListService } from './services/product-list.service';
import { ActivatedRoute } from '@angular/router';
import { SubProductTypeList, SubProductType } from './models/productList.model';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  field: Object;
  subCategoryList: any;
  subProductTypes: any;
  productTypes: any;
  result: any;
  model: SubProductTypeList;
  id: any;
  public continents = [
    {
    code: 'AF', name: 'Africa', countries: [
        { code: 'NGA', name: 'Nigeria' },
        { code: 'EGY', name: 'Egypt' },
        { code: 'ZAF', name: 'South Africa' }
    ]
}

];

public productType = [
  {
  code: 'aa', name: 'kitchen', subProductType: [
      { code: 'A', name: 'Fry Pan' },
      { code: 'EGY', name: 'Egypt' },
      { code: 'ZAF', name: 'South Africa' }
  ]
}

];


  constructor(private service: ProductListService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
    this.getSubProductList();
    
  }

  getSubProductList() {
    this.service.getSubProductListAganistProductTypeId(this.id).subscribe(response => {
      if (response) {
        this.result = response;
        this.model = new SubProductTypeList();
        this.model.id = this.result[0].productTypeId;
        this.model.name = this.result[0].productTypeName;
        this.model.subProductType = [];
        var tempArray = new SubProductType();

        this.result.forEach(element => {
          tempArray.id = element.subProductTypeId;
          tempArray.name = element.subProductTypeName;
          this.model.subProductType.push(tempArray);
          tempArray = new SubProductType();
        });
        //  this.field = { dataSource: this.continents, id: 'code', text: 'name', child: 'countries' };
        this.field = { dataSource: this.productType, id: 'code', text: 'name', child: 'subProductType' };
        console.log(this.field);

        console.log('model', this.model);
      }


    });
  }
 

  // ngAfterViewInit() {
  //   this.loadScript('assets/products/js/jquery-2.1.4.min.js');
  //   this.loadScript('assets/products/js/jquery-ui.js');
  //   this.loadScript('assets/products/js/easyResponsiveTabs.js');
  //   this.loadScript('assets/products/js/creditly.js');
  //   this.loadScript('assets/products/js/SmoothScroll.min.js');
  //   this.loadScript('assets/products/js/move-top.js');
  //   this.loadScript('assets/products/js/easing.js');
  //   this.loadScript('assets/products/js/imagezoom.js');
  //   this.loadScript('assets/products/js/jquery.flexisel.js');
  //   this.loadScript('assets/products/js/jquery.flexslider.js');
  //   this.loadScript('assets/products/js/bootstrap.js');
  //   this.loadScript('assets/products/js/carousel.js');
  // }

  // private loadScript(scriptUrl: string) {
  //   return new Promise((resolve, reject) => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = scriptUrl;
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   });
  // }
}
