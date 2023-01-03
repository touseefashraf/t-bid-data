import { AdminSharedModule } from './../admin-shared/admin-shared.module'
import { ModalModule } from 'ngx-bootstrap/modal'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CsiDivisionsComponent } from './csi-divisions.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DataService } from './data.service'

@NgModule({
  imports: [
    AdminSharedModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: CsiDivisionsComponent }
  ])
  ],
  declarations: [CsiDivisionsComponent],
  providers: [ DataService ]

})
export class CsiDivisionsModule { }
