import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

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

  emitMessage(message: string) {
    if (message.trim()) {
      this.messageSent.emit(message);
      this.clearInputField();
    }
  }

  clearInputField() {
    const inputElement = document.getElementById('messageInput') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

}
