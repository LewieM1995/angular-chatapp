import { TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { WebsocketService } from './websocket.service';
import { MockWebSocket } from './mockSocket';
import { Subject } from 'rxjs';


describe('WebsocketService', () => {
  let service: WebsocketService;
  let mockWebSocket: MockWebSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService]
    });
    service = TestBed.inject(WebsocketService);
    mockWebSocket = new MockWebSocket('ws://localhost:8080');
    jest.spyOn(global,'WebSocket').mockImplementation(() => mockWebSocket as any)
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('comp should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to websocket', () => {
    const item = service.connect('ws://localhost:8080');
    expect(item).toBeDefined();
  });

  it('should return instance of Subject<MessageEvent>', () => {
    const item = service.connect('ws://localhost:8080');
    expect(item).toBeInstanceOf(Subject);
  });

  it('should return message event', () => {
    const message = "test message";
    const mockWebSocket = new MockWebSocket('ws://localhost:8080');
    
    service.connect('ws://localhost:8080');
  
    const subscriber = jest.fn();
  
    // Set up the onmessage callback
    mockWebSocket.onmessage = (event: MessageEvent) => {
      subscriber(event);
    };
  
    // Simulate receiving a message
    mockWebSocket.mockMessage(message);
  
    // Assert that the subscriber was called with the expected message event
    expect(subscriber).toHaveBeenCalledWith({ data: message } as MessageEvent);
  });
  

  it('should update user count when receiving "User Count:" message', async () => {
    const userCountSubject = service.connectUserCount('ws://localhost:8080');
    const mockMessage = 'User Count: 5'; // Simulate a user count message
  
    // Act
    mockWebSocket.mockMessage(mockMessage);
  
    // Assert
    userCountSubject.subscribe((count) => {
      expect(count).toBe(5); // Check if the user count is updated correctly
    });
  });
  
  

});
