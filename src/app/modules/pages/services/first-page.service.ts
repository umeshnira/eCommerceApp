import { Injectable } from '@angular/core';

@Injectable()

export class FirstPageService {

  loadRandomProductsList = [

    {
      'productID': 1,
      'imageName': 'm1.jpg',
      'ProductName': 'Almonds, 100g',
      'actualPrice': '280.00',
      'price': '149.00',
      'productStatus': 'New!',
      'cartQuant': '1'
    },
    {
      'productID': 2,
      'imageName': 'm2.jpg',
      'ProductName': 'Cashew Nuts, 100g',
      'actualPrice': '420.00',
      'price': '200.00',
      'productStatus': 'New!',
      'cartQuant': '1'
    },
    {
      'productID': 3,
      'imageName': 'm3.jpg',
      'ProductName': 'Pista..., 250g',
      'actualPrice': '600.99',
      'price': '520.99',
      'productStatus': 'New!',
      'cartQuant': '1'
    }
  ];
  constructor() { }

  loadRandomProduct() {

  }
}
