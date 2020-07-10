import { Status } from 'src/app/shared/enums/user-status.enum';

export class SubCategoryModel {

    id: number;
    name: string;
    description: string;
    status: Status;
    parent_category_id: number;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
    path: string;
}


