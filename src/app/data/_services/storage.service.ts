import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  public saveUser(user: any): void {
    this.cookieService.delete(USER_KEY);
    this.cookieService.set(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = this.cookieService.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check(USER_KEY);
  }

  signOut(): void {
    this.cookieService.deleteAll();
  }
}
