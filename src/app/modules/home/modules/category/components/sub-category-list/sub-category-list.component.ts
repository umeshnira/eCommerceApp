import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubCategoryService } from '../../services/sub-category.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SubCategoryModel } from '../../models/sub-category.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})

export class ListSubCategoryComponent implements OnInit, OnDestroy {

  categoryId: any;
  categories: any;
  categoriesByPath: any;

  subCategories: SubCategoryModel;
  subscription: ISubscription;
  getCategoriesSubscription: ISubscription;
  field: Object;

  constructor(
    private service: SubCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllCategories();
  }

  goToEditPage(id) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: {
        subCategoryId: id,
      },
      relativeTo: this.route
    };
    this.router.navigate(['edit'], navigationExtras);

  }

  deleteSubCategory(id) {

    this.service.deleteSubCategory(id).subscribe(response => {
      console.log('Deleted sub category');
    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getAllCategories() {

    this.subscription = this.service.getAllSubCategories().subscribe(response => {
      if (response) {
        this.categoriesByPath = response;

      }
    },
      (error) => {
        console.log(error);
      }
    );
  }

}
