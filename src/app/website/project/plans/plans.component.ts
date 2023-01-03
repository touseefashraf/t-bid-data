import { DataService } from '../data.service'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
    @ViewChild('errorModal', { static: false }) errorModal: ElementRef<any>
    @ViewChild('printContentTemp', { static: false }) printContent: ElementRef<any>
    m = moment
    dateFormat = this.cs.DATE_TIME_FORMAT.CHAR_DATE
    isAuthenticated = false
    isCustomer = false
    isQto = false
    isAdmin = false
    isDeo = false
    susbcriptionError = ''
    checkSubRange = true
    modalRef: BsModalRef
    selectedFile: any
    selectedMethod = ''
    hoverResults = []
    spinner = '/assets/img/loading-pdf.gif'
    constructor(
        public api: ApiService,
        public ds: DataService,
        public cs: ConstantsService,
        public router: Router,
        private ms: BsModalService,
        private _sanitizer: DomSanitizer,
    ) {
        this.api.userLoggedInObs.subscribe(m => {
            this.isAuthenticated = m
            if (this.isAuthenticated) {
                this.loginUpdates()
            }
        })
    }
    loginUpdates(): void {
        this.isCustomer = this.api.isCustomer()
        this.isAdmin = this.api.isAdmin()
        this.isQto = this.api.isQto()
        this.isDeo = this.api.isDeo()
    }
    ngOnInit() {
        if (this.api.user.user_type == 'customer') {
            this.checkErrors(this.ds.pId, 'plan')
        }
    }
    ngAfterViewInit() {
    }
    preError(file: any, method) {
        this.hoverResults[file.id] = {
            message: '',
            status: 'pending',
            fileURL: null
        }
        this.selectedMethod = method
        if (!this.isAuthenticated) {
            if (method !== 'hover') {
                this.router.navigate(['/login'])
            } else {
                this.hoverResults[file.id].status = 'error'
                this.hoverResults[file.id].message = 'login'
            }
            return false
        }

        this.selectedFile = file
        this.checkErrors(file.project_id, file.document_type, file.id)
    }

    checkErrors(pId, fileType, id?) {
        this.ds.checkDownloadErrors(pId, fileType).subscribe(resp => {
            if (resp.success == false) {
                this.checkSubRange = false
                this.susbcriptionError = resp.errors.general
                if (id) {
                    if (this.selectedMethod !== 'hover') {
                        this.openModal(this.errorModal)
                    } else {
                        this.hoverResults[id].status = 'error'
                        this.hoverResults[id].message = 'upgrade'
                    }
                }
            } else {
                this.checkSubRange = true
                if (id) {
                    if (this.selectedMethod == 'view' || this.selectedMethod === 'hover') {
                        this.getDoc(id, fileType, pId)
                    } else {
                        this.downloadDocument(this.selectedFile.id, this.selectedFile)
                    }
                }
            }
        })
    }
    viewDoc(id, fileType, pId) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.ds.viewPDF(pId, fileType, id));
    }
    downloadDocument(documentId: number, file: any) {
        this.ds.downloadDocument(file.project_id, 'plan', documentId).subscribe((resp: any) => {
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
    getDoc(id, fileType, pId) {
        this.ds.downloadPDF(pId, fileType, id).subscribe(res => {
            const fileURL = URL.createObjectURL(res)
            if (this.selectedMethod === 'view') {
                window.open(fileURL, '_blank')
            } else {
                this.hoverResults[id].status = 'success'
            }
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
    downloadFolder() {
        this.ds.downloadFolder(this.ds.pId, 'plan').subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
            downloadLink.setAttribute('download', 'document')
            document.body.appendChild(downloadLink)
            downloadLink.click()
        })
    }
    getData() {
        const index = this.ds.projectDetails.documents.findIndex(d => d.document_type == 'plan')
        if (index > -1) {
            return false
        } else {
            return true
        }
    }

    makeHoverResults(file, method) {
        if (typeof this.hoverResults[file.id] === "undefined") {
            this.preError(file, method)
        }
    }
}
