import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../shared/services/product.service";
import { Product, ProductResponseModel } from "src/app/modals/product.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})
export class HomeComponent implements OnInit {
  products: Product[];
  public banners = [];
  public slides = [
    {
      title: "GET YOUR GRASS A HAIRCUT",
      subtitle: "Don't worry, she will grow a new one",
      image: "assets/images/carousel/cover-1.jpg",
    },
    {
      title: "SLEEP LIKE ON CLOUDS",
      subtitle: "You know you need it. Yes...",
      image: "assets/images/carousel/cover-2.jpg",
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getBanners().subscribe((data) => (this.banners = data));

    this.productService
      .getProducts()
      .subscribe((data: ProductResponseModel) => {
        this.products = data.data;
        console.log(this.products);
      });
  }
}
