import { SharedModule } from 'src/app/website/shared/shared.module';
import { QtoSharedModule } from './../qto-shared/qto-shared.module';
import { ListProjectComponent } from './list-project.component'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { ModalModule } from 'ngx-bootstrap/modal'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ImageCropperModule } from 'ngx-image-cropper'
import { ReactiveFormsModule } from '@angular/forms'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { DataService } from './data.service'

@NgModule({
  imports: [
    ImageCropperModule,
    QtoSharedModule,
    SharedModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    LazyLoadImageModule,
    RouterModule.forChild([
        { path: '', component: ListProjectComponent }
    ])
  ],
  declarations: [ListProjectComponent],
  providers: [ DataService ]
})
export class ListProjectModule { }
