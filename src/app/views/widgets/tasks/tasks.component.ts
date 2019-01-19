import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from 'src/app/services/training-session.service';
import { TrainingSession } from 'src/app/models/training-session';
import { Exercice } from 'src/app/models/exercice';
import { Subscription } from 'rxjs';
import { tokenGetter } from 'src/app/token-getter';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  trainingSessionsChangedSubscription: Subscription;
  constructor(private trainingSessionService: TrainingSessionService) { }
  sessions: TrainingSession[];
  exercices: Exercice[];
  ngOnInit() {
      this.trainingSessionsChangedSubscription = this.trainingSessionService.trainingSessionsChanged.subscribe(
        (trainingSessions) => {
          this.sessions = trainingSessions;
        }
      );
      this.getTrainingSessions();
      this.exercices = JSON.stringify(this.sessions)['exercices'];
  }
  getTrainingSessions() {
    this.trainingSessionService.getAll();
  }
 
}
