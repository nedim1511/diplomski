import { Component, OnInit } from '@angular/core';
import { Product, ProductResponseModel } from 'src/app/modals/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  items: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data: ProductResponseModel) => {
        this.items = data.data;
      });
  }

}
