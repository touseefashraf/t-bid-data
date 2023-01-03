import { DataService } from './data.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AdminSharedModule } from './../admin-shared/admin-shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomersComponent } from './customers.component'
import { ModalModule } from 'ngx-bootstrap/modal'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    AdminSharedModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: CustomersComponent}
    ])
  ],
  declarations: [CustomersComponent],
  providers: [ DataService] 
})
export class CustomersModule { }
