import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserProfile } from '../../interfaces/userProfile.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, UserCardComponent, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [UserService]
})
export class ChatComponent implements OnInit {

  private wsUrl = "ws://localhost:4000/";
  public messages: string[] = [];
  public userProfile: UserProfile | null = null;
  private connection: any;
  public roomName: string = '';
  public isInRoom: boolean = false;

  constructor(
    private WebsocketService: WebsocketService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve user profile from sessionStorage
      const userProfile = sessionStorage.getItem("loggedInUser");
      //console.log(userProfile);
      this.userProfile = userProfile ? JSON.parse(userProfile) : null;

      // Update user profile in UserService
      this.userService.setUserProfile(this.userProfile);

      /* Only establish WebSocket connection if running in the browser
      this.connection = this.WebsocketService.connect(this.wsUrl);

      this.connection.subscribe((event: MessageEvent) => {
        this.messages.push(event.data);
      }); */
    }
  }

  sendMessage(message: string) {
    if (this.connection) {
      const userName = this.userProfile?.name || "Anonymous";
      const messageWithUser = `${userName}: ${message}`;
      this.connection.next(messageWithUser);
      this.clearInputField();
    }
  }

  clearInputField() {
    const inputElement = document.getElementById('messageInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  onSignOut() {
    // Clear user profile and session data
    this.userProfile = null;
    sessionStorage.removeItem("loggedInUser");
    this.userService.clearUserProfile();

    // Close WebSocket connection if it exists
    if (this.connection) {
      this.connection.complete();
    }

    // Redirect to home page
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  joinRoom(){
    if (this.roomName.trim() === "") {
      alert('Select a chat room!');
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.connection = this.WebsocketService.connect(`${this.wsUrl}?room=${this.roomName}`);

      this.connection.subscribe((event: MessageEvent) => {
        this.messages.push(event.data);
      });

      this.isInRoom = true;
      this.messages.push(`Welcome to ${this.roomName}`)
    }

  }
}

