import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../interfaces/userProfile.interface';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  standalone: true,
})
export class UserCardComponent implements OnInit {

public userProfile:  UserProfile | null = null;

constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
    });
  }

}
