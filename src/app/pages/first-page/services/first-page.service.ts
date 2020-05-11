import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstPageService {
  loadRandomProductsList=[

    {
      "imageName":"1.jpeg",
      "ProductName":"Polo T-Shirt",
      "actualPrice":"65.50",
      "price":"45.50",
       "productStatus":"Sold Out!",
       "cartQuant":1
    },
    {
      "imageName":"1.jpeg",
      "ProductName":"Polo T-Shirt",
      "actualPrice":"65.50",
      "price":"47.50",
       "productStatus":"Sold Out!",
       "cartQuant":1
    },
    {
      "imageName":"1.jpeg",
      "ProductName":"Polo T-Shirt",
      "actualPrice":"65.50",
      "price":"75.50",
       "productStatus":"Sold Out!",
       "cartQuant":1
    },
    {
      "imageName":"1.jpeg",
      "ProductName":"Polo T-Shirt",
      "actualPrice":"65.50",
      "price":"95.50",
       "productStatus":"Sold Out!",
       "cartQuant":1
    },
    {
      "imageName":"1.jpeg",
      "ProductName":"Polo T-Shirt",
      "actualPrice":"65.50",
      "price":"35.50",
       "productStatus":"Sold Out!",
       "cartQuant":1
    }
  ];
  constructor() { }
 
  loadRandomProduct(){

  }
}
