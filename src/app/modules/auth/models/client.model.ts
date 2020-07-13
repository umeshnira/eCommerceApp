import { Constants } from 'src/app/shared/models/constants';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { UserRole } from 'src/app/shared/enums/user-role.enum';

export class ClientModel {
    id: number;
    status: Status;
    name: string ;
    address: string;
    landmark: string;
    pin_code: string;
    email: string;
    phone: string;
    created_by: string;
    created_at: Date;
    updated_by: string;
    updated_at: Date;
    user_name: string;
    password: string;
    role: UserRole;
}
