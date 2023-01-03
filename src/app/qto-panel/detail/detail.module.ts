import { PlanHolderProjectComponent } from './plan-holder-project/plan-holder-project.component';
import { VideoComponent } from './video/video.component';
import { OthersComponent } from './others/others.component';
import { AddendumComponent } from './addendum/addendum.component';
import { QtoComponent } from './qto/qto.component';
import { SpecsComponent } from './specs/specs.component';
import { PlansComponent } from './plans/plans.component';
import { OwnerComponent } from './owner/owner.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { SharedModule } from 'src/app/website/shared/shared.module';
import { QtoSharedModule } from '../qto-shared/qto-shared.module';
import { DetailComponent } from './detail.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ImageCropperModule } from 'ngx-image-cropper'
import { DataService } from './data.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    ImageCropperModule,
    QtoSharedModule,
    SharedModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: DetailComponent }
    ])
  ],
  declarations: [
      DetailComponent,
      GeneralInfoComponent,
      OwnerComponent,
      SpecsComponent,
      PlansComponent,
      QtoComponent,
      AddendumComponent,
      OthersComponent,
      VideoComponent,
      PlanHolderProjectComponent
    ],
  providers: [ DataService ]
})
export class DetailModule { }
