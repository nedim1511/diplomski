import { Injectable } from "@angular/core";
import { Product } from "src/app/modals/product.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CartItem } from "src/app/modals/cart-item";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject, Subscriber } from "rxjs";
import { MixpanelService } from "./mixpanel.service";
import { Location } from "@angular/common";

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];

@Injectable({
  providedIn: "root",
})
export class CartService {
  // Array
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(
    public snackBar: MatSnackBar,
    private location: Location,
    private mixPanelService: MixpanelService
  ) {
    this.cartItems.subscribe((products) => (products = products));
  }

  // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable((observer) => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

  // Add to cart
  public addToCart(product: Product, quantity: number) {
    let message, status;
    var item: CartItem | boolean = false;
    // If Products exist
    let hasItem = products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) {
          products[index]["quantity"] = qty;
          message = "The product " + product.name + " has been added to cart.";
          status = "success";
          this.snackBar.open(message, "×", {
            panelClass: [status],
            verticalPosition: "top",
            duration: 3000,
          });
          this.mixPanelService.track("add-to-cart", {
            product: product.name,
            quantity: quantity,
            hasAlreadyThisOneInCart: true
          });
        }
        return true;
      }
    });

    // If Products does not exist (Add New Products)
    if (!hasItem) {
      item = { product: product, quantity: quantity };
      products.push(item);
      message = "The product " + product.name + " has been added to cart.";
      status = "success";
      this.snackBar.open(message, "×", {
        panelClass: [status],
        verticalPosition: "top",
        duration: 3000,
      });
      this.mixPanelService.track("add-to-cart", {
        product: product.name,
        quantity: quantity,
        hasAlreadyThisOneInCart: false
      });
    }

    localStorage.setItem("cartItem", JSON.stringify(products));
    return item;
  }

  // Calculate Product stock Counts
  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let message, status;
    let qty = product.quantity + quantity;
    return true;
  }

  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false;
    const index = products.indexOf(item);
    products.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(products));
  }

  public clearCart() {
    products.forEach((product) => {
      this.removeFromCart(product);
    });
  }

  // Total amount
  public getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(
      map((product: CartItem[]) => {
        return products.reduce((prev, curr: CartItem) => {
          return (
            prev +
            +curr.product.caption.slice(0, 6).replace(",", "") * curr.quantity
          );
        }, 0);
      })
    );
  }

  public getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  // Update Cart Value
  public updateCartQuantity(
    product: Product,
    quantity: number
  ): CartItem | boolean {
    return products.find((items, index) => {
      if (items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) products[index]["quantity"] = qty;
        localStorage.setItem("cartItem", JSON.stringify(products));
        return true;
      }
    });
  }
}
