import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Exercice } from 'src/app/models/exercice';
import { ExercicesService } from 'src/app/services/exercices.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit {

  exerciceChangedSubscription: Subscription;
  exercice: Exercice;
  constructor(private exerciceService: ExercicesService) { }
  exerciceData = new FormGroup({
    name: new FormControl(''),
    description : new FormControl(''),
  });

  onSubmit() {
    this.addExercice(this.exerciceData.value.name, this.exerciceData.value.description);
    alert("Exercice added successfully");
  }
  addExercice(name: string, description: string) {
   this.exerciceService.addExercice(new Exercice(name, description)); 
  }
  ngOnInit() {
    this.exerciceChangedSubscription = this.exerciceService.exerciceChanged.subscribe(
      (exercice) => {
        this.exercice = exercice;
      }
    )
  }

}
