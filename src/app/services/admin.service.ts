import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Admin } from '../models/admin';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  res: any;
  adminsChanged = new Subject<Admin[]>();
  adminChanged = new Subject<Admin>();
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Admin[]>('//localhost:8181/api/admin/list').pipe(map(
      (admin) => {
        return admin;
      }
    )).subscribe((admin) => {
      this.adminsChanged.next(admin);
      
      this.res = admin;

    });
  }
  getAdmins () {
    return this.res;
  }
  findAdminByUsername(username: string){
    return this.http.get<Admin>('//localhost:8181/api/admin/' + username).pipe(
      map(
        (admin) => {
          return admin;
        }
      )
    ).subscribe((admin) => {
      this.adminChanged.next(admin);
    });
  }
  addAdmin(admin: Admin){
    return this.http.post<Admin>('//localhost:8181/api/admin/add',admin).pipe(map(
      (admin) => {
        return admin;
      }
    )).subscribe(
      (admin) => {
        this.adminChanged.next(admin);
      }
    );
  }
  updateAdmin(admin: Admin){
    return this.http.put<Admin>('//localhost:8181/api/admin',admin).pipe(map(
      (admin) => {
        return admin;
      }
    )).subscribe(
      (admin) => {
        this.adminChanged.next(admin);
      }
    );
  }
  deleteAdmin(id: String) {
    return this.http.delete<Admin>('//localhost:8181/api/admin/' + id).pipe(map(
      (admin) => {
        return admin;
      }
    )).subscribe(
      (admin) => {
        this.adminChanged.next(admin);
      }
    );
  }

}
