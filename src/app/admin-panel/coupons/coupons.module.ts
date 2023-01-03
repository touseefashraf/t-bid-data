import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/website/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { DataService } from './data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { CouponsComponent } from './coupons.component';

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    FormsModule,
    ModalModule.forChild(),
    BsDatepickerModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path:'',component:CouponsComponent
    }])
  ],
  declarations: [CouponsComponent],
  providers: [DataService]
})
export class CouponsModule { }
