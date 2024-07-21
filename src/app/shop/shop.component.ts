import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { FoodProductsService } from '../services/food-products.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  brand?: string;
  color?: string; 
}

interface Checkbox {
  id: number;
  label: string;
  checked: boolean;
  containPlus: boolean;
}
interface ColorOption {
  name: string;
  value: string;
  checked: boolean; // Add checked property
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatSliderModule,CommonModule,FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class ShopComponent {
  plusIcon:string="assets/icons/shop/plusIcon.svg";
  shopBanner:string="assets/icons/shop/shopBanner.svg";
  column:string="assets/icons/shop/column.svg";
  arrange:string="assets/icons/shop/arrange.svg";
  chart:string="assets/icons/shop/chart.svg";
  menuSubscription: any;
  cdr: any;
  randomIncrementNumber: number[] = [];
  isArrangeLayout: boolean = true;
  isColumnLayout: boolean = false;
  minPriceVal:number=0;
  maxPriceVal:number=1000;
  discountPercentage:any;
  checkboxes: Checkbox[] = [
    { id: 1, label: "men's clothing", checked: false, containPlus: true },
    { id: 2, label: "women's clothing", checked: false, containPlus: false },
    { id: 3, label: 'jewelery', checked: false, containPlus: false },
    { id: 4, label: 'electronics', checked: false, containPlus: true },
  ];
  checkBrands = [
    { id: 1, label: 'Brand 1', checked: false, containPlus:false },
    { id: 2, label: 'Brand 2', checked: false, containPlus:false },
  ];
  checkStatus = [
    { id: 1, label: 'In Stock', checked: false, containPlus:false },
    { id: 2, label: 'On Sale', checked: false, containPlus:false },
  ];
  colorOptions: ColorOption[] = [
    { name: 'Navy Blue', value: '#000080', checked: false },
    { name: 'White', value: '#ffffff', checked: false },
    { name: 'Beige', value: '#f5f5dc', checked: false },
    { name: 'Blue', value: '#0000ff', checked: false },
    { name: 'Gold & Silver', value: 'gold', checked: false },
    { name: 'Gold', value: 'goldenrod', checked: false },
    { name: 'Black', value: '#000000', checked: false },
    { name: 'Red', value: '#ff0000', checked: false },
    { name: 'Purple', value: '#800080', checked: false },
  ];
  choosenCategories: string[] = [];
  choosenColors: string[] = [];
  products: Product[] = [];
  originalProducts: Product[] = [];
  constructor(private foodProductsService: FoodProductsService, private router: Router){}

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.foodProductsService.getAllProducts().subscribe(
      (response: any[] | undefined) => {
        if (response) {
          this.products = response.map((productData: any, index: number) => {
            const product: Product = {
              id: productData.id,
              title: productData.title,
              category: productData.category,
              description: productData.description,
              image: productData.image,
              price: productData.price,
              rating: productData.rating,
              brand: this.getBrandForProduct(productData.id), // Use custom logic for brand
              color: this.getColorForProduct(productData.id), // Use custom logic for color
            };
            return product;
          });
          console.log("this.products =>",this.products)
          this.originalProducts = [...this.products];
          // Generate random discounts for each product
          this.products.forEach(() => {
            const randomDiscount = Math.floor(Math.random() * (71 - 10) + 10);
            this.randomIncrementNumber.push(randomDiscount);
          });
        } else {
          console.error('Response is undefined or null.');
        }
      },
      (error: any) => {
        console.error('Error fetching all products:', error);
      }
    );
  }
  getBrandForProduct(productId: number): string {
    switch (productId) {
      case 1:
        return 'Nike';
      case 2:
        return 'Adidas';
      case 3:
        return 'Puma';
      // Add more cases as needed
      default:
        return 'Unknown Brand';
    }
  }
  
  getColorForProduct(productId: number): string {
    switch (productId) {
      case 1:
        return 'navy blue';
      case 2:
        return 'white';
      case 3:
        return 'beige';
      case 4:
        return 'blue';
      case 5:
        return 'Gold & Silver';
      case 6:
        return 'Gold';
      case 7:
        return 'Gold';
      case 8:
        return 'Gold';
      case 15:
        return 'blue';
      case 16:
        return 'black';
      case 17:
        return 'blue';
      case 18:
        return 'white';
      case 19:
        return 'red';
      case 20:
        return 'purple';

      default:
        return 'Unknown Color';
    }
  }
  onColorClick(color: ColorOption) {
    // Toggle the checked state of the color
    color.checked = !color.checked;
    this.filterProducts();
  }
  onCheckboxChange(event: any, checkbox: any) {
    checkbox.checked = event.target.checked;
    this.filterProducts();
  }
  filterProducts(): void {
    let filteredProducts = this.originalProducts.slice();
  
    const checkedCategories = this.checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label.toLowerCase());
  
    const checkedColors = this.colorOptions
      .filter((color) => color.checked)
      .map((color) => color.name.toLowerCase());
  
    // Price filter
    filteredProducts = filteredProducts.filter((product) => {
      const matchesCategory = checkedCategories.length === 0 || checkedCategories.some((category) =>
        product.category.toLowerCase().includes(category)
      );
      const matchesColor = checkedColors.length === 0 || checkedColors.includes(product.color?.toLowerCase() || '');
      const matchesPriceRange = product.price >= this.minPriceVal && product.price <= this.maxPriceVal;
  
      return matchesCategory && matchesColor && matchesPriceRange;
    });
  
    this.products = filteredProducts;
    this.choosenCategories = checkedCategories;
    this.choosenColors = checkedColors;
  }
  
  calculateDiscountedPrice(originalPrice: number, index: number): number {
    const discountPercentage = this.randomIncrementNumber[index]; 
    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
    return discountedPrice;
  }
  
  starArray(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i);
  }
  getStarRating(rating: number): { fullStars: number, halfStar: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    
    return { fullStars, halfStar };
  }
  toggleArrangeLayout() {
    this.isArrangeLayout = !this.isArrangeLayout;
    this.isColumnLayout = false; // Ensure only one layout is active at a time
    console.log('Arrange Layout:', this.isArrangeLayout);
  }

  toggleColumnLayout() {
    this.isColumnLayout = !this.isColumnLayout;
    this.isArrangeLayout = false; // Ensure only one layout is active at a time
    console.log('Column Layout:', this.isColumnLayout);
  }
  updatePriceRangeMin(event: any) {
    console.log("event->",event)
    console.log("event.value mn->",event.target.ariaValueText)
    const sliderValue = event.target.ariaValueText;
     this.minPriceVal = sliderValue;

  }
  updatePriceRangeMax(event: any) {
    console.log("event->",event)
    console.log("event.value mx->",event.target.ariaValueText)
    const sliderValue = event.target.ariaValueText;

   this.maxPriceVal = sliderValue;
  }
  clearFilterRange(){
    this.minPriceVal =0;
    this.maxPriceVal =1000;
  }
  navigateToProductList(product: any, index: number) {
    this.discountPercentage = this.randomIncrementNumber[index];
    this.router.navigate(['/shop/product-details',product.id], { state: { product: product, discountPercentage: this.discountPercentage } });
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  isActiveColor(color: ColorOption): boolean {
    return color.checked;
  }
  clearCategoryFilter(category: string) {
    const checkbox = this.checkboxes.find(c => c.label === category);
    if (checkbox) {
      checkbox.checked = false;
      this.filterProducts();
    }
  }

  clearColorFilter(color: string) {
    const colorOption = this.colorOptions.find(c => c.name.toLowerCase() == color.toLowerCase());
    if (colorOption) {
      colorOption.checked = false;
      this.filterProducts();
    }
  }
  clearFilter() {
    this.choosenCategories = [];
    this.choosenColors =[];
    this.loadProducts();
  }
}
