import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  callIcon:string = "assets/icons/footer/callIcon.svg";
  emailIcon:string = "assets/icons/footer/emailIcon.svg";
  googlePlay:string = "assets/icons/footer/googlePlay.svg";
  appStore:string = "assets/icons/footer/appStore.svg";
  facebookIcon:string = "assets/icons/footer/facebookIcon.svg";
  twitterIcon:string = "assets/icons/footer/twitterIcon.svg";
  instaIcon:string = "assets/icons/footer/instaIcon.svg";
  linkedIcon:string = "assets/icons/footer/linkedIcon.svg";
  visaIcon:string = "assets/icons/footer/visaIcon.svg";
  visa2Icon:string = "assets/icons/footer/visa2Icon.svg";
  visa3Icon:string = "assets/icons/footer/visa3Icon.svg";
  visa4Icon:string = "assets/icons/footer/visa4Icon.svg";
  visa5Icon:string = "assets/icons/footer/visa5Icon.svg";
  email:string = "Mohamadshawabkeh45@outlook.com";
  
  sections = [
    {
      title: 'Make Money with Us',
      items: [
        'Sell on Grogin',
        'Sell Your Services on Grogin',
        'Sell on Grogin Business',
        'Sell Your Apps on Grogin',
        'Become an Affiliate',
        'Advertise Your Products',
        'Sell-Publish with Us',
        'Become an Blowwe Vendor'
      ]
    },
    {
      title: 'Let Us Help You',
      items: [
        'Accessibility Statement',
        'Your Orders',
        'Returns & Replacements',
        'Shipping Rates & Policies',
        'Refund and Returns Policy',
        'Privacy Policy',
        'Terms and Conditions',
        'Cookie Settings',
        'Help Center',
      ]
    },
    {
      title: 'Get to Know Us',
      items: [
        'Careers for Grogin',
        'About Grogin',
        'Inverstor Relations',
        'Grogin Devices',
        'Customer reviews',
        'Social Responsibility',
      ]
    }
  ];
}
