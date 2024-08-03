import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './myAccount/login/login.component';
import { RegisterComponent } from './myAccount/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'my-account/login', component: LoginComponent },
    { path: 'my-account/register', component: RegisterComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'shop/product-details/:productId', component: ProductDetailsComponent },
    { path: 'contact', component: ContactComponent },
];
