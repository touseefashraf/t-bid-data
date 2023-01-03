import { UIHelpers } from './../../helpers/ui-helpers'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'

@Component({
    selector: 'app-project-owners',
    templateUrl: './project-owners.component.html',
    styleUrls: ['./project-owners.component.css']
})
export class ProjectOwnersComponent implements OnInit {
    dataStatus = 'fetching'
    projectOwnersList = []
    pOwnerForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    loaderOptions = {
        rows: 5,
        cols: 6,
        colSpans: {
            0: 1,
        }
    }
    saveLoading = false
    yesLoading = false
    constructor(
        private ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
    ) {
        this.pOwnerForm = this.fb.group({
            id: new FormControl(null),
            poc_first_name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            poc_last_name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            address: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            contact_1: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
            org_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            fax_no: new FormControl(null, [Validators.maxLength(20)])
        })
    }

    ngOnInit() {
        this.ds.getProjectOwner().subscribe((resp: any) => {
            if (resp.success === true) {
                this.projectOwnersList = resp.data
                this.dataStatus = 'done'
            }
        })
    }

    get g() {
        return this.pOwnerForm.controls
    }

    openModal(modal, index) {
        this.selectedIndex = index
        if (index > -1) {
            this.pOwnerForm.controls.id.setValue(this.projectOwnersList[index].id)
            this.pOwnerForm.patchValue(this.projectOwnersList[index])
        }
        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    save(data: any, f: any) {
        this.saveLoading = true
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            this.saveLoading = false

            return false
        }

        const params = data.value
        let saveUpdate = this.ds.addProjectOwner(params)
        if (this.pOwnerForm.value.id !== null) {
            saveUpdate = this.ds.updateProjectOwner(params)
        }
        saveUpdate.subscribe((resp: any) => {
            this.saveLoading = false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                this.modalRef.hide()
                f.resetForm()
                this.saveLoading = false

                return false
            } else {
                if (this.pOwnerForm.value.id !== null) {
                    this.alert.success('Changes done successfully!!')
                    this.projectOwnersList[this.selectedIndex] = params
                    this.pOwnerForm.controls.id.setValue(null)
                } else {
                    params.id = resp.data
                    this.alert.success('Project owner added successfully!!')
                    this.projectOwnersList.push(params)
                }
            }
            this.modalRef.hide()
            f.resetForm()
        })
    }

    delete() {
        this.yesLoading = true
        const params = {
            id: this.selectedId
        }
        this.ds.deleteProjectOwner(params)
            .subscribe((resp: any) => {
                this.yesLoading = false
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.modalRef.hide()
                    this.yesLoading = false

                    return false
                } else {
                    const deletingIndex = this.projectOwnersList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.projectOwnersList.splice(deletingIndex, 1)
                    this.modalRef.hide()
                    this.alert.success('Project owner deleted successfully!!')
                }
            })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm' })
    }

    cancelRegionButton(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }

}
