import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


 
  user: Member;
  editForm: FormGroup;
  userId: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private memberService: MemberService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('editUserId');
    console.log('user id ' + this.userId);
    if(!this.userId) {
      alert('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      email: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.memberService.findMemberUsername(this.userId)
      .subscribe( data => {
        this.user = data;
        const mid = {
          email : data.email,
          nom : data.nom,
          prenom : data.prenom,
          password: '',
        }
        this.editForm.setValue(mid);
      });
  }

  onSubmit() {
    console.log(this.user);
     this.user.nom = this.editForm.value.nom;
     this.user.prenom = this.editForm.value.prenom;
     this.user.email = this.editForm.value.email;
     this.user.password = this.editForm.value.password;
    console.log(this.user);
    this.memberService.updateMember(this.user);
  }

}
