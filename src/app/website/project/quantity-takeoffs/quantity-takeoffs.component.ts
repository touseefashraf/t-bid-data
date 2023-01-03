import { ApiService } from 'src/app/services/api.service'
import { DataService } from '../data.service'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
    selector: 'app-quantity-takeoffs',
    templateUrl: './quantity-takeoffs.component.html',
    styleUrls: ['./quantity-takeoffs.component.css']
})
export class QuantityTakeoffsComponent implements OnInit {
    @ViewChild('errorModal', { static: false }) errorModal: ElementRef<any>
    m = moment
    dateFormat = this.cs.DATE_TIME_FORMAT.CHAR_DATE
    checkSubRange = true
    susbcriptionError = ''
    modalRef: BsModalRef
    subscriptionStatus = false
    errorsFetching = true
    constructor(
        public ds: DataService,
        public cs: ConstantsService,
        public api: ApiService,
        private ms: BsModalService,
    ) {
    }

    ngOnInit() {
        if (this.api.user.user_type == 'customer') {
            this.checkErrors(this.ds.pId, 'qto')
        } else {
            this.errorsFetching = false
        }
    }
    preError(pId, fileType, id) {
        this.checkErrors(pId, fileType, id)
    }
    checkErrors(pId, fileType, id?) {
        this.ds.checkDownloadErrors(pId, fileType).subscribe(resp => {

            if (resp.success == false) {
                this.checkSubRange = false
                this.subscriptionStatus = false
                this.susbcriptionError = resp.errors.general
                if (id) {
                    this.openModal(this.errorModal)
                }
            } else {
                if (resp.data == null) {
                    // this.subscriptionStatus = false
                    this.checkSubRange = false
                } else {
                    // this.subscriptionStatus = true
                    this.checkSubRange = true
                }
                if (id) {
                    // this.getDoc(id, fileType, pId)
                }
            }
            this.errorsFetching = false
        })
    }
    openModal(errorModal: ElementRef<any>) {
        this.modalRef = this.ms.show(
            errorModal,
            {
                class: 'modal-lg modal-dialog-centered website',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    checkFileStatus(d) {
        if (this.checkSubRange) {
            return true
        }
        const check = this.ds.projectDetails.downloads.findIndex(res => res.document_id == d.id)
        if (check > -1) {
            return true
        } else {
            return false
        }
    }
    downloadDocument(documentId: number, file: any) {
        this.ds.downloadDocument(file.project_id, 'qto', documentId).subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
            if (file.name) {
                downloadLink.setAttribute('download', file.name.split(".")[0])
            } else {
                downloadLink.setAttribute('download', 'document')
            }
            document.body.appendChild(downloadLink)
            downloadLink.click()
        })
    }
    // getDoc(id, fileType, pId) {
    //     this.ds.downloadPDF(pId, fileType, id).subscribe(res => {
    //         const fileURL = URL.createObjectURL(res)
    //         window.open(fileURL, '_blank')
    //     })
    // }
    addToCart(docObject: any) {
        if (localStorage.getItem('cart')) {
            const cartObject = JSON.parse(localStorage.getItem('cart'))
            const objectToPush = {
                id: docObject.id,
                price: docObject.qto_price,
                project_id: docObject.project_id,
                name: docObject.name,
                project_title: this.ds.projectDetails.title
            }
            cartObject.documents.push(objectToPush)
            cartObject.totalPrice += docObject.qto_price
            this.api.cartData = cartObject
            localStorage.setItem('cart', JSON.stringify(cartObject))
            this.api.cartItmes.next(this.api.cartData.documents.length)
        } else {
            const cartObject = {
                documents: [
                    {
                        id: docObject.id,
                        price: docObject.qto_price,
                        project_id: docObject.project_id,
                        name: docObject.name,
                        project_title: this.ds.projectDetails.title
                    }
                ],
                totalPrice: docObject.qto_price
            }
            //Object Ends
            this.api.cartData = cartObject
            localStorage.setItem('cart', JSON.stringify(cartObject))
            this.api.cartItmes.next(this.api.cartData.documents.length)
        } //Else End
    }
    checkCart(d: any): any {
        if (this.api.cartData !== null) {
            return this.checkId(d)
        } else {
            return true
        }
    }
    checkId(d: any) {
        const index = this.api.cartData.documents.findIndex(res => res.id == d.id)
        if (index > -1) {
            return false
        } else {
            return true
        }
    }
    removeFromCart(d) {
        const index = this.api.cartData.documents.findIndex(res => res.id == d.id)
        if (index > -1) {
            this.api.cartData.totalPrice -= d.qto_price
            this.api.cartData.documents.splice(index, 1)
            this.api.cartItmes.next(this.api.cartData.documents.length)
            if (this.api.cartData.documents.length == 0) {
                this.api.cartItmes.next(0)
                localStorage.removeItem('cart')
                this.api.cartData = null
            } else {
                localStorage.setItem('cart', JSON.stringify(this.api.cartData))
            }
        }
    }
    getData() {
        const index = this.ds.projectDetails.documents.findIndex(d => d.document_type == 'qto')
        if (index > -1) {
            return false
        } else {
            return true
        }
    }
}
