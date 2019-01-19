import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Exercice } from '../models/exercice';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExercicesService {

  exercicesChanged = new Subject<Exercice[]>();
  exerciceChanged = new Subject<Exercice>();
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<Exercice[]>('//localhost:8181/api/exercices/list').pipe(map(
      (exercices) => {
        return exercices;
      }
    )).subscribe(
      (exercices) => {
        this.exercicesChanged.next(exercices);
      }
    );
  }
  findExerciceById(id: String){
    return this.http.get<Exercice>('//localhost:8181/api/exercices/' + id).pipe(map(
      (exercice) => {
        return exercice;
      }
    )).subscribe(
      (exercice) => {
        this.exerciceChanged.next(exercice);
      }
    );
  }
  addExercice(exercices: Exercice){
    return this.http.post<Exercice>('//localhost:8181/api/exercices/add',exercices).pipe(map(
      (exercice) => {
        return exercice;
      }
    )).subscribe(
      (exercice) => {
        this.exerciceChanged.next(exercice);
      }
    );
  }
  updateExercice(exercices: Exercice, id: String) {
    return this.http.put<Exercice>('//localhost:8181/api/exercices/' + id,
      exercices).pipe(map(
        (exercice) => {
          return exercice;
        }
      )).subscribe(
        (exercice) => {
          this.exerciceChanged.next(exercice);
        }
      );
  }
  deleteExercice(id: String){
    return this.http.delete<Exercice>('//localhost:8181/api/exercices/' + id).pipe(map(
      (exercice) => {
        return exercice;
      }
    )).subscribe(
      (exercice) => {
        this.exerciceChanged.next(exercice);
      }
    );
  }
}
