import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialService } from 'src/app/services/user/credential/credential.service';

@Component({
  selector: 'app-table-datas',
  imports: [NgFor],
  templateUrl: './table-datas.component.html',
  styleUrl: './table-datas.component.scss'
})
export class TableDatasComponent {
  id!: string;
  tableName!: string;
  tableDatas: any[] = [];
  columns: any[] = [];
  rows: any[] = [];

  constructor(private credentialService: CredentialService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.tableName = params['tableName'];
    });
    this.getTableDatas(this.id, this.tableName);
  }

  async getTableDatas(crendentialId: string, tableName: string) {
    try {
      var datas = await this.credentialService.getTableDatas(crendentialId, tableName);
      this.columns = datas.data.tableDatas.columns;
      this.rows = datas.data.tableDatas.rows;
      var lengthLimit = 40;
      this.rows.forEach((data: any, index: number) => {
        this.rows[index].tableRowDatas.forEach((row_data: any, row_index: number) => {
          var newStr = this.rows[index].tableRowDatas[row_index].data.substring(0, lengthLimit);
          if (this.rows[index].tableRowDatas[row_index].data.length > lengthLimit - 3){
            newStr += "...";
          }
          this.rows[index].tableRowDatas[row_index].data = newStr;
        })
      })
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  }

  async downloadAsExcel(exportType: any){
    this.credentialService.downloadTable(exportType, this.id, this.tableName)
  }
}
