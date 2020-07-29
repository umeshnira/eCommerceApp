import { ReviewComponent } from "./review.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ViewReviewsComponent } from "./view-reviews/view-reviews.component";
const reviewRoutes = [
    {
        path: '',
        component: ReviewComponent
    },
    {
        path: 'review-details',
        component: ViewReviewsComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(reviewRoutes)],
    exports: [RouterModule]
})

export class ReviewRoutingModule { }
