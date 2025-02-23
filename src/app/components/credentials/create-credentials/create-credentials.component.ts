import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/common/custom-toastr.service';
import { CredentialService } from 'src/app/services/user/credential/credential.service';

@Component({
  selector: 'app-create-credentials',
  imports: [],
  templateUrl: './create-credentials.component.html',
  styleUrl: './create-credentials.component.scss'
})
export class CreateCredentialsComponent {

  constructor(private credentialService: CredentialService,
              private activatedRoute: ActivatedRoute,
              private toastrService: CustomToastrService) {
    
  }

  submitCreate(title: any, username: any, password: any, connectionString: any, databaseType: any){
    switch(databaseType){
      case "MsSQL":
        databaseType = 0;
        break;
      case "MySQL":
        databaseType = 1;
        break;
      case "PostgreSql":
        databaseType = 2;
        break;
    }

    this.credentialService.createCredential(title, username, password, connectionString, databaseType, () => {
      this.toastrService.message("Credential başarıyla oluşturuldu", "İşlem Başarılı", ToastrMessageType.Success, ToastrPosition.TopRight);
    }, () => {
      this.toastrService.message("Credential oluşturulma işlemi sırasında bir hata meydana geldi", "İşlem Başarısız", ToastrMessageType.Error, ToastrPosition.TopRight);
    });
  }
}
