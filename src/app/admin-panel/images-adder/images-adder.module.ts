import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesAdderComponent } from './images-adder.component';
import { DataService } from './data.service';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SharedModule } from 'src/app/website/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import {LazyLoadImageModule} from 'ng-lazyload-image';


@NgModule({
  imports: [
    AdminSharedModule,
    PopoverModule.forRoot(),
    SharedModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ImageCropperModule,
    LazyLoadImageModule,
    CommonModule,
    RouterModule.forChild([
        { path: '', component:ImagesAdderComponent }
    ])
  ],
  declarations: [ImagesAdderComponent],
  providers:[DataService]
})
export class ImagesAdderModule { }
