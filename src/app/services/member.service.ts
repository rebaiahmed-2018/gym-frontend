import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Member } from '../models/member';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  res : any;
  membersChanged = new Subject<Member[]>();
  memberChanged = new Subject<Member>();
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<Member[]>('//localhost:8181/api/member/list').pipe(map(
      (members) => {
        return members;
      }
    )).subscribe(
      (members) => {
        this.membersChanged.next(members);
        this.res = members;
        console.log('helloo from s ' + JSON.stringify( members));

      }
    );
  }
  getMembers() {
    return this.res;
  }
  findMemberByUsername(username: String) {
    return this.http.get<Member>('//localhost:8181/api/member/' + username).pipe(map(
      (member) => {
        return member;
      }
    )).subscribe(
      (member) => {
        this.memberChanged.next(member);
      }
    );
  }
  findMemberUsername(username: String) {
    return this.http.get<Member>('//localhost:8181/api/member/' + username).pipe(map(
      (member) => {
        return member;
      }
    ));
  }
  addMember(member: Member){
    return this.http.post<Member>('//localhost:8181/api/member/add',member).pipe(map(
      (member) => {
          return member;
      }
    )).subscribe(
      (member) => {
        this.memberChanged.next(member);
      }
    );
  }
  updateMember(member: Member) {
    return this.http.put<Member>('//localhost:8181/api/member', member).pipe(map(
      (member) => {
        return member;
      }
    )).subscribe(
      (member) => {
        this.memberChanged.next(member);
      }
    );
  }
  deleteMember(id: number) {
    return this.http.delete<Member>('//localhost:8181/api/member/' + id).pipe(map(
      (member) => {
        return member;
      }
    )).subscribe(
      (member) => {
        this.memberChanged.next(member);
      }
    );
  }

}
