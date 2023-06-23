import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
const USER_KEY = 'auth-user';
const SECRET_KEY = 'frontend-duonghuukhanh-prolaydo';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  public saveUser(user: any): void {
    this.cookieService.delete(USER_KEY);
    this.cookieService.set(USER_KEY, JSON.stringify(user), { expires: 7 });
  }
  public getUser(): any {
    if (this.cookieService.get(USER_KEY)) {
      const user = JSON.parse(this.cookieService.get(USER_KEY));
      return user;
    }
    return {};
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check(USER_KEY);
  }

  public signOut(): void {
    this.cookieService.delete(USER_KEY);
  }
}
