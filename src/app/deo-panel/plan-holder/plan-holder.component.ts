import { ActivatedRoute, Router } from '@angular/router';

import { UIHelpers } from '../../helpers/ui-helpers';
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'

@Component({
    selector: 'app-plan-holder',
    templateUrl: './plan-holder.component.html',
    styleUrls: ['./plan-holder.component.css']
})
export class PlanHolderComponent implements OnInit {
    dataStatus = 'fetching'
    planList = []
    planForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    pagination: any
    filters: any = {
        name: '',
        page: 1
    }
    loaderOptions = {
        rows: 5,
        cols: 6,
        colSpans: {
            0: 1,
        }
    }
    searchLoading: boolean;
    constructor(
        private ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.planForm = this.fb.group({
            id: new FormControl(null),
            poc_first_name: new FormControl(null, [Validators.maxLength(50)]),
            poc_last_name: new FormControl(null, [Validators.maxLength(50)]),
            email: new FormControl(null, []),
            company_name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            contact_1: new FormControl(null, []),
            contact_2: new FormControl(null, []),
            address: new FormControl(null, [])
        })
        this.route.queryParams.subscribe(params => {
            if (params.page) {
                this.filters.page = params.page
            }
            if (params) {
                this.getlist()
            } else {
                this.getlist()
            }
        })
    }
    getfilterList() {
        this.filters.page = 1
        this.getlist()
    }

    ngOnInit() {

    }
    setPagination(pageValue: number) {
        this.dataStatus = 'fetching'
        let filtersParam: any = {}

        filtersParam = {
            page: pageValue
        }
        this.router.navigate(['/deo/plan-holder'], { queryParams: filtersParam, replaceUrl: true })
    }
    // getlist() {
    //     this.ds.getList(this.page).subscribe((resp: any) => {
    //         if (resp.success === true) {
    //             this.planList = resp.data.data
    //             this.pagination = resp.data
    //             this.dataStatus = 'done'
    //             this.router.navigate(['/deo/plan-holder'], { queryParams: { page: this.page }, replaceUrl: true })
    //         }
    //     })
    // }
    getlist() {
        this.searchLoading = true
        this.ds.getSearchList(this.filters).subscribe((resp: any) => {
            this.searchLoading = false
            if (resp.success === true) {
                this.planList = resp.data.data
                this.dataStatus = 'done'
                this.pagination = resp.data
                this.setParamsToUpdate()
                this.router.navigate(['/deo/plan-holder'], { queryParams: this.filters, replaceUrl: true })
            }
        })
    }
    setParamsToUpdate() {
        if (this.filters.name === '') {
            this.filters.name = null
        }
    }
    get g() {
        return this.planForm.controls
    }

    openModal(modal, index) {
        this.selectedIndex = index
        if (index > -1) {
            this.planForm.controls.id.setValue(this.planList[index].id)
            this.planForm.patchValue(this.planList[index])
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
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        let saveUpdate = this.ds.add(data.value)
        if (this.planForm.value.id !== null) {
            saveUpdate = this.ds.update(data.value)
        }
        saveUpdate.subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
               // this.modalRef.hide()
                //f.resetForm()


                return false
            } else {
                if (this.planForm.value.id !== null) {
                    this.alert.success('Changes done successfully!!')
                    this.planList[this.selectedIndex] = data.value
                    this.planForm.controls.id.setValue(null)
                } else {
                    data.value.id = resp.data
                    this.alert.success('Plan holder added successfully!!')
                    this.planList.push(data.value)
                }
            }
            this.modalRef.hide()
            f.resetForm()
        })
    }

    delete() {
        const params = {
            id: this.selectedId
        }
        this.ds.delete(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.modalRef.hide()

                    return false
                } else {
                    const deletingIndex = this.planList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.planList.splice(deletingIndex, 1)
                    this.modalRef.hide()
                    this.alert.success('Plan holder deleted successfully!!')
                }
            })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelRegionButton(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }
    findInvalidControls() {
        
        const invalid = [];
        const controls = this.planForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid)
        return invalid;
    }

}
