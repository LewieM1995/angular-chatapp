import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {

  @Output() messageSent = new EventEmitter<string>();
  @Input() isInRoom: boolean = false;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  emitMessage(message: string) {
    if (message.trim()) {
      this.messageSent.emit(message);
      this.clearInputField();
    }
  }

  clearInputField() {
    if (this.messageInput) {
      this.messageInput.nativeElement.value = '';
    }
  }

}
