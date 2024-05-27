import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subject!: Subject<MessageEvent>;

  constructor() { }

  public connect(url:string): Subject<MessageEvent> {
    if (!this.subject){
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url:string): Subject<MessageEvent>{
    const ws = new WebSocket(url);  
    
    const observable = new Observable((obs) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN){
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }


}
