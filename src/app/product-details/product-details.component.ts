import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2,ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodProductsService } from '../services/food-products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit  {
  addCartIcon:string="assets/icons/product/addCartIcon.svg";
  paymentIcon:string="assets/icons/product/paymentIcon.svg";
  warrantyIcon:string="assets/icons/product/warrantyIcon.svg";
  favIcon:string="assets/icons/product/favIcon.svg";
  shareIcon:string="assets/icons/product/shareIcon.svg";
  replayIcon:string="assets/icons/product/replayIcon.svg";
  chart:string="assets/icons/shop/chart.svg";

  product: any;
  starsContain:any;
  discountPercentage: any;
  discountedPrice: any;
  quantity: number = 1;
  minQuantity: number = 1;
  relatedProducts: any[] =[];
  randomIncrementNumber: number[] = [];
  sixProducts:any;
  loading: boolean = true;

  constructor(private router: Router, private foodProductsService: FoodProductsService,private route: ActivatedRoute,private renderer: Renderer2,) { }
  @ViewChild('chartStock') chartStock!: ElementRef;

  // ngOnInit(): void {
  //   console.log("this.router ->",this.router)
  //   console.log("history.state.product ->",history.state.product)

  //   this.product = history.state.product;
  //   console.log("this.product->",this.product)
    
  //   this.discountPercentage = history.state.discountPercentage;
  //   this.discountedPrice = this.calculateDiscountedPrice(this.product.price, this.discountPercentage);
  //   this.starsContain=this.product.rating.rate;
  //   // console.log(" this.starsContain ->", this.starsContain)
  //   console.log("  this.discountPercentage ->",  this.discountPercentage)
    // this.foodProductsService.getAllProducts().subscribe(
    //   (response: any[] | undefined) => {
    //     if (response) {
    //       this.relatedProducts = response;
    //       this.sixProducts =this.relatedProducts?.slice(10,16);

    //       console.log('All Products:', this.relatedProducts);
    //       console.log('this.sixProducts:', this.sixProducts);
  
    //       // Generate random discounts for each product
    //       this.relatedProducts.forEach(() => {
    //         const randomDiscount = Math.floor(Math.random() * (71 - 10) + 10);
    //         this.randomIncrementNumber.push(randomDiscount);
    //       });
    //     } else {
    //       console.error('Response is undefined or null.');
    //     }
    //   },
    //   (error: any) => {
    //     console.error('Error fetching all products:', error);
    //   }
    // );
  // } 
  ngOnInit(): void {
    this.product = history.state.product;
    this.starsContain=this.product.rating.rate;
    console.log(" this.starsContain ->", this.starsContain)
    setTimeout(() => {
      this.loading = false; // Set loading to false to hide loading spinner
    }, 1000);
    this.foodProductsService.getAllProducts().subscribe(
      (response: any[] | undefined) => {
        if (response) {
          this.relatedProducts = response;
          // this.sixProducts =this.relatedProducts?.slice(10,16);

          // console.log('All Products:', this.relatedProducts);
          // console.log('this.sixProducts:', this.sixProducts);
  
          // Generate random discounts for each product
          this.relatedProducts.forEach(() => {
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
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');

      if (productId) {
    
        this.loading = true; 

        this.foodProductsService.getProductById(productId).subscribe(
          (product: any) => {
            if (product) {
              this.product = product;
              this.starsContain=this.product.rating.rate;

              this.discountPercentage = history.state.discountPercentage;
              this.discountedPrice = this.calculateDiscountedPrice(this.product.price, this.discountPercentage);

              // Fetch related products based on productId
              this.fetchRelatedProducts(productId);

              this.loading = false;

            } else {
              console.error(`Product with ID ${productId} not found.`);
              // Handle case where product is not found
            }
          },
          (error: any) => {
            console.error('Error fetching product:', error);
            // Handle error fetching product
          }
        );
      } else {
        console.error('No productId found in route parameters.');
        // Handle case where productId is not found in route parameters
      }
    });
  }

  fetchRelatedProducts(productId: string) {
    // Fetch related products based on the productId
    this.foodProductsService.getRelatedProducts(productId).subscribe(
      (response: any[] | undefined) => {
        if (response) {
          this.relatedProducts = response;
          const startIndex = Math.floor(Math.random() * (this.relatedProducts.length - 6));
          this.sixProducts = this.relatedProducts.slice(startIndex, startIndex + 6);

          // Generate random discounts for each product
          this.sixProducts.forEach(() => {
            const randomDiscount = Math.floor(Math.random() * (71 - 10) + 10);
            this.randomIncrementNumber.push(randomDiscount);
          });

        } else {
          console.error('Response is undefined or null.');
          // Handle case where response is undefined or null
        }
      },
      (error: any) => {
        console.error('Error fetching related products:', error);
        // Handle error fetching related products
      }
    );
  }

  calculateRelated(originalPrice: number, index: number): number {
    const discountPercentage = this.randomIncrementNumber[index]; 
    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
    return discountedPrice;
  }
  calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    return originalPrice - (originalPrice * (discountPercentage / 100));
  }
  getStarRating(rating: number): { fullStars: number, halfStar: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    
    return { fullStars, halfStar };
  }
  navigateToProductList(product: any, index: number) {
    this.discountPercentage = this.randomIncrementNumber[index];
    this.router.navigate(['/shop/product-details', product.id], { state: { product: product, discountPercentage: this.discountPercentage } });

    // Add class to trigger CSS styles
    this.renderer.addClass(this.chartStock.nativeElement, 'scrollToTop');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Optional: Remove class after a delay (for animation effects)
    setTimeout(() => {
      this.renderer.removeClass(this.chartStock.nativeElement, 'scrollToTop');
    }, 1000); // Adjust delay as needed
  }
 starArray(count: number): number[] {
  if (count <= 0 || isNaN(count)) {
    return [];
  }
  return Array(count).fill(0).map((x, i) => i);
}
  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
