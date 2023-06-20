import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private subject = new Subject<any>();
  constructor() { }

  sendEvent(event: string, data: any = null) {
    this.subject.next({ event, data });
  }

  getEvent() {
    return this.subject.asObservable();
  }
}
