import { SharedModule } from 'src/app/website/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubbiddingPlansComponent } from './subbidding-plans.component';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule ,
      AdminSharedModule,
      SharedModule,
      FormsModule ,
      ModalModule.forRoot(),
      RouterModule.forChild([
          { path: '', component: SubbiddingPlansComponent }
      ])
    ],
    declarations: [SubbiddingPlansComponent],
    providers:[DataService]
  })
export class SubbiddingPlansModule { }
