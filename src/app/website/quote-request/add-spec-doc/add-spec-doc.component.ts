import { DataService } from '../data.service';
import { ApiService } from 'src/app/services/api.service';
import { IAlertService } from './../../../libs/ialert/ialerts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Component, OnInit, Input, OnDestroy, TemplateRef } from '@angular/core'
import { Router } from '@angular/router'


@Component({
    selector: 'app-add-spec-doc',
    templateUrl: './add-spec-doc.component.html',
    styleUrls: ['./add-spec-doc.component.css']
})
export class AddSpecDocComponent implements OnInit {
    @Input() modalRef: BsModalRef
    @Input() index: number
    uploadedFiles = []
    projectId: number
    spinnerSVG: string
    mRef: BsModalRef
    deletionIds: any = []
    sub: any

    constructor(
        public api: ApiService,
        public ds: DataService,
        private modalService: BsModalService,
        private alert: IAlertService,
        private router: Router
    ) {
        this.spinnerSVG = `/assets/img/loading.gif`
    }

    ngOnInit() {
        //this.projectId = this.dataService.projectDetails.id
        // this.dataService.projectDetails.documents.forEach((file: any) => {
        //     this.uploadedFiles.push({
        //         id: file.id,
        //         name: file.name
        //     })
        // })
    }
    openConfirmingModal(modal: TemplateRef<any>) {
        this.mRef = this.modalService.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    openSelectedConfirmingModal(modal: TemplateRef<any>) {
        this.mRef = this.modalService.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    onDocumentChange(event: any) {
        this.uploadFiles(event.target.files)
    }

    uploadFiles(files: FileList) {
        const allowedExtensions = ['pdf']
        const defaulterFiles = []

        Array.from(files).forEach((file: any) => {
            const extension = file.name.split('.').pop().toLowerCase()
            if (this.checkFileExist(file)) {
                return false
            }
            if (allowedExtensions.indexOf(extension) > -1) {
                this.readFile(file)
            } else {
                defaulterFiles.push(file.name)
                this.alert.error(`${file.name} has an invalid file type. Only PDF is allowed`)
            }
        })
    }
    checkFileExist(file) {
        let fileExist: boolean
        this.uploadedFiles.forEach(d => {
            if (file.name.split('.')[0] == d.name) {
                fileExist = true
            }
        })
        if (fileExist) {
            this.alert.error(`${file.name} is already added `)

            return true
        } else {
            return false
        }
    }
    readFile(file: any) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e: any) => {
            const index = this.uploadedFiles.length
            this.uploadedFiles.push({
                id: -1,
                file: reader.result,
                uploading: true
            })
            this.uploadDocument(reader.result, index, file)
        }
    }

    uploadDocument(fileData: any, index: number, file: any) {
        fetch(fileData)
            .then(res => res.blob())
            .then(blob => {
                const myFile = new Blob([blob]) // for microsoft edge support
                const formData = new FormData()
                formData.append('document_type', 'spec')
                formData.append('document', myFile)
                formData.append('name', file.name.split(".")[0])
                formData.append('quote_request_id', this.ds.preId)
                this.ds.uploadFile(formData).subscribe((resp: any) => {
                    this.ds.specDoc.next(this.ds.specDoc.getValue()+1)
                    this.uploadedFiles[index].id = resp.data
                    this.uploadedFiles[index].uploading = false
                    // this.uploadedFiles[index].name = file.name
                    this.uploadedFiles[index].name = file.name.split(".")[0]
                    // this.dataService.projectDetails.documents.push({
                    //     id: resp.data,
                    //     project_id: this.dataService.projectDetails.id,
                    //     name: file.name.split(".")[0]
                    // })
                })
            })
    }

    deleteFile(fileId,index) {
        this.uploadedFiles[index].image = this.spinnerSVG
        const params = {
            id: fileId,
            quote_request_id: this.ds.preId,
            document_type: 'spec'
        }
        const fileype = this.uploadedFiles[index].id
        this.ds.deleteFile(params).subscribe(resp => {
            this.uploadedFiles.splice(index, 1)
            this.ds.specDoc.next(this.ds.specDoc.getValue()-1)
        })
    }

    // deleteAllFiles() {
    //     const params = {
    //         project_id: this.projectId,
    //         file_type: 'spec'
    //     }
    //     this.dataService.deleteAllFiles(params).subscribe(resp => {
    //         if (resp.success == true) {
    //             this.uploadedFiles = []
    //             this.dataService.projectDetails.documents = []
    //             this.alert.success('All files Deleted successfully')
    //         } else {
    //             this.alert.error(resp.errors.general)
    //         }
    //         this.mRef.hide()
    //     })
    // }

    addDeletionIds(id: number) {
        const index = this.deletionIds.findIndex(d => d == id)
        if (index > -1) {
            this.deletionIds.splice(index, 1)
        } else {
            this.deletionIds.push(id)
        }
    }

    // deleteSelectedFiles() {
    //     const params = {
    //         fileIds: this.deletionIds,
    //         file_type: 'spec',
    //         project_id: this.projectId
    //     }
    //     this.dataService.deleteSelectedFiles(params).subscribe(resp => {
    //         if (resp.success == true) {
    //             this.deletionIds.forEach((data: any) => {
    //                 const index = this.uploadedFiles.findIndex(d => d.id == data)
    //                 if (index > -1) {
    //                     this.uploadedFiles.splice(index, 1)
    //                     this.dataService.projectDetails.documents.splice(index, 1)
    //                 }
    //             })
    //             this.deletionIds = []
    //             this.alert.success('Selected files Deleted successfully')
    //         } else {
    //             this.alert.error(resp.errors.general)
    //         }
    //         this.mRef.hide()
    //     })
    // }

    // downloadDocument(documentId: number, file: any) {
    //     this.dataService.downloadDocument(this.projectId, 'spec', documentId).subscribe((resp: any) => {
    //         const binaryData = []
    //         binaryData.push(resp)
    //         const downloadLink = document.createElement('a')
    //         downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
    //         if (file.name) {
    //             downloadLink.setAttribute('download', file.name.split(".")[0])
    //         } else {
    //             downloadLink.setAttribute('download', 'document')
    //         }
    //         document.body.appendChild(downloadLink)
    //         downloadLink.click()
    //     })
    // }


    fileDragStart(e: any): void {
        e.preventDefault()
        document.getElementsByClassName('images-container')[0].classList.add('highlight')
    }

    fileDragEnd(e: any): void {
        e.preventDefault()
        document.getElementsByClassName('images-container')[0].classList.remove('highlight')
    }

    fileDropped(e: any): void {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer && e.dataTransfer.files.length) {
            this.uploadFiles(e.dataTransfer.files)
        }
        document.getElementsByClassName('images-container')[0].classList.remove('highlight')
    }

    browseFiles(event: any) {
        event.preventDefault()
        const element = document.getElementById('other-files')
        element.click()
    }

}
