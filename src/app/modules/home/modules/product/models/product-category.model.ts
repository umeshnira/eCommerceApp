import { Status } from 'src/app/shared/enums/user-status.enum';

export class Category {

    status: Status;
    updated_by: string;
    inserted_by = 'Seller';
    category_id: number;
}
