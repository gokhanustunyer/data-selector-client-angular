import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CredentialService } from 'src/app/services/user/credential/credential.service';

@Component({
  selector: 'app-list-credentials',
  templateUrl: './list-credentials.component.html',
  styleUrls: ['./list-credentials.component.scss'],
  imports: [NgFor]
})
export class ListCredentialsComponent implements OnInit {
  credentials: any[] = [];

  constructor(private credentialService: CredentialService) {}

  async ngOnInit() {
    await this.getCredentials();
  }

  async getCredentials() {
    try {
      const response = await this.credentialService.getCredentialList();
      this.credentials = response.data.dbCredentials || [];
      var lengthLimit = 35;
      this.credentials.forEach((data: any, index: number) => {
        var newStr = data.connectionString.substring(0, lengthLimit)
        if (data.connectionString.length > lengthLimit - 3){
          newStr += "...";
        }
        this.credentials[index].connectionString = newStr;
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
        var date = new Date(this.credentials[index].dateCreated);
        this.credentials[index].dateCreated = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        ;
      })
      console.log("Credentials:", this.credentials);
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  }
}
