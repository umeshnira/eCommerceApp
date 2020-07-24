import { Status } from 'src/app/shared/enums/user-status.enum';
import { UserRole } from 'src/app/shared/enums/user-role.enum';

export class SellerModel {
    id: number;
    status: Status;
    name: string;
    address: string;
    landmark: string;
    pincode: string;
    email: string;
    phone: string;
    aadhar_card_no: string;
    pan_card_no: string;
    bank_name: string;
    bank_ac_no: string;
    branch_name: string;
    ifsc_code: string;
    created_by: string;
    created_at: Date;
    updated_by: string;
    updated_at: Date;
    user_name: string;
    password: string;
    role: UserRole;

}
