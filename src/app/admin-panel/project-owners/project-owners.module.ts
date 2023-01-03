import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AdminSharedModule } from './../admin-shared/admin-shared.module'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectOwnersComponent } from './project-owners.component'
import { DataService } from './data.service'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
        {path:'', component:ProjectOwnersComponent}
    ])
  ],
  declarations: [ProjectOwnersComponent],
  providers: [ DataService ]
})
export class ProjectOwnersModule { }
