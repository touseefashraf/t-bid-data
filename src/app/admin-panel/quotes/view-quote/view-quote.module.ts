import { SharedModule } from 'src/app/website/shared/shared.module'
import { NgModule } from '@angular/core'
import { ViewQuoteComponent } from './view-quote.component'
import { DataService } from './data.service'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ViewQuoteComponent }
  ])
  ],
  declarations: [ViewQuoteComponent],
  providers: [ DataService ]

})
export class ViewQuoteModule { }
