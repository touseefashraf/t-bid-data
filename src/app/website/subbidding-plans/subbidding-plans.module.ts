import { LoaderComponent } from './loader/loader.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubbiddingPlansComponent } from './subbidding-plans.component';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service'
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ModalModule.forRoot(),
        RouterModule.forChild([
            { path: '', component: SubbiddingPlansComponent }
        ])
    ],
    declarations: [SubbiddingPlansComponent,LoaderComponent],
    providers: [DataService]
})
export class SubbiddingPlansModule { }
