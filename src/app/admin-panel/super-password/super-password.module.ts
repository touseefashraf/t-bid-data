import { DataService } from './data.service'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SuperPasswordComponent } from './super-password.component'
import { RouterModule } from '@angular/router'


@NgModule({
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: SuperPasswordComponent }
  ])
  ],
  providers: [ DataService ],
  declarations: [SuperPasswordComponent]
})
export class SuperPasswordModule { }
