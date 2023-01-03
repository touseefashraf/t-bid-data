import { AdminSharedModule } from './../../admin-shared/admin-shared.module'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { DataService } from './data.service'
import { QuoteRequestsComponent } from './quote-requests.component'

@NgModule({
  imports: [
    AdminSharedModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: QuoteRequestsComponent }
  ])
  ],
  declarations: [QuoteRequestsComponent],
  providers: [ DataService ]

})
export class QuoteRequestsModule { }
