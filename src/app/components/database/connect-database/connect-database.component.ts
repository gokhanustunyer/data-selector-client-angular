import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from 'src/app/services/user/credential/credential.service';

@Component({
  selector: 'app-connect-database',
  imports: [NgFor],
  templateUrl: './connect-database.component.html',
  styleUrl: './connect-database.component.scss'
})
export class ConnectDatabaseComponent {
  credentials: any[] = [];

  constructor(private credentialService: CredentialService,
              private router: Router
  ) {}

  async ngOnInit() {
    await this.getCredentials();
  }

  

  async getCredentials() {
    try {
      const response = await this.credentialService.getCredentialList();
      this.credentials = response.data.dbCredentials || [];
      this.credentials.forEach((data: any, index: number) => {
        var dbTypeStr: string = "";
        switch (this.credentials[index].dbType){
          case 0:
            dbTypeStr = "MsSQL";
            break;
          case 1:
            dbTypeStr = "MySQL";
            break;
          case 2:
            dbTypeStr = "PostgreSql";
            break;
        }
        this.credentials[index].dbType = dbTypeStr;
      })
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  }


  routeDatabaseDetails(id: string){
    this.router.navigate(["/database/tableDetails"], { queryParams: { id: id } });
  }
}
