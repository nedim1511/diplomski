import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { CartItem } from "src/app/modals/cart-item";
import { CartService } from "../../shared/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  public cartItems: Observable<CartItem[]> = of([]);
  public shoppingCartItems: CartItem[] = [];
  public total: number;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe((shoppingCartItems) => {
      this.shoppingCartItems = shoppingCartItems;
      let amount = 0;
      this.shoppingCartItems.forEach((item) => {
        amount += +(item.product.caption.slice(0, 6).replace(",", ""));
      });
      this.total = amount;
    });
  }

  // Remove cart items
  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  // Increase Product Quantity
  public increment(product: any, quantity: number = 1) {
    this.total += +(product.caption.slice(0, 6).replace(",", ""));
    this.cartService.updateCartQuantity(product, quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    if (this.total - +(product.caption.slice(0, 6).replace(",", "")) > 0) {
      this.total -= +(product.caption.slice(0, 6).replace(",", ""));
      this.cartService.updateCartQuantity(product, quantity);
    }
  }
  // Get Total
  public getTotal(): Observable<number> {
    console.log(this.cartService.getTotalAmount());
    return this.cartService.getTotalAmount();
  }
}
