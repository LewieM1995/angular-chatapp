import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../interfaces/userProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  setUserProfile(profile: UserProfile | null): void {
    this.userProfileSubject.next(profile);
  }

  clearUserProfile(): void {
    this.userProfileSubject.next(null);
  }
}
