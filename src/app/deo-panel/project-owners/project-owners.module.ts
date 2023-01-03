import { DeoSharedModule } from './../deo-shared/deo-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectOwnersComponent } from './project-owners.component'
import { DataService } from './data.service'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
  imports: [
    CommonModule,
    DeoSharedModule,
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
