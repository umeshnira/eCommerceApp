import { Constants } from 'src/app/shared/models/constants';

export class SellerModel {

    sellerId: any;
    sellerName: string;
    address: any;
    landMark: any;
    pincode: any;
    email: string;
    isDeleted: boolean;
    phoneNo: string;
    loginId: any;
    aadharCard: any;
    pancard: any;
    bankActNo: any;
    isfcCode: any;
    password: any;
    role =  Constants.seller;
}
