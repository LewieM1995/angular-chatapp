import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserProfile } from '../../interfaces/userProfile.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [UserService]
})
export class ChatComponent implements OnInit {

  private wsUrl = "ws://localhost:4000/";
  public messages: string[] = [];
  public userProfile: UserProfile | null = null;
  private connection: any;

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

      // Only establish WebSocket connection if running in the browser
      this.connection = this.WebsocketService.connect(this.wsUrl);

      this.connection.subscribe((event: MessageEvent) => {
        this.messages.push(event.data);
      });
    }
  }

  sendMessage(message: string) {
    if (this.connection) {
      const userName = this.userProfile?.name || "Anonymous"; // Assuming the user's name is stored in the userProfile object
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
      this.connection.complete(); // Assuming complete() properly closes the connection
    }

    // Redirect to home page
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}

