import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { jest } from '@jest/globals';
import { UserProfile } from '../interfaces/userProfile.interface';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return UserProfile or Null', () => {
    
    const UserProfile = {
      email: "string",
      name: "string",
      picture: "string"
    };

    service.setUserProfile(UserProfile);

    service.userProfile$.subscribe((prof) => {
      expect(prof).toEqual(UserProfile || null);
    });
  });

  it('should clear user profile', () => {
    service.clearUserProfile();

    service.userProfile$.subscribe((prof) => {
      expect(prof).toBeNull()
    });
  });


});