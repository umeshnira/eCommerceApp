import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  categoryList=[

    {
      "CategoryID":1,
      "CategoryName":"Kitchen"
    },
    {
      "CategoryID":2,
      "CategoryName":"Household"
    },
    {
      "CategoryID":3,
      "CategoryName":"Snacks & Beverages"
    },
    {
      "CategoryID":4,
      "CategoryName":"Personal Care"
    },
    {
      "CategoryID":5,
      "CategoryName":"Gift Hampers"
    },
    {
      "CategoryID":6,
      "CategoryName":"Fruits & Vegetables"
    },
    {
      "CategoryID":7,
      "CategoryName":"Baby Care"
    },
    {
      "CategoryID":8,
      "CategoryName":"Soft Drinks & Juices"
    },
    {
      "CategoryID":9,
      "CategoryName":"Frozen Food"
    },
    {
      "CategoryID":10,
      "CategoryName":"Bread & Bakery"
    },
    {
      "CategoryID":11,
      "CategoryName":"Sweets"
    },
  ];
  constructor() { }
  getCategories(){
    return this.categoryList;
  }
}
