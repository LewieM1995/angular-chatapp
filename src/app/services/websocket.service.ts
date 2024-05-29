import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subjects: {[url: string ]: Subject<MessageEvent>} = {};

  constructor() { }

  public connect(url:string): Subject<MessageEvent> {
    if (!this.subjects[url]){
      this.subjects[url] = this.create(url);
    }
    return this.subjects[url];
  }

  private create(url:string): Subject<MessageEvent>{
    const ws = new WebSocket(url);  
    
    const observable = new Observable((obs) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = () => {
        obs.complete.bind(obs)();
        delete this.subjects[url]; // Remove the subject when the connection closes
      };
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
