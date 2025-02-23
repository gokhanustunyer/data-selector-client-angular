import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck(){
    const token = localStorage.getItem("accessToken");
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthetenticated = (token != null) && !expired;
    localStorage.setItem("isAuthenticated", `${_isAuthetenticated}`)
  }

  get isAuthetenticated(): boolean{
    return _isAuthetenticated;
  }

  set isAuthetenticated(isAuth: boolean){
    _isAuthetenticated = isAuth;
  }
}
export let _isAuthetenticated: boolean = localStorage.getItem("isAuthenticated") == "true";