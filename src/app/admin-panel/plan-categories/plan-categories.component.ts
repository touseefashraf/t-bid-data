
import { UIHelpers } from './../../helpers/ui-helpers';
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'

@Component({
    selector: 'app-plan-categories',
    templateUrl: './plan-categories.component.html',
    styleUrls: ['./plan-categories.component.css']
})
export class PlanCategoriesComponent implements OnInit {
    dataStatus = 'fetching'
    planCategoriesList = []
    planForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    loaderOptions = {
        rows: 5,
        cols: 5,
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
        this.planForm = this.fb.group({
            id: new FormControl(null),
            title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            min_bid_range: new FormControl(null, [Validators.required, Validators.min(0)]),
            max_bid_range: new FormControl(null, Validators.min(0)),
            web_display: new FormControl(null, [Validators.required]),

        })
        this.setValidator()
    }

    ngOnInit() {
        this.ds.getPlanCategory().subscribe((resp: any) => {
            if (resp.success === true) {
                this.planCategoriesList = resp.data
                this.dataStatus = 'done'
            }
        })
    }

    setValidator() {
        this.planForm.get('min_bid_range').valueChanges.subscribe((newVal: any) => {
            // this.planForm.get('min_bid_range').setValidators(Validators.max(this.planForm.get('max_bid_range').value))
            this.planForm.get('min_bid_range').setValidators(Validators.compose([Validators.max(this.planForm.get('max_bid_range').value), Validators.min(0)]))
            this.planForm.get('max_bid_range').setValidators(Validators.min(newVal))
            this.planForm.get('max_bid_range').markAsTouched()
            this.planForm.get('max_bid_range').updateValueAndValidity({ emitEvent: true })
        })
        this.planForm.get('max_bid_range').valueChanges.subscribe((newVal: any) => {
            this.planForm.get('max_bid_range').setValidators(Validators.min(this.planForm.get('min_bid_range').value))
            this.planForm.get('min_bid_range').setValidators(Validators.compose([Validators.max(newVal), , Validators.min(0)]))
            this.planForm.get('min_bid_range').markAsTouched()
            this.planForm.get('min_bid_range').updateValueAndValidity({ emitEvent: false })
        })
    }

    get g() {
        return this.planForm.controls
    }

    openModal(modal, index) {
        this.selectedIndex = index
        if (index > -1) {
            this.planForm.controls.id.setValue(this.planCategoriesList[index].id)
            this.planForm.patchValue(this.planCategoriesList[index])
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
        const params = {
            id: this.planForm.value.id,
            title: data.value.title,
            min_bid_range: data.value.min_bid_range,
            max_bid_range: data.value.max_bid_range,
            web_display: data.value.web_dsiplay

        }

        let saveUpdate = this.ds.addPlanCategory(data.value)
        if (this.planForm.value.id !== null) {
            saveUpdate = this.ds.updatePlanCategory(data.value)
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
                if (this.planForm.value.id !== null) {
                    this.alert.success('Changes done successfully!!')
                    this.planCategoriesList[this.selectedIndex] = data.value
                    this.planForm.controls.id.setValue(null)
                } else {
                    data.value.id = resp.data
                    this.alert.success('Category added successfully!!')
                    this.planCategoriesList.push(data.value)
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
        this.ds.deletePlanCategory(params)
            .subscribe((resp: any) => {
                this.yesLoading = false
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.modalRef.hide()
                    this.yesLoading = false

                    return false
                } else {
                    const deletingIndex = this.planCategoriesList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.planCategoriesList.splice(deletingIndex, 1)
                    this.modalRef.hide()
                    this.alert.success('Category deleted successfully!!')
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

}
