import { DataService } from './data.service'
import { IAlertService } from './../../libs/ialert/ialerts.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
    data: any
    modalRef: BsModalRef
    exploreLoading = false
    buyLoading = false
    subscriptionLoading = false
    getQuoteLoading = false
    companyImagesData = []
    lastImageId = 0
    totalImageDataLength = 0
    intervalValue: any
    constructor(
        public api: ApiService,
        public alert: IAlertService,
        private ms: BsModalService,
        public ds: DataService
    ) {
        this.api.activeTab = ''
        this.api.getIndexPageCounters().subscribe((resp: any) => {
            if (resp.success === true) {
                this.data = resp.data
            } else {
                this.alert.error(resp.errors.general)
            }
        })
        this.ds.visitCounter().subscribe((resp: any) => {
            if (resp.success === true) {
                console.log('visit count call sent ')

            }
        })
        this.ds.getCompanyImages().subscribe((resp: any) => {
            if (resp.success == true) {
                this.companyImagesData = resp.data
                if (this.companyImagesData.length > 0) {
                    this.lastImageId = this.companyImagesData[this.companyImagesData.length - 1].id
                    this.totalImageDataLength = this.companyImagesData.length
                    let imageIndex = 1
                    let position = 150
                    let scrolledValue = -1
                    this.intervalValue = setInterval(() => {
                        const totalScrolledContent = document.getElementById('images-container').scrollLeft
                        if (totalScrolledContent == scrolledValue) {
                            position = 150
                            document.getElementById('images-container').scrollTo(0, 0)

                            return false
                        } else {
                            scrolledValue = totalScrolledContent
                        }

                        document.getElementById('images-container').scrollTo(position, 0)
                        position = position + 150
                        imageIndex = (imageIndex + 1) == this.companyImagesData.length ? 0 : imageIndex + 1
                        const clintTotalWidth = document.getElementById('images-container').clientWidth
                        const contentTotalWidth = document.getElementById('images-container').scrollWidth
                    }, 3000)
                }
            }
        })

    }
    ngOnInit() {
    }
    ngOnDestroy(): void {
        clearInterval(this.intervalValue)
    }
    openModal(modal, index) {
        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-lg modal-dialog-centered website',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    cancel() {
        this.modalRef.hide()
    }

}
