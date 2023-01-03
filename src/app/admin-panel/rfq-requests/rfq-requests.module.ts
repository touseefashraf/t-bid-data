import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { DataService } from './data.service';
import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqRequestsComponent } from './rfq-requests.component';
import { IAlertsModule } from 'src/app/libs/ialert/ialerts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    IAlertsModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
        {
            path:'',
            component:RfqRequestsComponent
        }
    ])
  ],
  declarations: [RfqRequestsComponent],
  providers:[DataService]
})
export class RfqRequestsModule { }
