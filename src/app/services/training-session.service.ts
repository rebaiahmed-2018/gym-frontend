import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrainingSession } from '../models/training-session';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  trainingSessionsChanged = new Subject<TrainingSession[]>();
  trainingSessionChanged = new Subject<TrainingSession>();
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<TrainingSession[]>('//localhost:8181/api/training_session/list').pipe(map(
      (trainingSessions) => {
        return trainingSessions;
      }
    )).subscribe(
      (trainingSessions) => {
        this.trainingSessionsChanged.next(trainingSessions);
      }
    );
  }
  findTrainingSessionById(id: String){
    return this.http.get<TrainingSession>('//localhost:8181/api/training_session/' + id).pipe(map(
      (trainingSession) => {
        return trainingSession;
      }
    )).subscribe(
      (trainingSession) => {
        this.trainingSessionChanged.next(trainingSession);
      }
    );
  }
  addTrainingSession(training_session: TrainingSession){
    return this.http.post<TrainingSession>('//localhost:8181/api/training_session/add',
      training_session).pipe(map(
        (trainingSession) => {
          return trainingSession;
        }
      )).subscribe(
        (trainingSession) => {
          this.trainingSessionChanged.next(trainingSession);
        }
      );
  }
  updateTrainingSession(training_session: TrainingSession, id: String){
    return this.http.put<TrainingSession>('//localhost:8181/api/training_session/' + id,
      training_session).pipe(map(
        (trainingSession) => {
          return trainingSession;
        }
      )).subscribe(
        (trainingSession) => {
          this.trainingSessionChanged.next(trainingSession);
        }
      );
  }
  deleteTrainingSession(id: String) {
    return this.http.delete('//localhost:8181/api/training_session/' + id)
  }
  getMembersTrainingSessionByUsername(username: string){
    return this.http.get<TrainingSession[]>('//localhost:8181/api/training_session/member/' + username).pipe(map(
      (trainingSessions) => {
        return trainingSessions;
      }
    )).subscribe(
      (trainingSessions) => {
        this.trainingSessionsChanged.next(trainingSessions);
      }
    );
  }
  getMembersTrainingSessionByIdAndDate(id: String, date: Date): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>('//localhost:8181/api/training_session/' + id)
  }
}
