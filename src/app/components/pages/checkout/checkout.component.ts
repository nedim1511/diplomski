import { Component, OnInit } from "@angular/core";
import { CartService } from "../../shared/services/cart.service";
import { Observable, of } from "rxjs";
import { CartItem } from "src/app/modals/cart-item";
import { ProductService } from "../../shared/services/product.service";
import { StripeToken, StripeSource } from "stripe-angular";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.sass"],
})
export class CheckoutComponent implements OnInit {
  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  name: string;
  email: string;
  line1: string;
  city: string;
  postal_code: string;
  total = 0;
  orderList: { type: string; parent: string }[] = [];

  amount: number;
  payments: string[] = ["Create an Account?", "Flat Rate"];
  paymantWay: string[] = ["Direct Bank Transfer", "PayPal"];

  constructor(
    private cartService: CartService,
    public productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe((products) => (this.buyProducts = products));
    this.buyProducts.forEach((product) => {
      this.orderList.push({
        type: "sku",
        parent: product.product.attributes[0],
      });
      this.total += +product.product.caption.slice(0, 6).replace(",", "");
    });
  }

  onStripeInvalid(error: Error) {
    console.log("Validation Error", error);
  }

  setStripeToken(token: StripeToken) {
    if (token) {
      const tokenToSend = { id: token.id, email: this.email };
      this.http
        .post(
          "https://0sfx6uyldb.execute-api.eu-central-1.amazonaws.com/dev/purchases",
          {
            token: tokenToSend,
            order: {
              currency: "BAM",
              items: this.orderList,
              shipping: {
                name: this.name,
                address: {
                  line1: this.line1,
                  city: this.city,
                  postal_code: this.postal_code,
                },
              },
            },
          }
        )
        .subscribe((res: any) => {
          if (res && res.message) {
            // Sweet Alert
            // @ts-ignore
            Swal.fire({
              title: "Thank you!",
              text: "Order successfully processed.",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Okay",
            }).then((result) => {
              if (result.value) {
                this.cartService.clearCart();
                this.router.navigate(["/"]);
              }
            });
          }
        });
    }
  }

  setStripeSource(source: StripeSource) {
    console.log("Stripe source", source);
  }
}
