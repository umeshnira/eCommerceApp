import { Status } from 'src/app/shared/enums/user-status.enum';

export class SubCategoryModel {

    name: string;
    description: string;
    status: Status;
    parent_category_id: number;
    created_by: string;
    updated_by: string;
}


