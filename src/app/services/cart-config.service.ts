import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() {
    this.loadCartFromStorage();
    this.cartSubject.next(this.getTotalItems());
  }

  // Add item to the cart
  addToCart(product: { id: string, title: string, price: number, image: string }) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.image,
        quantity: 1 
      });
    }
    this.saveCartToStorage();
    this.cartSubject.next(this.getTotalItems());
  }

  // Remove item from the cart
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

  // Get total items in the cart
  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get cart items
  getCartItems(): CartItem[] {
    return this.cart;
  }

  // Save cart to local storage
  private saveCartToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }
  }

  // Load cart from local storage
  private loadCartFromStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem(this.storageKey);
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }
}
