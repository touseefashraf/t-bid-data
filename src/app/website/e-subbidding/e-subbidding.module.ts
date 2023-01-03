import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ESubbiddingComponent } from './e-subbidding.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ESubbiddingComponent }
    ])
  ],
  declarations: [ESubbiddingComponent]
})
export class ESubbiddingModule { }
