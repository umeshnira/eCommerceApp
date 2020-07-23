export class RoutePathConfig {
    // Auth
    public static readonly ClientRegister = 'client/register';
    public static readonly SellerRegister = 'seller/register';
    public static readonly Login = 'auth/login';

    // Home
    public static readonly Cart = 'cart';
    public static readonly WishList = 'wishlist';
    public static readonly Home = 'home';

    // Order
    public static readonly Order = 'order';
    public static readonly OrderCreate = 'create';
    public static readonly OrderReturn = 'return';

    // Payment
    public static readonly Payment = 'payment';
    public static readonly PaymentDelivery = 'delivery';
    public static readonly PaymentMethod = 'payment/method';

    // Products
    public static readonly Products = 'products';
    public static readonly ProductsDetail = 'products/details';
    public static readonly CreateProducts = 'products/add';

    // Category
    public static readonly CreateCategory = 'categories/create';
    public static readonly CategoryList = 'categories';

    // Sub-categories
    public static readonly CreateSubCategory = 'categories/sub-categories/create';
    public static readonly SubCategoryList = 'categories/sub-categories';
}

