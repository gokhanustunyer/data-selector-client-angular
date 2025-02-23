import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/common/custom-toastr.service';
import { _isAuthetenticated } from 'src/app/services/common/user/auth.service';
import { UserAuthService } from 'src/app/services/common/user/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private toastrService: CustomToastrService,
              private userAuthService: UserAuthService){}

  async canActivate(route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot)
  {
    let expired: boolean;
    var token = localStorage.getItem("accessToken");
    try { expired = this.jwtHelper.isTokenExpired(token); }
    catch { expired = true; }

    if (expired){
      let isRefreshed = await this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken") as string);
      if (isRefreshed){
        token = localStorage.getItem("accessToken");
        try { expired = this.jwtHelper.isTokenExpired(token); }
        catch { expired = true; }
      }
    }

    var isAuthetenticated = (token != null) && !expired;
    if (!isAuthetenticated) {
      localStorage.setItem("isAuthenticated", `${_isAuthetenticated}`)
      this.router.navigate(["/auth/signin"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message ("Für diese Reaktion müssen Sie sich anmelden","Autorisierungsfehler",
                                  ToastrMessageType.Warning,
                                  ToastrPosition.TopRight)
    }
    return !expired;
  }

}