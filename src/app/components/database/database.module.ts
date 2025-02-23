import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConnectDatabaseComponent } from './connect-database/connect-database.component';
import { TableDetailsComponent } from './table-details/table-details.component';
import { TableDatasComponent } from './table-datas/table-datas.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "connect", component: ConnectDatabaseComponent},
      {path: "tableDetails", component: TableDetailsComponent},
      {path: "tableDatas", component: TableDatasComponent},
    ]),
  ]
})
export class DatabaseModule { }
