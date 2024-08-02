import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
  FormsModule,
  MatIconModule],
  templateUrl: './register.component.html', 
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  eyeOn:string="assets/icons/login/eye-on.svg";
  eyeOff:string="assets/icons/login/eye-off.svg";
  selectedOption: 'customer' | 'vendor' = 'customer'; // Default selection

  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/my-account/login']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  selectOption(option: 'customer' | 'vendor'): void {
    this.selectedOption = option;
  }
}
