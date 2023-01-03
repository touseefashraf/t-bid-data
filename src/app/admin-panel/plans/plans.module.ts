import { SharedModule } from './../../website/shared/shared.module';
import { NgModule } from '@angular/core'
import { PlansComponent } from './plans.component'
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
    SharedModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: PlansComponent }
  ])
  ],
  declarations: [PlansComponent],
  providers: [ DataService ]

})
export class PlansModule { }
