import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { CartConfigService } from '../services/cart-config.service';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, CountdownComponent], // Import CountdownComponent
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  siteLogo: string = "assets/icons/navbar/siteLogo.svg";
  pinIcon: string = "assets/icons/navbar/pinIcon.svg";
  searchIcon: string = "assets/icons/navbar/searchIcon.svg";
  profileIcon: string = "assets/icons/navbar/profileIcon.svg";
  favIcon: string = "assets/icons/navbar/favIcon.svg";
  cartIcon: string = "assets/icons/navbar/cartIcon.svg";
  downArrowBlack: string = "assets/icons/navbar/downArrowBlack.svg";
  downArrowRed: string = "assets/icons/navbar/downArrowRed.svg";
  downArrowHighlight: string = "assets/icons/navbar/downArrowHighlight.svg";
  allCategory: string = "assets/icons/navbar/allCategory.svg";
  redCirc: string = "assets/icons/navbar/redCirc.svg";
  currentRoute: string = '';
  clickedAllCategory: boolean = false;
  cartNumber: number = 0;

  // Countdown configuration
  config: CountdownConfig = {
    leftTime: this.calculateTimeToTarget(),
    format: 'dd:HH:mm:ss',
    prettyText: (text: string) => {
      const [days, hours, minutes, seconds] = text.split(':');
      return `${days} days ${hours} hours ${minutes} min ${seconds} sec`;
    },
  };

  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private cartService: CartConfigService
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(totalItems => {
      this.cartNumber = totalItems;
    });
    this.config.leftTime = this.calculateTimeToTarget(); 

  }
  calculateTimeToTarget(): number {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 120); 
    return Math.floor((endDate.getTime() - new Date().getTime()) / 1000); 
  }
  handleEvent(event: CountdownEvent) {
    if (event.action === 'done') {
      console.log('Countdown finished!');
      // Handle the end of the countdown here
    }
  }
  startCountdown() {
    this.countdown.begin();
  }

  stopCountdown() {
    this.countdown.stop();
  }

  pauseCountdown() {
    this.countdown.pause();
  }

  resumeCountdown() {
    this.countdown.resume();
  }

  isHomeRoute(): boolean {
    return this.currentRoute === '/home';
  }
  ischeckoutRoute(): boolean {
    return this.currentRoute === '/checkout';
  }

  isShopRoute(): boolean {
    return this.currentRoute === '/shop';
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToShop() {
    this.router.navigate(['/shop']);
  }

  navigateToSign() {
    this.router.navigate(['/my-account/login']);
  }

  isContactRoute(): boolean {
    return this.currentRoute === '/contact';
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

  onAllCategoryClick() {
    this.clickedAllCategory = !this.clickedAllCategory;
    this.menuService.toggleMenu();
  }
}
