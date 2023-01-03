import { IRangeSliderModule } from './../../libs/irange-slider/irange-slider.module';
import { ModalModule } from 'ngx-bootstrap/modal'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from './../shared/shared.module'
import { NgModule } from '@angular/core'
import { IndexComponent } from './index.component'
import { RouterModule } from '@angular/router'
import { AutocompleteLibModule } from 'angular-ng-autocomplete'
import { DataService } from './data.service'

@NgModule({
    imports: [
        AutocompleteLibModule,
        IRangeSliderModule,
        ModalModule.forRoot(),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: IndexComponent }
        ])
    ],
    declarations: [IndexComponent],
    providers: [DataService]
})
export class IndexModule { }