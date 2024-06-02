import { Component, Input, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserProfile } from '../../interfaces/userProfile.interface';
import { FormsModule } from '@angular/forms';
import { SelectRoomComponent } from './select-room/select-room.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageInputComponent } from './message-input/message-input.component';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, UserCardComponent, FormsModule, SelectRoomComponent, ChatWindowComponent, MessageInputComponent],
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
  public userCount: number = 0;

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

    }
  }

  hanldeMessage(message: string) {
    if (this.connection) {
      const userName = this.userProfile?.name || "Anonymous";
      const messageWithUser = `${userName}: ${message}`;
      this.connection.next(messageWithUser);
    }
  }


  onSignOut() {
    // Clear user profile and session data
    this.userProfile = null;
    sessionStorage.removeItem("loggedInUser");
    this.userService.clearUserProfile();

    // Close WebSocket connection if it exists
    if (this.connection) {
      this.connection.close();
    }

    // Redirect to home page
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  leaveRoom(){
      if (this.connection) {
        // Prepare the disconnection message for the previous room
        const disconnectionMessage = `You have left ${this.roomName}`;
        // Unsubscribe from the previous connection
        this.connection.unsubscribe();
        // Disconnection message
        this.messages.push(disconnectionMessage);
        this.connection = null;
        this.roomName = '';
        this.isInRoom = false;
      }
  }

  joinRoom(roomName: string) {
    if (!roomName) {
      alert('Select a chat room!');
      return;
    }
  
    if (isPlatformBrowser(this.platformId)) {
      const previousRoomName = this.roomName;
      this.roomName = roomName;
  
      // Unsubscribe from the previous connection if there is one
      if (this.connection) {
        // Prepare the disconnection message for the previous room
        const disconnectionMessage = `You have left ${previousRoomName}`;
        // Unsubscribe from the previous connection
        this.connection.unsubscribe();
        // Disconnection message
        this.messages.push(disconnectionMessage);
      }
  
      // Establish a new connection for the selected room
      this.connection = this.WebsocketService.connect(`${this.wsUrl}?room=${this.roomName}`);
  
      // Add the welcome message for the new room
      this.messages.push(`Welcome to ${this.roomName}`);
  
      // Subscribe to the new connection
      this.connection.subscribe((event: MessageEvent) => {
        this.messages.push(event.data);
      });

      // Subscribe to user count updates
      this.WebsocketService.connectUserCount(`${this.wsUrl}?room=${this.roomName}`).subscribe((count: number) => {
        this.userCount = count;
      })
  
      // Update the flag indicating the user is in a room
      this.isInRoom = true;
    }
  }

  isUserCountMessage(message: string): boolean {
    return message.startsWith(`User Count:`)
  }

  getFilteredMessages(): string[] {
    return this.messages.filter(message => !this.isUserCountMessage(message))
  }
  
}

