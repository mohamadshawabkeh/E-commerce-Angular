import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  siteLogo:string="assets/icons/navbar/siteLogo.svg";
  pinIcon:string="assets/icons/navbar/pinIcon.svg";
  searchIcon:string="assets/icons/navbar/searchIcon.svg";
  profileIcon:string="assets/icons/navbar/profileIcon.svg";
  favIcon:string="assets/icons/navbar/favIcon.svg";
  cartIcon:string="assets/icons/navbar/cartIcon.svg";
  downArrowBlack:string="assets/icons/navbar/downArrowBlack.svg";
  downArrowRed:string="assets/icons/navbar/downArrowRed.svg";
  downArrowHighlight:string="assets/icons/navbar/downArrowHighlight.svg";
  allCategory:string="assets/icons/navbar/allCategory.svg";
  currentRoute: string = '';
  days: number = 47;
  hours: number = 6;
  minutes: number = 55;
  seconds: number = 51;
  clickedAllCategory:boolean=false;

  private timerInterval: any;

  constructor(private router: Router,private menuService: MenuService) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
  isHomeRoute(): boolean {
    return this.currentRoute === '/home';
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
    this.clickedAllCategory=!this.clickedAllCategory;
    this.menuService.toggleMenu();
  }

}
