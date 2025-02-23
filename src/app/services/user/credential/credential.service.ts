import { Injectable } from '@angular/core';
import { HttpClientService } from '../../common/http-client.service';
import { CustomToastrService } from '../../common/custom-toastr.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private httpClientService: HttpClientService,
              private toastrService: CustomToastrService) 
  {
  
  }

  createCredential(title: string, username: string, password: string, connectionString: string, databaseType: number, successCallBack?: any, errorCallBack?: any){
    this.httpClientService.post({
      controller: "db",
      action: "createCredential",
      isAuth: true
    }, {title: title, username: username, password: password, connectionString: connectionString, dbType: databaseType}).subscribe(result => { successCallBack(); }, () => { errorCallBack() });
  }
  
  async getCredentialList(){
    const promiseData = this.httpClientService.get<any>({
      controller: "db",
      action: "getCredentialList",
      isAuth: true
    });
    return await lastValueFrom(promiseData).then().catch();
  }

  async getTableDetails(credentialId: string){
    const promiseData = this.httpClientService.get<any>({
      controller: "db",
      action: "getTables",
      isAuth: true,
      queryString: `DbCredentialId=${credentialId}`
    });
    return await lastValueFrom(promiseData).then().catch();
  }

  async getTableDatas(credentialId: string, tableName: string){
    const promiseData = this.httpClientService.get<any>({
      controller: "db",
      action: "getTableDatas",
      isAuth: true,
      queryString: `DbCredentialsId=${credentialId}&TableName=${tableName}`
    });
    return await lastValueFrom(promiseData).then().catch();
  }

  async getTableDatasBySqlQuery(credentialId: string, sqlQuery: string){
    const promiseData = this.httpClientService.post({
      controller: "db",
      action: "GetTableDatasBySQLQuery",
      isAuth: true
    }, { dbCredentialsId: credentialId, sqlQuery: sqlQuery})
    var data: any = await lastValueFrom(promiseData).then().catch();
    return data;
  }

  async downloadTable(exportType: string, credentialId: string, tableName: string, successCallBack?: any, errorCallBack?: any){
    const promiseData = this.httpClientService.post({
      controller: "db",
      action: "downloadTable",
      isAuth: true
    }, {exportType: exportType, dbCredentialsId: credentialId, tableName: tableName})
    var data: any = await lastValueFrom(promiseData).then().catch();
    data = data.data.resultFile;
    const contentType = 'application/xlsx'; 
    const fileName = 'output.xlsx';
    const blob = this.base64ToBlob(data, contentType);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(url); // Belleği temizle
  }

  base64ToBlob(base64: any, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: contentType });
  }
}
