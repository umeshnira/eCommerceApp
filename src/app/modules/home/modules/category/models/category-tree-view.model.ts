export class CategoryTreeViewModel {
    id: number;
    name: string;
    parent_category_id: number;
    created_by: string;
    created_at: string;
    subCategories: CategoryTreeViewModel[] = [];
}
