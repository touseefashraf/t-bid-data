import { Router, ActivatedRoute } from '@angular/router'
import { DataService } from './data.service'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'
import { ImageCroppedEvent } from 'ngx-image-cropper'
@Component({
    selector: 'app-images-adder',
    templateUrl: './images-adder.component.html',
    styleUrls: ['./images-adder.component.css']
})
export class ImagesAdderComponent implements OnInit {
    dataStatus = 'fetching'
    thumbnail: any = '/assets/img/default.png'
    spinnerSVG = `/assets/images/spinner.svg`
    deletePop: any
    companyForm: FormGroup
    companyList = []
    selectedIndex: any
    selectedId: any
    modalRef: BsModalRef
    imageChangedEvent: any = ''
    croppedImage: any = ''
    cropperModalRef: BsModalRef
    loaderOptions = {
        rows: 5,
        cols: 3,
        colSpans: {
            0: 1,
        }
    }
    constructor(
        private ds: DataService,
        public api: ApiService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
    ) {
        this.companyForm = this.fb.group({
            id: new FormControl(null),
            link: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            // code: new FormControl(null, [Validators.required, Validators.maxLength(50)])
        })
    }

    ngOnInit() {

        this.ds.getCountry().subscribe((resp: any) => {
            if (resp.success === true) {
                this.companyList = resp.data
                this.dataStatus = 'done'
            }
        })
    }

    get g() {
        return this.companyForm.controls
    }

    openModalSubject(adderModal, index) {
        if (index > -1) {
            this.selectedIndex = index
            this.thumbnail = this.ds.companyImageUrl(this.companyList[index].id) + '?' + JSON.stringify(new Date())
            this.companyForm.controls.id.setValue(this.companyList[index].id)
            this.companyForm.patchValue(this.companyList[index])
        }
        this.modalRef = this.ms.show(
            adderModal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    getImg(imgId: number) {
        const index = this.companyList.findIndex(d => d.id === imgId)
        if (index > -1 && this.companyList[index].timeStamp) {
            return this.api.companyImageUrl(imgId) + '?' + this.companyList[index].timeStamp
        } else {
            return this.api.companyImageUrl(imgId)
        }
    }

    saveCompany(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        const params = {
            id: data.value.id,
            link: data.value.link,
            //     code: data.value.code
        }

        fetch(this.thumbnail)
            .then(res => res.blob())
            .then(blob => {
                const imageFile = new Blob([blob])
                const formData = this.api.jsonToFormData(params)
                formData.append('image', imageFile)


                let saveUpdate = this.ds.addCountry(formData)
                if (this.companyForm.value.id !== null) {
                    saveUpdate = this.ds.updateCountry(formData)
                }
                saveUpdate.subscribe((resp: any) => {
                    if (resp.success === false) {
                        this.alert.error(resp.errors.general)
                        this.modalRef.hide()
                        f.resetForm()


                        return false
                    } else {
                        if (this.companyForm.value.id !== null) {
                            this.alert.success('Changes done successfully!!')
                            const mergeParams = {
                                id: this.companyForm.value.id,
                                link: data.value.link,
                                // code: data.value.code,
                                timeStamp: JSON.stringify(new Date())
                            }
                            this.companyList[this.selectedIndex] = mergeParams
                            this.companyForm.controls.id.setValue(null)
                        }
                        else {
                            this.alert.success('Company Image added successfully!!')
                            const mergeParams = {
                                id: resp.data,
                                link: data.value.link,
                                // code: data.value.code,
                            }
                            this.companyList.push(mergeParams)
                        }
                    }
                    this.modalRef.hide()
                    f.resetForm()
                    this.thumbnail='/assets/img/default.png'
                })
            })
    }

    deleteCountry() {
        const params = {
            id: this.selectedId
        }
        this.ds.deleteCountry(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.deletePop.hide()

                    return false
                } else {
                    const deletingIndex = this.companyList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.companyList.splice(deletingIndex, 1)
                    this.deletePop.hide()
                    this.alert.success('Company Image deleted successfully!!')
                }
            })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelCountryButton(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }

    browseThumbnail(event: any) {
        event.preventDefault()
        const element = document.getElementById('thumbnail-image')
        element.click()
    }

    onThumbnailChange(event: any, template: TemplateRef<any>) {
        const file = event.target.files[0]
        const allowedExtensions = ['png', 'jpg', 'jpeg']
        const extension = file.name.split('.').pop().toLowerCase()
        const fileSize = file.size / 1024 / 1024
        if (fileSize > 3) {
            this.alert.error('Invalid file size. File size must not exceeds 3MB')
        } else if (allowedExtensions.indexOf(extension) < 0) {
            this.alert.error('Invalid file type. Only png, jpg or jpeg are allowed')
        } else {
            this.imageChangedEvent = event
            this.cropperModalRef = this.ms.show(
                template,
                Object.assign({}, { class: 'modal-md modal-dialog-centered admin-panel' })
            )
        }
    }

    doneCroppingThumbnail() {
        this.thumbnail = this.croppedImage
        document.getElementById('banner-img').setAttribute('src', this.thumbnail)
        this.cropperModalRef.hide()
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64
    }

    // companyImageCropped(event: ImageCroppedEvent) {
    //     this.croppedCompanyImage = event.base64
    // }

    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

}
