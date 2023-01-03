import { SubbiddingPlansComponent } from './../../admin-panel/subbidding-plans/subbidding-plans.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubbiddingPaymentProcessComponent } from './subbidding-payment-process.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
        path:'',component:SubbiddingPaymentProcessComponent
      }])
  ],
  declarations: [SubbiddingPaymentProcessComponent]
})
export class SubbiddingPaymentProcessModule { }
