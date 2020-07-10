import { Status } from 'src/app/shared/enums/user-status.enum';
import { Image } from './product-image.model';
import { Constants } from 'src/app/shared/models/constants';

export class ProductModel {

    id: number;
    name: string;
    description: string;
    batch_no: number;
    exp_date: Date;
    bar_code: string;
    about: string;
    status: Status;
    star_rate: number;
    is_returnable = true;
    created_by = Constants.seller;
    updated_by = Constants.seller;
    left_qty: number;
    total_qty: number;
    category_id: number;
    price: number;
    images: Image[] = [];
}





