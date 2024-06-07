import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { UserCardComponent } from './user-card.component';
import { UserService } from '../../services/user.service';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UserService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sub to userProfile on Init', () => {
    const subscribeSpy = jest.spyOn(userService.userProfile$, 'subscribe')
    component.ngOnInit();
    expect(subscribeSpy).toHaveBeenCalled();
  })


});
