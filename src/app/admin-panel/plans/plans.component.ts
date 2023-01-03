
import { UIHelpers } from '../../helpers/ui-helpers';
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
    dataStatus = 'fetching'
    plansList = []
    planForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    planCategoryId: any
    planCategory: any
    saveLoading = false
    yesLoading = false

    constructor(
        private ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.planCategoryId = this.route.snapshot.paramMap.get('id')
        this.planForm = this.fb.group({
            id: new FormControl(null),
            plan_category_id: new FormControl(this.planCategoryId),
            title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            monthly_downloads_limit: new FormControl(null, [Validators.required, Validators.min(0)]),
            yearly_downloads_limit: new FormControl(null, [Validators.required, Validators.min(0)]),
            monthly_price: new FormControl(null, [Validators.required, Validators.min(0)]),
            yearly_price: new FormControl(null, [Validators.required, Validators.min(0)]),
            web_display: new FormControl(null, [Validators.required]),

        })
        this.setValidator()
    }

    ngOnInit() {
        this.ds.getPlans(this.planCategoryId).subscribe((resp: any) => {
            if (resp.success === true) {
                this.plansList = resp.data.plans
                this.planCategory = resp.data
                this.dataStatus = 'done'
            }
        })
    }

    get g() {
        return this.planForm.controls
    }

    setValidator() {
        this.planForm.get('monthly_downloads_limit').valueChanges.subscribe((newVal: any) => {
            // this.planForm.get('monthly_downloads_limit').setValidators(Validators.max(this.planForm.get('yearly_downloads_limit').value))
            this.planForm.get('monthly_downloads_limit').setValidators(Validators.compose([Validators.max(this.planForm.get('yearly_downloads_limit').value), Validators.min(0)]))
            this.planForm.get('yearly_downloads_limit').setValidators(Validators.min(newVal))
            this.planForm.get('yearly_downloads_limit').markAsTouched()
            this.planForm.get('yearly_downloads_limit').updateValueAndValidity({ emitEvent: true })
        })
        this.planForm.get('yearly_downloads_limit').valueChanges.subscribe((newVal: any) => {
            this.planForm.get('yearly_downloads_limit').setValidators(Validators.min(this.planForm.get('monthly_downloads_limit').value))
            this.planForm.get('monthly_downloads_limit').setValidators(Validators.compose([Validators.max(newVal), , Validators.min(0)]))
            this.planForm.get('monthly_downloads_limit').markAsTouched()
            this.planForm.get('monthly_downloads_limit').updateValueAndValidity({ emitEvent: false })
        })

        // price value changes

        this.planForm.get('monthly_price').valueChanges.subscribe((newVal: any) => {
            // this.planForm.get('monthly_price').setValidators(Validators.max(this.planForm.get('yearly_price').value))
            this.planForm.get('monthly_price').setValidators(Validators.compose([Validators.max(this.planForm.get('yearly_price').value), Validators.min(0)]))
            this.planForm.get('yearly_price').setValidators(Validators.min(newVal))
            this.planForm.get('yearly_price').markAsTouched()
            this.planForm.get('yearly_price').updateValueAndValidity({ emitEvent: true })
        })
        this.planForm.get('yearly_price').valueChanges.subscribe((newVal: any) => {
            this.planForm.get('yearly_price').setValidators(Validators.min(this.planForm.get('monthly_price').value))
            this.planForm.get('monthly_price').setValidators(Validators.compose([Validators.max(newVal), , Validators.min(0)]))
            this.planForm.get('monthly_price').markAsTouched()
            this.planForm.get('monthly_price').updateValueAndValidity({ emitEvent: false })
        })
    }

    openModal(modal, index) {
        if (index > -1) {
            this.selectedIndex = index
            this.planForm.controls.id.setValue(this.plansList[index].id)
            this.planForm.patchValue(this.plansList[index])
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
            plan_category_id: this.planCategoryId,
            monthly_downloads_limit: data.value.monthly_downloads_limit,
            yearly_downloads_limit: data.value.yearly_downloads_limit,
            monthly_price: data.value.monthly_price,
            yearly_price: data.value.yearly_price,
            web_display: data.value.web_display,

        }

        let saveUpdate = this.ds.addPlan(params)
        if (this.planForm.value.id !== null) {
            saveUpdate = this.ds.updatePlan(params)
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
                    this.alert.success('Plan done successfully!!')
                    this.plansList[this.selectedIndex] = params
                    this.planForm.controls.id.setValue(null)
                } else {
                    params.id = resp.data
                    this.alert.success('Plan added successfully!!')
                    this.plansList.push(params)
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
        this.ds.deletePlan(params)
            .subscribe((resp: any) => {
                this.yesLoading = false
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.modalRef.hide()
                    this.yesLoading = false

                    return false
                } else {
                    const deletingIndex = this.plansList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.plansList.splice(deletingIndex, 1)
                    this.modalRef.hide()
                    this.alert.success('Plan deleted successfully!!')
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
