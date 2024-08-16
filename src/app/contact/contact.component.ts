import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  pinIcon:string="assets/icons/navbar/pinIcon.svg";
  email:string="mohamadshawabkeh45@outlook.com";
  facebookIcon:string = "assets/icons/contact/facebook.svg";
  twitterIcon:string = "assets/icons/contact/github.svg";
  instaIcon:string = "assets/icons/contact/insta.svg";
  linkedIcon:string = "assets/icons/contact/linkedIn.svg";

  constructor(private router: Router) { }
  sendEmail() {
    window.location.href = `mailto:${this.email}`;
  }
  navigateToLinkedIn() {
    window.open('https://www.linkedin.com/in/mohammad-fayez-shawabkeh/', '_blank');
  }
  navigateToInsta() {
    window.open('https://www.instagram.com/mohamadfayez98/', '_blank');
  }
  navigateToFacebook() {
    window.open('https://www.facebook.com/mohamad.f.shawabkeh/', '_blank');
  }
  navigateToGithub() {
    window.open('https://github.com/mohamadshawabkeh', '_blank');
  }
}
