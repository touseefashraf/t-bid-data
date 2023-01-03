import { apis } from './../../../environments/environment';
import { AddPlanDocComponent } from './add-plan-doc/add-plan-doc.component';
import { DataService } from './data.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddSpecDocComponent } from './add-spec-doc/add-spec-doc.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRequestComponent } from './quote-request.component';
import { AgmCoreModule } from '@agm/core';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    FormsModule,
    SharedModule,
    RecaptchaModule,
    RouterModule.forChild([{path:'',component:QuoteRequestComponent}]),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: apis.googleApiKey,
      libraries: ['places']
  }),
    LazyLoadImageModule,
    RouterModule.forChild([{path:'',component: QuoteRequestComponent}])
  ],
  declarations: [QuoteRequestComponent, AddSpecDocComponent, AddPlanDocComponent],
  providers:[DataService]
})
export class QuoteRequestModule { }
