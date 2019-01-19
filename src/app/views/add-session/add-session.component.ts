import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { TrainingSessionService } from 'src/app/services/training-session.service';
import { ExercicesService } from 'src/app/services/exercices.service';
import { CoachService } from 'src/app/services/coach.service';
import { Coach } from 'src/app/models/coach';
import { Member } from 'src/app/models/member';
import { Exercice } from 'src/app/models/exercice';
import { TrainingSession } from 'src/app/models/training-session';
import { Subscription } from 'rxjs';
import { tokenGetter } from 'src/app/token-getter';
@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {

  coachChangedSubscription: Subscription;
  memberChangedSubscription: Subscription;
  exerciceChangedSubscription: Subscription;
  coach: any;
  member: any;
  ts_exercices = [];
  constructor(public memberService: MemberService,
    public trainingSesssionService: TrainingSessionService,
    public exerciceService: ExercicesService,
    public coachService: CoachService) { }
  sessionData = new FormGroup({
    member: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
    exercice: new FormControl(''),
  });
  htmlStr = 'The Tortoise';
  exercices = [];
  ngOnInit() {
    this.coachChangedSubscription = this.coachService.coachChanged.subscribe(
      (coach) => {
        this.coach = coach;
      }
    );
    this.memberChangedSubscription = this.memberService.memberChanged.subscribe(
      (member) => {
        this.member = member;
      }
    );
    this.exerciceChangedSubscription = this.exerciceService.exerciceChanged.subscribe(
      (exercice) => {
        this.ts_exercices.push(exercice);
      }
    );
  }

  add() {
    event.preventDefault();
    if (this.sessionData.value.exercice !== '') {
      this.exercices.push(this.sessionData.value.exercice);
    }

  }

  dropExercice(ex) {
    this.exercices.splice(this.exercices.indexOf(ex));
  }
  fake() {
    alert('finally...');
  }
  onSubmit() {
    // this.preSubmit();
    this.preSubmit();
    this.addTrainingSession(this.coach, this.member, this.exercices, this.sessionData.value.date);
    alert("Session added successfully");
  }
  preSubmit(){
    this.getCoach(tokenGetter()['user']);
    this.getMember(this.sessionData.value.member);
    this.getExercices();
    this.getMember(this.sessionData.value.member);
  }
  getCoach(username: string) {
    this.coachService.findCoachByUsername(username);
  }
  getMember(username: string) {
    this.memberService.findMemberByUsername(username);
  }
  getExercices(){
    this.exercices.forEach(element => {
      this.exerciceService.addExercice(new Exercice(element, element));
    });
    // this.exerciceService.getAll();
  }
  addTrainingSession(coach: Coach, member: Member, exercices: Exercice[], date: Date){
    this.trainingSesssionService.addTrainingSession(new TrainingSession(exercices, member, coach, date));
  }
}
