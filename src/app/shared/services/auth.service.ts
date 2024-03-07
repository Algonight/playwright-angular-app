import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly USERNAME = 'username';
  private readonly PASSWORD = 'password';

  constructor(private router: Router) {}

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === this.USERNAME && password === this.PASSWORD) {
      this.isLoggedIn.next(true);
    }
    return this.isLoggedIn.pipe(delay(1000));
  }

  logout() {
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
