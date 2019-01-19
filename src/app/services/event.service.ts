import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Event } from "../models/event";
import { Member } from '../models/member';
import { Coach } from '../models/coach';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsChanged = new Subject<Event[]>();
  eventChanged = new Subject<Event>();
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Event[]>('//localhost:8181/api/event/list').pipe(map(
      (events) => {
        return events;
      }
    )).subscribe((events) => {
      this.eventsChanged.next(events)
    });
  }
  findEventById(id: String) {
    return this.http.get<Event>('//localhost:8181/api/event/' + id).pipe(map(
      (event) => {
        return event;
      }
    )).subscribe((event) => {
      this.eventChanged.next(event)
    });
  }
  addEvent(event: Event) {
    return this.http.post<Event>('//localhost:8181/api/event/add',
      event).pipe(map(
        (event) => {
          return event;
        }
      )).subscribe((event) => {
        this.eventChanged.next(event)
      });
  }
  updateEvent(event: Event, id: String) {
    return this.http.put<Event>('//localhost:8181/api/event/' + id,
      event).pipe(map(
        (event) => {
          return event;
        }
      )).subscribe((event) => {
        this.eventChanged.next(event)
      });
  }
  deleteEvent(id: String){
    return this.http.delete<Event>('//localhost:8181/api/event/' + id).pipe(map(
      (event) => {
        return event;
      }
    )).subscribe((event) => {
      this.eventChanged.next(event)
    });
  }
  addMemberToEvent(member: Member, id: String){
    return this.http.put<Event>('//localhost:8181/api/event/' + id + "/addMember",
      member).pipe(map(
        (event) => {
          return event;
        }
      )).subscribe((event) => {
        this.eventChanged.next(event)
      });
  }
  addCoachToEvent(coach: Coach, id: String){
    return this.http.put<Event>('//localhost:8181/api/event/' + id + "/addCoach",
      coach).pipe(map(
        (event) => {
          return event;
        }
      )).subscribe((event) => {
        this.eventChanged.next(event)
      });
  }
  // getEventMembers(id: String){
  //   return this.http.get<Member[]>('//localhost:8181/api/event/' + id + "/members");
  // }
  // getEventCoaches(id: String): Observable<Coach[]> {
  //   return this.http.get<Coach[]>('//localhost:8181/api/event/' + id + "/coaches");
  // }
}
