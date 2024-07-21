import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
  MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  eyeOn:string="assets/icons/login/eye-on.svg";
  eyeOff:string="assets/icons/login/eye-off.svg";

  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router) { }

  navigateToRegister() {
    this.router.navigate(['/my-account/register']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
