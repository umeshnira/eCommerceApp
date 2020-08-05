import { ReviewComponent } from './review.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { ReviewRoutingModule } from './review-routing.module';
import { NgModule } from '@angular/core';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';

const modules = [SharedModule, ReviewRoutingModule];

const components = [ReviewComponent, ViewReviewsComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class ReviewModule { }
