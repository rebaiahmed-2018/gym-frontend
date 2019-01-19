import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../models/login-user';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable({
	providedIn: 'root'
})

export class LoginService {

	private http: HttpClient;
	constructor(handler: HttpBackend) {
		this.http = new HttpClient(handler);
	}
	login(username: string, password: string): Observable<any> {
		let user = new LoginUser(username, password);
		return this.http.post("http://localhost:8181/token/generate-token", user, httpOptions).pipe(
			map(
				(response: any) => {
					if (response.status === 200) {

						console.log("Successful authentication from Angular to Spring!");
						console.log("The Authorisation header value is: " + response.result.token);
						console.log("The User role: " + response.result.role);
						localStorage.setItem('currentUser', JSON.stringify({ user: username, token: response.result.token, role: response.result.role }));
						return true;
					} else {
						console.log("Failed authentication attempt");
						return false;
					}
				}
			));
	}

	logout(): Observable<any> {

		// Remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		return of(true);
	}


}
