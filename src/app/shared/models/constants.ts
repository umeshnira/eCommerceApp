export class Constants {

    public static readonly emailPattern = /^[_A-Za-z0-9]+(\.[_A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/;
    public static readonly validationPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
    public static readonly client = 'Client';
    public static readonly seller = 'Seller';
    public static readonly admin = 'Admin';
}
