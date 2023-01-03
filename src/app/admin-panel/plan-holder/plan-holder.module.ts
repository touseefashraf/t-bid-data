import { NgModule } from '@angular/core'
import { PlanHolderComponent } from './plan-holder.component'
import { RouterModule } from '@angular/router'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AdminSharedModule } from '../admin-shared/admin-shared.module'
import { DataService } from './data.service'

@NgModule({
  imports: [
    AdminSharedModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: PlanHolderComponent }
  ])
  ],
  declarations: [PlanHolderComponent],
  providers: [ DataService ]

})
export class PlanHolderModule { }
