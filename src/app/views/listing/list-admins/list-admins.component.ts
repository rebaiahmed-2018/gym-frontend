import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss']
})
export class ListAdminsComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) {  }
  admins: any;
  ngOnInit() {
     this.getAllAdmins();
  }
  getAllAdmins() {
    this.adminService.getAll();
    setTimeout(() => {
      this.admins = this.adminService.getAdmins();
      console.log('hellooo3' + JSON.stringify( this.admins));
    }, 500);
  }
  edit(id) {
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', id.toString());
    this.router.navigate(['edit-user']);
}
deleteUser(id): void {
  this.adminService.deleteAdmin(id);
  setTimeout(() => {
    this.getAllAdmins();
  }, 500);

}

}
