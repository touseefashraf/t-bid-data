import { AdminSharedModule } from '../admin-shared/admin-shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SubscriptionApprovedComponent } from './subscription-approved.component'
import { RouterModule } from '@angular/router'
import { DataService } from './data.service'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild([
        { path: '', component: SubscriptionApprovedComponent }
      ])
  ],
  declarations: [SubscriptionApprovedComponent],
  providers: [ DataService ]
})
export class SubscriptionApprovedModule { }
