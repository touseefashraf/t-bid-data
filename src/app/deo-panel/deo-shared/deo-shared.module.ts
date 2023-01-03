import { SkeletonTabelLoaderComponent } from './skeleton-tabel-loader/skeleton-tabel-loader.component'
import { IAlertsModule } from './../../libs/ialert/ialerts.module'
import { NoDataComponent } from './no-data/no-data.component'
import { LoaderComponent } from './loader/loader.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { DeoSidebarComponent } from './deo-sidebar/deo-sidebar.component'


@NgModule({
    imports: [
        IAlertsModule,
        BsDropdownModule.forRoot(),
        CommonModule, FormsModule, RouterModule, NgScrollbarModule,

    ],
    declarations: [
        DeoSidebarComponent,
        LoaderComponent,
        NoDataComponent,
        SkeletonTabelLoaderComponent
    ],
    providers: [
        {
           provide: NG_SCROLLBAR_OPTIONS,
           useValue: {
                track: 'all',
                appearance: 'compact',
                visibility: 'always',
                autoUpdate: true
           }
        }
    ],
    exports: [
        DeoSidebarComponent, LoaderComponent, NoDataComponent,
        IAlertsModule, BsDropdownModule,
        CommonModule, FormsModule, RouterModule, NgScrollbarModule,SkeletonTabelLoaderComponent
    ]
})
export class DeoSharedModule { }
