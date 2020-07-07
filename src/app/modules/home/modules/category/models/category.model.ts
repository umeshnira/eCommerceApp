import { Status } from 'src/app/shared/enums/user-status.enum';

export class CategoryModel {

    name: string;
    description: string;
    status: Status;
    created_by: string;
}

