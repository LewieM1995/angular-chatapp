import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { MessageInputComponent } from './message-input.component';

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit Message event when emitMessage is called', () => {
    const message = "Hello There";
    const spyItem = jest.spyOn(component.messageSent, 'emit');
    component.emitMessage(message);
    expect(spyItem).toHaveBeenCalled();
  });

  it('should clear input field', () => {
    component.messageInput.nativeElement.value = 'Test Message';
    component.clearInputField();
    expect(component.messageInput.nativeElement.value).toEqual('');
  });

});
