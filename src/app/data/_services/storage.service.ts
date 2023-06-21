import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

const USER_KEY = 'auth-user';
const SECRET_KEY = 'fronend-duonghuukhanh-prolaydo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  public saveUser(user: any): void {
    const encryptedUser = this.encryptData(JSON.stringify(user));
    this.cookieService.delete(USER_KEY);
    this.cookieService.set(USER_KEY, encryptedUser);
  }

  public getUser(): any {
    const encryptedUser = this.cookieService.get(USER_KEY);
    if (encryptedUser) {
      const decryptedUser = this.decryptData(encryptedUser);
      const user = JSON.parse(decryptedUser);
      return user;
    }
    return {};
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check(USER_KEY);
  }

  signOut(): void {
    this.cookieService.deleteAll();
  }

  private encryptData(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    return encryptedData;
  }

  private decryptData(encryptedData: string): string {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}
