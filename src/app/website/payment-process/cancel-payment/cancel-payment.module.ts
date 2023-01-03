import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CancelPaymentComponent } from './cancel-payment.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
        path:'',component:CancelPaymentComponent
      }])
  ],
  declarations: [CancelPaymentComponent]
})
export class CancelPaymentModule { }
