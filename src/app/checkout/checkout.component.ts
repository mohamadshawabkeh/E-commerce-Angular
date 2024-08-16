import { Component, OnInit } from '@angular/core';
import { CartConfigService } from '../services/cart-config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  coupon: string = 'assets/icons/checkout/coupon.svg';
  offer: string = 'assets/icons/checkout/offer.svg';
  cartItems: any[] = [];
  subtotal: number = 0;
  total: number = 0;
  currentSlide = 0;
  shippingCost = 0;

  constructor(private cartService: CartConfigService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
    this.calculateSubtotal();
    console.log("this.cartItems ->",this.cartItems)
    console.log("this.total()->", this.total)
    console.log(" this.subtotal",  this.subtotal)
  }
  removeItem(item: any) {
    this.cartService.removeFromCart(item.id, 1); 
    this.cartItems = this.cartService.getCartItems(); 
    this.calculateTotal();
    this.calculateSubtotal();

  }
  calculateSubtotal() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  updateShippingCost(cost: number) {
    this.shippingCost = cost;
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = this.subtotal + this.shippingCost;
  }
  onShippingOptionChange(event: any) {
    const selectedValue = event.target.value;
    this.updateShippingCost(selectedValue === 'Option A' ? 15 : 0);
  }
}
