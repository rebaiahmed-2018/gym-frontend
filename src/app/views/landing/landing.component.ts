import { Component, OnInit } from '@angular/core';
import { CoachService } from 'src/app/services/coach.service';
import { Coach } from 'src/app/models/coach';
import { RolesEnum } from 'src/app/utils/roles-enum.enum';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  memberChangedSubscription: Subscription;
  member : Member;
  constructor(private memberService: MemberService) { }

  ngOnInit() { 
    this.memberChangedSubscription = this.memberService.memberChanged.subscribe(
      (member) => {
        this.member = member;
      }
    );
  }

}
