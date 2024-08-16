import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service'; 
import { Subscription } from 'rxjs';
import { FoodProductsService } from '../services/food-products.service';
import { Router } from '@angular/router';
import { CartConfigService } from '../services/cart-config.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  downArrowBlack:string="assets/icons/navbar/downArrowBlack.svg";
  allCategory:string="assets/icons/navbar/allCategory.svg";
  mainPhoto:string="assets/icons/home/mainPhoto.svg";
  payOnline:string="assets/icons/home/payOnline.svg";
  thirdBanner:string="assets/icons/home/thirdBanner.svg";
  thirdBanner2:string="assets/icons/home/thirdBanner2.svg";
  thirdBanner3:string="assets/icons/home/thirdBanner3.svg";
  forthBanner:string="assets/icons/home/forthBanner.svg";
  forthBanner2:string="assets/icons/home/forthBanner2.svg";
  forthBanner3:string="assets/icons/home/forthBanner3.svg";
  favIcon:string="assets/icons/navbar/favIcon.svg";
  plusIcon:string="assets/icons/home/plusIcon.svg";
  fifthBanner:string="assets/icons/home/fifthBanner.svg";
  fifthBanner2:string="assets/icons/home/fifthBanner2.svg";
  sixthBanner:string="assets/icons/home/sixthBanner.svg";
  sixthBanner2:string="assets/icons/home/sixthBanner2.svg";
  lastBanner:string="assets/icons/home/lastBanner.svg";
  profileRate:string="assets/icons/home/profileRate.svg";

  products: any[] | undefined;
  fiveProducts:any;
  sixProducts:any;
  fourProducts:any;
  menuItems = [
    { id: 1, allCategory: 'assets/icons/home/fruit.svg', categoryText: 'Fruits & Vegetables', arrowPhoto:"assets/icons/navbar/downArrowBlack.svg" },
    { id: 2, allCategory: 'assets/icons/home/meat.svg', categoryText: 'Meats & Seafood', arrowPhoto:"assets/icons/navbar/downArrowBlack.svg" },
    { id: 3, allCategory: 'assets/icons/home/breakfast.svg', categoryText: 'Breaksfast & Dairy', arrowPhoto:"assets/icons/navbar/downArrowBlack.svg" },
    { id: 4, allCategory: 'assets/icons/home/bread.svg', categoryText: 'Breads & Bakery', arrowPhoto:"assets/icons/navbar/downArrowBlack.svg" },
    { id: 5, allCategory: 'assets/icons/home/bever.svg', categoryText: 'Beverages', arrowPhoto:"assets/icons/navbar/downArrowBlack.svg" },
    { id: 6, allCategory: 'assets/icons/home/frozen.svg', categoryText: 'Frozen Foods',  },
    { id: 7, allCategory: 'assets/icons/home/snack.svg', categoryText: 'Biscuits & Snacks',  },
    { id: 8, allCategory: 'assets/icons/home/stap.svg', categoryText: 'Grocery & Staples',  },
    { id: 9, allCategory: 'assets/icons/home/house.svg', categoryText: 'Household Needs', },
    { id: 10, allCategory: 'assets/icons/home/health.svg', categoryText: 'Healthcare',  },
    { id: 11, allCategory: 'assets/icons/home/baby.svg', categoryText: 'Baby & Pregnancy',  }
];
comSection = [
    { id: 1, imageComSection: 'assets/icons/home/payOnline.svg' },
    { id: 2, imageComSection: 'assets/icons/home/newStock.svg' },
    { id: 3, imageComSection: 'assets/icons/home/qualityA.svg'},
    { id: 4, imageComSection: 'assets/icons/home/delivery.svg' },
];
fakeAccount = [
  { id: 1, profileName: 'Mohammad', rate:5, comment:"Good quality product can only be found in good stores" },
  { id: 2, profileName: 'Omran', rate:4.5, comment:"All kinds of grocery products are available in our store."  },
  { id: 3, profileName: 'Marwan', rate:3.5, comment:"Our work can definitely support the local economy." },
  { id: 4, profileName: 'Abdallah', rate:4, comment:"Save your time – save your money – shop from our grocery store."  },
];
  showMenu: boolean = false;
  randomIncrementNumber:any;
  private menuSubscription: Subscription | undefined;
  @ViewChild('fullStar') fullStarTemplate!: TemplateRef<any>;
  @ViewChild('halfStar') halfStarTemplate!: TemplateRef<any>;
  @ViewChild('blankStar') blankStarTemplate!: TemplateRef<any>;
  discountPercentage: any;

  constructor(private menuService: MenuService, private foodProductsService: FoodProductsService,
    private cdr: ChangeDetectorRef,private router: Router, private cartService: CartConfigService ) {}

  ngOnInit() {
    this.menuSubscription = this.menuService.menuState$.subscribe(state => {
      this.showMenu = state;
    });
    this.foodProductsService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        console.log('All Products:', this.products);
        this.fiveProducts =this.products?.slice(0,5);
        this.sixProducts =this.products?.slice(5,11);
        this.fourProducts =this.products?.slice(11,15);
        this.randomIncrementNumber = Math.floor(Math.random() * (71 - 10) + 10); // Set random discount
        this.cdr.detectChanges();

      },
      (error) => {
        console.error('Error fetching all products:', error);
      }
    );
  }
  ngOnDestroy() {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
  addToCart(product: any) {
    this.cartService.addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image 
    },1);
    console.log("product ->",product)
  }
  getStarRating(rating: number): { fullStars: number, halfStar: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    
    return { fullStars, halfStar };
  }
  calculateDiscountedPrice(originalPrice: number): number {
    const discountPercentage = this.randomIncrementNumber;
    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
    return discountedPrice;
  }
  
  starArray(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i);
  }
  navigateToProductList(product: any, index: number) {
    this.discountPercentage = this.randomIncrementNumber[index];
    this.router.navigate(['/shop/product-details',product.id], { state: { product: product, discountPercentage: this.discountPercentage } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  navigateToShop() {
    this.router.navigate(['/shop']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  isFirst(index: number): boolean {
    return index === 0;
  }

  isLast(index: number): boolean {
    return index === this.fiveProducts.length - 1;
  }
}

