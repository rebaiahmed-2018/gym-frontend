import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Coach } from "../models/coach"
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CoachService {
  coachesChanged = new Subject<Coach[]>();
  coachChanged = new Subject<Coach>();
  res : any;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Coach[]>('//localhost:8181/api/coach/list').pipe(map(
      (coach) => {
        return coach;
      }
    )).subscribe((coach) => {
      this.coachesChanged.next(coach)
      this.res = coach;
    });
  }
  getCoachs () {
    return this.res;
  }
  findCoachByUsername(username: string){
    return this.http.get<Coach>('//localhost:8181/api/coach/' + username).pipe(
      map(
        (coach) => {
          return coach;
        }
      )
    ).subscribe((coach) => {
      this.coachChanged.next(coach);
    });
  }
  addCoach(coach: Coach){
    return this.http.post<Coach>('//localhost:8181/api/coach/add',coach).pipe(map(
      (coach) => {
        return coach;
      }
    )).subscribe(
      (coach) => {
        this.coachChanged.next(coach);
      }
    );
  }
  updateCoach(coach: Coach){
    return this.http.put<Coach>('//localhost:8181/api/coach',coach).pipe(map(
      (coach) => {
        return coach;
      }
    )).subscribe(
      (coach) => {
        this.coachChanged.next(coach);
      }
    );
  }
  deleteCoach(id: String) {
    return this.http.delete<Coach>('//localhost:8181/api/coach/' + id).pipe(map(
      (coach) => {
        return coach;
      }
    )).subscribe(
      (coach) => {
        this.coachChanged.next(coach);
      }
    );
  }

}
