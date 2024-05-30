import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {

  @Output() messageSent = new EventEmitter<string>();

  sendMessage(message: string) {
    if (message.trim()) {
      this.messageSent.emit(message);
    }
  }

}
