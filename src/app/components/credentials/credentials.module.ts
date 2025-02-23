import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCredentialsComponent } from './create-credentials/create-credentials.component';
import { RouterModule } from '@angular/router';
import { ListCredentialsComponent } from './list-credentials/list-credentials.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "create", component: CreateCredentialsComponent},
      {path: "list", component: ListCredentialsComponent}
    ]),
  ]
})
export class CredentialsModule { }
