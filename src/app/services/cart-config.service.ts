import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartConfigService {
  private cart: CartItem[] = [];
  private storageKey = 'cartItems';
  private cartSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartSubject.asObservable();
  constructor(private snackBar: MatSnackBar) { 
    this.loadCartFromStorage();
    this.cartSubject.next(this.getTotalItems());
  }

  addToCart(product: { id: string, title: string, price: number, image: string }, quantity: number) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity; 
    } else {
      this.cart.push({ 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.image,
        quantity: quantity 
      });
    }
    this.saveCartToStorage();
    this.cartSubject.next(this.getTotalItems());
    if (quantity == 1 ){
      this.snackBar.open(`one of ${product.title} added to cart!`, 'Close', {
        duration: 3000, 
      });

    }else {
      this.snackBar.open(`${quantity} of ${product.title} added to cart!`, 'Close', {
        duration: 3000, 
      });
    }

  }
  
  removeFromCart(productId: string, quantity: number = 1) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      this.cart[itemIndex].quantity -= quantity;
      if (this.cart[itemIndex].quantity <= 0) {
        this.cart.splice(itemIndex, 1);
      }
    }
    this.saveCartToStorage();
    this.cartSubject.next(this.getTotalItems());
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
  getCartItems(): CartItem[] {
    return this.cart;
  }
  private saveCartToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }
  }
  private loadCartFromStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem(this.storageKey);
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }
}
