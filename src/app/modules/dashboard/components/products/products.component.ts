import { Component, OnInit } from '@angular/core';
import { FirstPageService } from 'src/app/modules/home/services/first-page.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prodList;
  constructor(
    private fps: FirstPageService,
  ) { }

  ngOnInit(): void {
    this.prodList = this.fps.loadRandomProductsList;
  }

}
