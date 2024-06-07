export class MockWebSocket {
    onmessage!: (event: MessageEvent) => void;
    onerror!: (event: Event) => void;
    onclose!: (event: CloseEvent) => void;
    readyState: number;
    sentMessages: any[] = [];
  
    constructor(public url: string) {
      this.readyState = WebSocket.OPEN;
    }
  
    send(data: string) {
      this.sentMessages.push(data);
    }
  
    close() {
      this.readyState = WebSocket.CLOSED;
      if (this.onclose) this.onclose({} as CloseEvent);
    }
  
    mockMessage(data: string) {
      if (this.onmessage) this.onmessage({ data } as MessageEvent);
    }
  
    mockError() {
      if (this.onerror) this.onerror(new Event('error'));
    }
  }