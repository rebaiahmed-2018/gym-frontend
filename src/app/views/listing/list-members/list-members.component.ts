import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss']
})
export class ListMembersComponent implements OnInit {

  members: any;
  constructor(private memberService: MemberService, private router: Router) { }

  ngOnInit() {
    this.getAllMembers();
  }
  getAllMembers () {
    this.memberService.getAll();
    setTimeout(() => {
      this.members = this.memberService.getMembers();
    }, 500);
  }
  edit(id) {
      localStorage.removeItem('editUserId');
      localStorage.setItem('editUserId', id.toString());
      this.router.navigate(['edit-user']);
  }
  deleteUser(id): void {
    this.memberService.deleteMember(id);
    setTimeout(() => {
      this.getAllMembers();    }, 500);

  }

}
