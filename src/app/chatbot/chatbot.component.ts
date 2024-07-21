import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent {
  chatbotLogo: string = "assets/icons/chatbot/chatbotLogo.png";
  user: string = "assets/icons/chatbot/user.png";
  loading: string = "assets/icons/chatbot/loading.svg";
  sendMessageIcon: string = "assets/icons/chatbot/sendMessage.png";

  @ViewChild('chatBodyRef') private chatBodyRef!: ElementRef;
  @ViewChildren('messageRef') messageRefs!: QueryList<ElementRef>;

  isOpen = false;
  userInput = '';
  messages: { sender: string, text: string }[] = [];
  predefinedMessages = [
    'What are your store hours?',
    'Do you have any discounts?',
    'How can I return an item?',
    'What payment methods do you accept?',
    'Do you offer international shipping?',
    'Are your products authentic?',
    'Can I cancel my order?',
    'Is there a warranty on your products?',
    'How do I contact customer support?',
    'Do you have a size guide for clothing?',
  ];

  responses = [
    // Responses related to business operations
    "Our store hours are from 9 AM to 6 PM, Monday to Friday.",
    "Yes, we frequently offer discounts on various products. You can check our website for current offers.",
    "To initiate a return, please visit our Returns & Refunds page on our website for detailed instructions.",
    "We accept Visa, MasterCard, American Express, PayPal, and direct bank transfers.",
    "Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary.",
    "Absolutely! We guarantee that all our products are authentic and sourced directly from authorized distributors.",
    "You can cancel your order within 24 hours of placing it. Please contact our customer support team for assistance.",
    "Yes, most of our products come with a manufacturer's warranty. Please check the product details for warranty information.",
    "You can reach our customer support team via email at support@example.com or by phone at +123456789.",
    "Yes, we provide a size guide on each product page for clothing items. It includes measurements and fit recommendations.",
    // General conversational responses
    "Hi there! How can I assist you today?",
    "I'm here to help! What can I do for you?",
    "Hello! How can I make your day better?",
    "Hey! I'm your friendly chatbot. What's on your mind?",
    "Greetings! What brings you here today?",
    "Hey! How's your day going so far?",
    "Hello! Need any assistance from me?",
    "Hi! What can I do to assist you today?",
    "Greetings! How may I be of service to you?",
    "Hey there! What can I help you with right now?",
    "I'm just a humble chatbot, but I'm here to assist you!",
    "As a chatbot, I don't have feelings, but I'm always here to help!",
    "I'm not human, but I strive to provide the best assistance I can.",
    "I'm here 24/7 to assist you with any questions or concerns!",
    "I may not be human, but I'm here to provide top-notch customer service!",
    "While I'm not human, I'm dedicated to providing excellent support!",
    "I'm sorry to hear that. Is there anything specific I can help you with?",
    "It's alright to feel that way. Let's see how I can assist you.",
  ];

  introMessage = "Hi, I'm your assistant chatbot here to help you. Please select a question from below for assistance.";
  introMessageSent = false;
  showLoading = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && !this.introMessageSent) {
      this.messages.push({ sender: 'bot', text: this.introMessage });
      this.introMessageSent = true;
      this.scrollToLastUserMessage();
    }
  }

  closeChat(event: Event) {
    event.stopPropagation();
    this.isOpen = false;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', text: this.userInput });
      this.scrollToLastUserMessage();
      this.respondToMessage(this.userInput);
      this.userInput = '';
    }
  }

  sendPredefinedMessage(message: string) {
    this.messages.push({ sender: 'user', text: message });
    this.scrollToLastUserMessage();
    const index = this.predefinedMessages.indexOf(message);
    if (index !== -1) {
      this.respondToMessage(this.responses[index]);
    } else {
      this.respondToMessage("I'm sorry, I don't understand that question.");
    }
  }

  respondToMessage(message: string) {
    this.showLoading = true;
    setTimeout(() => {
      let response: string | null;
      
      // Check for predefined responses
      response = this.checkForKeyword(message);

      // If no predefined response, use default
      if (!response) {
        response = "I'm sorry, I don't understand that question.";
      }

      // Simulate typing effect
      const characters = response.split('');
      let responseInProgress = '';
      const typingDelay = 15;
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < characters.length) {
          responseInProgress += characters[index];
          if (this.messages.length > 0 && this.messages[this.messages.length - 1].sender === 'bot') {
            this.messages[this.messages.length - 1].text = responseInProgress;
          } else {
            this.messages.push({ sender: 'bot', text: responseInProgress });
          }
          this.scrollToLastUserMessage();
          this.showLoading = false;
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingDelay);
    }, 2000); // Simulating 2 seconds delay before displaying response
  }

  checkForKeyword(message: string): string | null {
    message = message.toLowerCase();
    
    const regexMap = [
      { regex: /\b(store hours)\b/, responseIndex: 0 },
      { regex: /\b(discounts?)\b/, responseIndex: 1 },
      { regex: /\b(return|item)\b/, responseIndex: 2 },
      { regex: /\b(payment|method?s?|accept)\b/, responseIndex: 3 },
      { regex: /\b(international|shipping)\b/, responseIndex: 4 },
      { regex: /\b(authentic|products?)\b/, responseIndex: 5 },
      { regex: /\b(cancel|order)\b/, responseIndex: 6 },
      { regex: /\b(warranty|products?)\b/, responseIndex: 7 },
      { regex: /\b(contact|support)\b/, responseIndex: 8 },
      { regex: /\b(size|guide|clothing)\b/, responseIndex: 9 },
      { regex: /\b(hi|hello)\b/, responseIndex: 10 },
      { regex: /\b(how are you)\b/, responseIndex: 11 },
      { regex: /\b(name)\b/, responseIndex: 12 },
      { regex: /\b(joke)\b/, responseIndex: 13 },
      { regex: /\b(meaning of life)\b/, responseIndex: 14 },
      { regex: /\b(located)\b/, responseIndex: 15 },
      { regex: /\b(help)\b/, responseIndex: 16 },
      { regex: /\b(thank you)\b/, responseIndex: 17 },
      { regex: /\b(love)\b/, responseIndex: 18 },
      { regex: /\b(hate)\b/, responseIndex: 19 },
      { regex: /\b(available|stock)\b/, responseIndex: 0 },
      { regex: /\b(promotion|promo)\b/, responseIndex: 1 },
      { regex: /\b(refund|exchange)\b/, responseIndex: 2 },
      { regex: /\b(pay|paying)\b/, responseIndex: 3 },
      { regex: /\b(global|worldwide|overseas)\b/, responseIndex: 4 },
      { regex: /\b(genuine|legit|real)\b/, responseIndex: 5 },
      { regex: /\b(refund|revoke|rescind)\b/, responseIndex: 6 },
      { regex: /\b(guarantee|guaranteed)\b/, responseIndex: 7 },
      { regex: /\b(contact|reach)\b/, responseIndex: 8 },
      { regex: /\b(measurements|fitting)\b/, responseIndex: 9 },
      { regex: /\b(greetings|hey)\b/, responseIndex: 10 },
      { regex: /\b(feeling|emotions)\b/, responseIndex: 11 },
      { regex: /\b(identity|called)\b/, responseIndex: 12 },
      { regex: /\b(laugh|funny)\b/, responseIndex: 13 },
      { regex: /\b(purpose|existence)\b/, responseIndex: 14 },
      { regex: /\b(situated|found)\b/, responseIndex: 15 },
      { regex: /\b(support|assistance)\b/, responseIndex: 16 },
      { regex: /\b(appreciate|grateful)\b/, responseIndex: 17 },
      { regex: /\b(feeling|emotion|passion)\b/, responseIndex: 18 },
      { regex: /\b(dislike|detest|loathe)\b/, responseIndex: 19 },
    ];
    
    for (const { regex, responseIndex } of regexMap) {
      if (regex.test(message)) {
        return this.responses[responseIndex];
      }
    }
    
    return null;
  }
  
  
  scrollToLastUserMessage() {
    setTimeout(() => {
      let lastIndex = -1;
      for (let i = this.messages.length - 1; i >= 0; i--) {
        if (this.messages[i].sender === 'user') {
          lastIndex = i;
          break;
        }
      }
  
      if (lastIndex !== -1) {
        const lastUserMessage = this.messageRefs.toArray()[lastIndex].nativeElement;
        lastUserMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
