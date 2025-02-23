import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from 'src/app/contracts/ui/token/token';
import { TokenResponse } from 'src/app/contracts/ui/token/tokenResponse';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,
              private toastrService: CustomToastrService,
              private authService: AuthService,
              private router: Router){ }

  async login(usernameOrEmail:string, password: string, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<any | Token> = this.httpClientService.post<any | Token>({
      controller: "auth",
      action: "login"
    },{usernameOrEmail, password})
    console.log(observable, usernameOrEmail, password);
    try{
      const data: any = await firstValueFrom(observable);
      const token: Token = data.data;
      if (token){
          localStorage.setItem("accessToken", token.accessToken);
          localStorage.setItem("refreshToken", token.refreshToken);
          this.toastrService.message("Benutzeranmeldung war erfolgreich",
                                     "Die Anmeldung war erfolgreich",
                                     ToastrMessageType.Success,
                                     ToastrPosition.TopRight)
      }
    }
    catch(err){
      this.toastrService.message
      ("Benutzeranmeldung fehlgeschlagen",
        "Fehler bei der Anmeldung",
        ToastrMessageType.Error,
        ToastrPosition.TopRight)
    }
    if (callBackFunction != null) callBackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<boolean>{
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      controller : "Auth", action: "refreshTokenLogin"
    }, {refreshToken: refreshToken});
    try{
      const tokenResponse: TokenResponse = await firstValueFrom(observable);
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      return true;
    }
    catch{
      this.authService.isAuthetenticated = false;
      return false;
    }
  }

  logout(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("isAuthenticated", "false");
    this.authService.isAuthetenticated = false;
    this.router.navigate(["/login"])

    this.toastrService.message("Der Abmeldevorgang wurde erfolgreich abgeschlossen",
    "Ausstieg erfolgreich",
    ToastrMessageType.Success,
    ToastrPosition.TopRight)
  }
}