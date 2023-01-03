import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';
import { DataService } from '../data.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-qto',
    templateUrl: './qto.component.html',
    styleUrls: ['./qto.component.css']
})
export class QtoComponent implements OnInit {
    uploadCsiIndex: any = []
    full_project_qto: any = 1
    @Input() qto: any
    @Input() projectId: any
    moment = moment
    modalRef: BsModalRef
    dateFormat: any
    spinnerSVG: any
    csiList: any
    csiDivisionIds: any = []
    uploadDoc: any = null
    constructor(
        public cs: ConstantsService,
        public ds: DataService,
        public alert: IAlertService,
        private modalService: BsModalService,
    ) {
        this.dateFormat = cs.DATE_TIME_FORMAT.DOC_DATE
        this.spinnerSVG = `/assets/images/spinner.svg`
    }
    ngOnInit() {

        this.ds.getDivisions(this.projectId).subscribe((resp: any) => {

            if (resp.success === true) {

                this.csiList = resp.data
            }
        })
    }
    openModal(modelName) {
        this.modalRef = this.modalService.show(
            modelName,
            {
                class: 'modal-lg modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    downloadDocument(documentId: number, file: any) {
        this.ds.downloadDocument(this.projectId, 'qto', documentId).subscribe((resp: any) => {
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
    downloadFolder() {
        this.ds.downloadFolder(this.projectId, 'qto').subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
            downloadLink.setAttribute('download', 'document')
            document.body.appendChild(downloadLink)
            downloadLink.click()
        })
    }
    browseFiles(event: any) {
        event.preventDefault()
        const element = document.getElementById('other-files')
        element.click()
    }

    onDocumentChange(event: any) {
        this.uploadFiles(event.target.files)
    }

    uploadFiles(files: FileList) {
        const allowedExtensions = ['xlsx', 'xls']
        const defaulterFiles = []

        Array.from(files).forEach((file: any) => {
            const extension = file.name.split('.').pop().toLowerCase()
            if (this.checkFileExist(file)) {
                return false
            }
            if (allowedExtensions.indexOf(extension) > -1) {
                //this.readFile(file)
                this.uploadDoc = file
            } else {
                defaulterFiles.push(file.name)
                this.alert.error(`${file.name} has an invalid file type. Only xlsx,xls are allowed`)
            }
        })
    }
    checkFileExist(file) {
        let fileExist: boolean
        this.qto.forEach(d => {
            if (file.name.split('.')[0].toLowerCase() == d.name.toLowerCase()) {
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
        const csi: any = []
        this.csiList
        if (this.uploadCsiIndex.length > 0) {
            this.uploadCsiIndex.forEach(element => {
                csi.push(
                    {
                        csi_division_id: this.csiList[element].id,
                        csi_division: this.csiList[element].csi_division
                    })

            });
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e: any) => {

            const index = this.qto.length
            this.qto.push({
                id: -1,
                file: reader.result,
                project_csi_divisions: csi,
                full_project_qto: this.full_project_qto,
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
                formData.append('document_type', 'qto')
                formData.append('full_project_qto', this.full_project_qto)
                formData.append('document', myFile)
                formData.append('csi_division_ids', this.csiDivisionIds)
                formData.append('name', file.name.split(".")[0])
                formData.append('project_id', this.projectId.toString())
                this.ds.uploadFile(formData).subscribe((resp: any) => {
                    if (resp.success == true) {
                        this.qto[index].id = resp.data
                        this.qto[index].uploading = false
                        this.qto[index].updated_at = new Date()
                        this.qto[index].file_size = file.size
                        this.qto[index].name = file.name.split(".")[0]
                        this.alert.success(`${file.name.split(".")[0]} uploaded successfully`)
                        this.cancelButton()
                    } else {
                        this.alert.error(resp.errors.general)
                        this.qto.splice(index, 1)
                    }
                })//upload api
            })
    }
    save() {
        if (this.full_project_qto == 0) {
            if (this.csiDivisionIds.length == 0) {
                this.alert.error(`CSI Division is required`)
                return false
            }
        }
        if (this.uploadDoc == null) {
            this.alert.error(`Document is required`)
            return false
        }

        this.readFile(this.uploadDoc)

    }
    deleteFile(index: number) {
        this.qto[index].uploading = true
        const params = {
            id: this.qto[index].id,
            project_id: this.projectId,
            file_type: 'qto'
        }
        const fileype = this.qto[index].id
        this.ds.deleteFile(params).subscribe(resp => {
            if (resp.success == true) {
                this.alert.success(`${this.qto[index].name} Deteled Successfully`)
                this.qto.splice(index, 1)
            } else {
                this.alert.error(resp.errors.general)
                this.qto[index].uploading = false
            }
        })
    }


    cancelButton() {
        this.csiDivisionIds = []
        this.full_project_qto = 1
        this.uploadDoc = null
        this.uploadCsiIndex = []
        this.modalRef.hide()
    }

    checkcsiId(id: any) {
        const index = this.csiDivisionIds.findIndex(d => d == id)
        if (index > -1) {
            return true
        } else {
            return false
        }
    }

    spliceAddCsiId(id: any, rowIndex) {

        const index = this.csiDivisionIds.findIndex(d => d == id)
        if (index > -1) {
            this.uploadCsiIndex.splice(index, 1)
            this.csiDivisionIds.splice(index, 1)
        } else {
            this.uploadCsiIndex.push(+rowIndex)
            this.csiDivisionIds.push(+id)
        }

    }
}
