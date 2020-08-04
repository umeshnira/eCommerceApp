export class CategoryTreeViewModel {
    id: number;
    name: string;
    parent_category_id: number;
    isSelected: boolean;
    expanded: boolean;
    created_by: string;
    created_at: string;
    subCategories: CategoryTreeViewModel[] = [];
}
