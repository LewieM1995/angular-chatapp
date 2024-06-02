import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subjects: {[url: string ]: Subject<MessageEvent>} = {};
  private userCounts: {[url:string]: Subject<number>} = {};

  constructor() { }

  public connect(url:string): Subject<MessageEvent> {
    if (!this.subjects[url]){
      this.subjects[url] = this.create(url);
    }
    return this.subjects[url];
  }

  public connectUserCount(url: string): Subject<number> {
    if (!this.userCounts[url]){
      this.userCounts[url] = new Subject<number>();
    }
    return this.userCounts[url];
  }

  private create(url:string): Subject<MessageEvent>{
    const ws = new WebSocket(url);  
    
    const observable = new Observable((obs) => {
      ws.onmessage = (messageEvent) => {
        obs.next(messageEvent);

        if(messageEvent.data.startsWith('User Count:')){
          const userCount = parseInt(messageEvent.data.split(':')[1].trim());
          this.userCounts[url].next(userCount);
        }
      }
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
