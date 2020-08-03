import { Status } from 'src/app/shared/enums/user-status.enum';
import { Constants } from 'src/app/shared/models/constants';

export class CategoryModel {
    id: number;
    name: string;
    description: string;
    parent_category_id: number;
    hasSubCategory = false;
    status: Status;
    created_by = Constants.admin;
    updated_by = Constants.admin;
    updated_at: Date;
    created_at: Date;
}

