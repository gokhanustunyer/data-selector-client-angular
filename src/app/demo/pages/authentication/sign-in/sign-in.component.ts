// angular import
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/common/custom-toastr.service';
import { AuthService } from 'src/app/services/common/user/auth.service';
import { UserAuthService } from 'src/app/services/common/user/user-auth.service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent {

  constructor(private userAuthService: UserAuthService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: CustomToastrService,
              private pagetitle: Title
            ) 
  {
    
  }
  
  async login(email:string, password: string){
    if (this.haveCookiePermission()){
      await this.userAuthService.login(email, password, () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl) 
          { 
            this.router.navigate([returnUrl])
          }
          else 
          {
            this.router.navigate([""]) 
          }
        });
      });
    }
    else{
      this.toastrService.message
      ("Bu eylemi gerçekleştirmek için Çerezlere izin vermelisiniz.", "Çerez İzni",
      ToastrMessageType.Error, ToastrPosition.BottomRight)
    }
  }

  haveCookiePermission(){
    return localStorage.getItem('cookieConsent') == 'true';
  }
}
