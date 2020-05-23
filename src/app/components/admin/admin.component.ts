import { Component, OnInit } from "@angular/core";
import { Product, ProductResponseModel } from "src/app/modals/product.model";
import { ProductService } from "../shared/services/product.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.sass"],
})
export class AdminComponent implements OnInit {
  items: Product[] = [];

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService
      .getProducts()
      .subscribe((data: ProductResponseModel) => {
        this.items = data.data;
        console.log(this.items);
      });
  }

  removeItem(item: Product) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.http.delete("http://localhost:3000/dev/delete-product?id=" + item.id).subscribe(() => {
        this.items = [];
        this.loadProducts();
      });
    }
  }
}
