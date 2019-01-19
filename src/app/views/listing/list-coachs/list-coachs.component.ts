import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coach.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-coachs',
  templateUrl: './list-coachs.component.html',
  styleUrls: ['./list-coachs.component.scss']
})
export class ListCoachsComponent implements OnInit {
  coachs: any;
  constructor( private coachService: CoachService, private router: Router) { }

  ngOnInit() {
    this.getAllCoachs();
  }
  getAllCoachs() {
    this.coachService.getAll();
    setTimeout(() => {
      this.coachs = this.coachService.getCoachs();
      console.log('hellooo3' + JSON.stringify( this.coachs));
    }, 500);
  }
  edit(id) {
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', id.toString());
    this.router.navigate(['edit-user']);
}

deleteUser(id): void {
  this.coachService.deleteCoach(id);
  setTimeout(() => {
    this.getAllCoachs();
     }, 500);

}

}
