import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { ChatWindowComponent } from './chat-window.component';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct input types', () => {
    const messages: string[] = ['message 1', 'message 2'];
    const userCount: number = 5;

    component.messages = messages;
    component.userCount = userCount;

    expect(component.messages).toEqual(messages);
    expect(component.messages).toEqual(messages);
  });
  
});
