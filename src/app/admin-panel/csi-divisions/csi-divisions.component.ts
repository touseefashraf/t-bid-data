import { IAlertService } from './../../libs/ialert/ialerts.service'
import { UIHelpers } from './../../helpers/ui-helpers'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { DataService } from './data.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-csi-divisions',
    templateUrl: './csi-divisions.component.html',
    styleUrls: ['./csi-divisions.component.css']
})
export class CsiDivisionsComponent implements OnInit {
    dataStatus = 'fetching'
    csiDivisionList = []
    csiDivisionForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    page = 1
    pagination: any
    name: any = ''
    user: any
    sAdminId: any
    loaderOptions = {
        rows: 5,
        cols: 4,
        colSpans: {
            0: 1,
        }
    }
    waiting = {
        search: false,
        loader: false
    }
    constructor(
        private ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        public router: Router,
        private route: ActivatedRoute,
        private ms: BsModalService,
    ) {
        this.route.queryParams.subscribe(params => {
            if (params.page) {
                this.page = params.page
            }
            if (params.name) {
                this.name = params.name
            }
            if (params) {
                this.search()
            }
        })
        this.csiDivisionForm = this.fb.group({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
            description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
        })
    }

    setPagination(page: number) {
        let filtersParam: any = {}

        filtersParam = {
            name: this.name,
            page,
        }
        this.router.navigate(['/admin/csi-divisions'], { queryParams: filtersParam, replaceUrl: true })
    }

    search(): void {
        this.waiting.search = true
        const params = {
            page: this.page,
            name: this.name,
        }
        this.ds.getList(params).subscribe((resp: any) => {
            this.waiting.search = false
            if (resp.success === true) {
                this.csiDivisionList = resp.data.data
                this.pagination = resp.data
                this.dataStatus = 'done'
                this.router.navigate(['/admin/csi-divisions'], { queryParams: params, replaceUrl: true })
            }
        })

    }

    ngOnInit() {
    }

    get g() {
        return this.csiDivisionForm.controls
    }

    openModal(modal, index) {
        this.selectedIndex = index
        if (index > -1) {
            this.csiDivisionForm.patchValue(this.csiDivisionList[index])
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
        this.waiting.loader = true
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            this.waiting.loader = false

            return false
        }


        let saveUpdate = this.ds.add(data.value)
        if (this.csiDivisionForm.value.id !== null) {
            saveUpdate = this.ds.update(data.value)
        }
        saveUpdate.subscribe((resp: any) => {
            this.waiting.loader = false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                if (this.csiDivisionForm.value.id !== null) {
                    this.alert.success('Changes done successfully!!')
                    this.csiDivisionList[this.selectedIndex].name = data.value.name
                    this.csiDivisionList[this.selectedIndex].description = data.value.description
                    this.csiDivisionForm.controls.id.setValue(null)
                } else {
                    data.value.id = resp.data
                    data.value.status = 'active'
                    const dataValue = data.value
                    this.alert.success('CSI Division added successfully!!')
                    this.csiDivisionList.push(dataValue)
                }
            }
            this.modalRef.hide()
            f.resetForm()
        })
    }

    delete() {
        this.waiting.loader = true
        const params = {
            id: this.selectedId
        }
        this.ds.delete(params)
            .subscribe((resp: any) => {
                this.waiting.loader = false
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)

                    return false
                } else {
                    this.csiDivisionList.splice(this.selectedIndex, 1)
                    this.alert.success('CSI Division deleted successfully!!')
                }
                this.modalRef.hide()
            })
    }

    activeUser(id, index) {
        this.selectedId = id
        this.selectedIndex = index
        const param = { id: this.selectedId }
        this.ds.activeUser(param).subscribe((resp: any) => {
            if (resp.success === true) {
                this.alert.success('user active successfully')
                this.csiDivisionList[this.selectedIndex].status = 'active'
            } else {
                this.alert.error('Some error!!')
            }

        })
    }
    inactiveUser(id, index) {
        this.selectedId = id
        this.selectedIndex = index
        const param = { id: this.selectedId }
        this.ds.inactiveUser(param).subscribe((resp: any) => {
            if (resp.success === true) {
                this.alert.success('user deactive successfully')
                this.csiDivisionList[this.selectedIndex].status = 'inactive'
            } else {
                this.alert.error('Some error!!')
            }

        })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelDivisionButton(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }
}
