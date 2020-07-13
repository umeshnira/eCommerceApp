import { Status } from 'src/app/shared/enums/user-status.enum';
import { Constants } from 'src/app/shared/models/constants';

export class SubCategoryModel {
    id: number;
    name: string;
    description: string;
    status: Status;
    parent_category_id: number;
    created_at: Date;
    updated_at: Date;
    created_by = Constants.admin;
    updated_by = Constants.admin;
    path: string;
}


