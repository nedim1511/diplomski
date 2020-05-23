import { Component, OnInit } from "@angular/core";
import { CartService } from "../../shared/services/cart.service";
import { Observable, of } from "rxjs";
import { CartItem } from "src/app/modals/cart-item";
import { ProductService } from "../../shared/services/product.service";
import { StripeToken, StripeSource } from "stripe-angular";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

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
  orderList: any[] = [];

  amount: number;
  payments: string[] = ["Free Shipping"];
  paymantWay: string[] = ["Direct Bank Transfer", "PayPal"];

  constructor(
    private cartService: CartService,
    public productService: ProductService,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe((products) => (this.buyProducts = products));
    this.buyProducts.forEach((product) => {
      this.orderList.push({
        type: "sku",
        parent: product.product.attributes[0],
        quantity: product.quantity,
      });
      this.total +=
        +product.product.caption
          .substr(0, product.product.caption.indexOf(" "))
          .split(",")
          .join("") * product.quantity;
    });
  }

  onStripeInvalid(error: Error) {
    console.log("Validation Error", error);
  }

  setStripeToken(token: StripeToken) {
    if (this.clientValidation()) {
      if (token) {
        this.spinner.show();
        const tokenToSend = { id: token.id, email: this.email, ime: this.name };
        this.http
          .post(
            "http://localhost:3000/dev/purchases",
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
          .subscribe(
            (res: any) => {
              if (res && res.message) {
                this.spinner.hide();
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
              } else {
                this.spinner.hide();
              }
            },
            (error) => {
              console.log(error);
              this.spinner.hide();
            }
          );
      }
    }
  }

  setStripeSource(source: StripeSource) {
    console.log("Stripe source", source);
  }

  private clientValidation(): boolean {
    let isValid = true;
    if (!this.name || this.name == "") {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter your name",
        icon: "error",
      });
      isValid = false;
    } else if (!this.email || this.email == "") {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter your email address",
        icon: "error",
      });
      isValid = false;
    } else if (!this.line1) {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter your address",
        icon: "error",
      });
      isValid = false;
    } else if (!this.city) {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter your city name",
        icon: "error",
      });
      isValid = false;
    } else if (!this.postal_code) {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter your postal code",
        icon: "error",
      });
      isValid = false;
    }
    return isValid;
  }
}
