import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { SelectRoomComponent } from './select-room.component';

describe('SelectRoomComponent', () => {
  let component: SelectRoomComponent;
  let fixture: ComponentFixture<SelectRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit roomSelected event when joinRoom is called', () => {
    const roomName = 'testRoom';
    const spyItem = jest.spyOn(component.roomSelected, 'emit');
    component.selectedRoom = roomName;
    component.joinRoom();
    expect(spyItem).toHaveBeenCalled();
  });

  it('should emit leaveRoomEvent when leaveRoom is called', () => {
    const spyItem = jest.spyOn(component.leaveRoomEvent, 'emit');
    component.leaveRoom();
    expect(spyItem).toHaveBeenCalled();
  });


});
