import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select-room.component.html',
  styleUrl: './select-room.component.css'
})
export class SelectRoomComponent {

  @Output() roomSelected = new EventEmitter<string>();
  selectedRoom: string = '';

  joinRoom() {
    if (this.selectedRoom) {
      this.roomSelected.emit(this.selectedRoom);
    } else {
      alert('Select a chat room!');
    }
  }
}
