/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-calendar',
  templateUrl: './tasks-calendar.component.html',
  styleUrls: ['./tasks-calendar.component.scss']
})
export class TasksCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
 */
import { Component, ViewChild } from '@angular/core';
import { IgxCalendarComponent, IgxDialogComponent } from 'igniteui-angular';

@Component({
  selector: 'app-calendar',
  styleUrls: ['./tasks-calendar.component.scss'],
  templateUrl: './tasks-calendar.component.html'
})
export class TasksCalendarComponent {
    @ViewChild('calendar') public calendar: IgxCalendarComponent;
    @ViewChild('alert') public dialog: IgxDialogComponent;

    constructor() { }

    public verifyRange(dates: Date[]) {
      if (dates.length > 5) {
        this.calendar.selectDate(dates[0]);
        this.dialog.open();
      }
    }
}
