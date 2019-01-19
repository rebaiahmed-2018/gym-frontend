import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from 'src/app/services/training-session.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})


export class WidgetsComponent implements OnInit {


  constructor(private service: TrainingSessionService) {
  }

  ngOnInit() {
  }

}
