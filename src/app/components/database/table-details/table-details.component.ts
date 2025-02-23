import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialService } from 'src/app/services/user/credential/credential.service';

@Component({
  selector: 'app-table-details',
  imports: [NgFor],
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.scss'
})
export class TableDetailsComponent {
  id!: string;
  tables: any[] = [];


  constructor(private credentialService: CredentialService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getTableDetails(this.id);
  }

  async getTableDetails(crendentialId: string) {
    try {
      var data = await this.credentialService.getTableDetails(crendentialId);
      this.tables = data.data.tables;
      var lengthLimit = 30;
      this.tables.forEach((data: any, index: number) => {
        this.tables[index].columns = data.columns.join(',');
        var newStr = this.tables[index].columns.substring(0, lengthLimit)
        if (data.columns.length > lengthLimit - 3){
          newStr += "...";
        }
        this.tables[index].columns = newStr;
      })
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  }

  routeToTableData(title: string){
    this.router.navigate(["/database/tableDatas"], { queryParams: { id: this.id, tableName: title } });
  }

  async searchBySqlQuery(sqlQuery: string){
    const data = await this.credentialService.getTableDatasBySqlQuery(this.id, sqlQuery);
    console.log(data);
  }
}
