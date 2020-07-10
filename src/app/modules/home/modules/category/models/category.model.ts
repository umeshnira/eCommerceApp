import { Status } from 'src/app/shared/enums/user-status.enum';

export class CategoryModel {

    id: number;
    name: string;
    description: string;
    status: Status;
    created_by: string;
}

