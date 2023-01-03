import { UIHelpers } from '../../helpers/ui-helpers';
import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { Router, ActivatedRoute } from '@angular/router'
import * as moment from 'moment'


@Component({
    selector: 'app-coupons',
    templateUrl: './coupons.component.html',
    styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
    dataStatus = 'fetching'
    codeStatus = ''
    registrationDate = ''
    coupon: any
    userType = ''
    data = []
    dataForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    page = 1
    pagination: any
    nameOrder = ''
    results: any
    mt = moment
    minDate = new Date()
    waiting: Array<boolean> = []
    loading = false
    loaderOptions = {
        rows: 5,
        cols: 8,
        colSpans: {
            0: 1,
        }
    }

    constructor(
        private ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
        public elem: ElementRef,
        public router: Router,
        private route: ActivatedRoute,

    ) {

        this.route.queryParams.subscribe(params => {

            if (params.page) {
                this.page = params.page
            }
            if (params) {
                this.search()
            }
        })
        this.dataForm = this.fb.group({
            id: new FormControl(null),
            title: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            code: new FormControl(null, [Validators.required]),
            discount_type: new FormControl('', [Validators.required]),
            usage_limit: new FormControl(null, [Validators.required]),
            expiry_date: new FormControl(null, [Validators.required]),
            discount: new FormControl(null, [Validators.required, Validators.min(0)]),
            status: new FormControl(null)
        })
        this.setValidator()
    }

    ngOnInit() {

    }

    setPagination(page: number) {
        let filtersParam: any = {}

        filtersParam = {
            page
        }
        this.router.navigate(['/admin/coupons'], { queryParams: filtersParam, replaceUrl: true })
    }

    get g() {
        return this.dataForm.controls
    }
    getCoupon(modal) {
        this.ds.preCoupon().subscribe((resp: any) => {
            if (resp.success == true) {
                this.coupon = resp.data.code
                this.selectedId = resp.data.id
                this.codeStatus = 'done'
                this.dataForm.controls.code.setValue(this.coupon)
                this.dataForm.controls.id.setValue(this.selectedId)
                this.showCouponModal(modal)

            }
        })
    }
    setValidator() {
        this.dataForm.get('discount_type').valueChanges.subscribe((newVal: any) => {

            if (newVal == 'perc') {
                this.dataForm.get('discount').setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(0)]))
            } else {
                this.dataForm.get('discount').setValidators(Validators.compose([Validators.required, Validators.min(0)]))
            }
            this.dataForm.get('discount').markAsTouched()
            this.dataForm.get('discount').updateValueAndValidity({ emitEvent: false })
        })
    }
    openModal(modal, index) {
        this.loading = true
        this.selectedIndex = index
        if (index > -1) {
            this.dataForm.patchValue(this.data[index])
            this.dataForm.controls.expiry_date.setValue(new Date(this.data[index].expiry_date))
            this.codeStatus = 'done'
            this.showCouponModal(modal)
        }
        else {
            this.getCoupon(modal)
        }
    }
    showCouponModal(modal) {
        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
        this.loading = false

    }
    search(): void {
        const params = {
            page: this.page,
        }
        this.ds.getList(params).subscribe((resp: any) => {
            if (resp.success === true) {
                resp.data.data.forEach(d => {
                    this.waiting.push(false)
                })
                this.data = resp.data.data
                this.pagination = resp.data
                this.dataStatus = 'done'
                this.router.navigate(['/admin/coupons'], { queryParams: params, replaceUrl: true })
            }
        })

    }
    save(data, f) {
        this.loading = true
        if (data.status === 'INVALID') {
            this.loading = false
            this.alert.error('Please enter valid data in all fields and try again')

            return false
        }

        if (data.value.discount_type === 'perc' && data.value.discount > 100) {
            this.loading = false
            this.alert.error('Your discount percentage is not more then 100')
            return false
        }

        data.value.expiry_date = moment(data.value.expiry_date).format('YYYY-MM-DD').toString();
        this.ds.update(data.value).subscribe((resp: any) => {
            this.loading = false
            if (resp.success == true) {
                this.alert.success('coupon added successfully')
                if (this.selectedIndex > -1) {
                    this.data[this.selectedIndex] = resp.data
                    this.modalRef.hide()
                }
                else {
                    this.data.push(resp.data)
                    this.modalRef.hide()
                }
                f.resetForm()
            }
            else {
                this.alert.error(resp.errors.general)
            }
        })


    }
    // redirectToUserProfileEdit(u: any) {
    //     const params: any = {
    //         id: u.id
    //     }
    //     this.router.navigate(['/admin/profile-' + u.user_type], { queryParams: params, replaceUrl: true })
    // }


    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }


    activeCoupon(id, index) {
        this.waiting[index] = true
        this.selectedId = id
        this.selectedIndex = index
        const param = { id: this.selectedId }
        this.ds.activeCoupon(param).subscribe((resp: any) => {
            this.waiting[index] = false
            if (resp.success === true) {
                this.alert.success('coupon active successfully')
                this.data[this.selectedIndex].status = 'active'
            } else {
                this.alert.error('Some error!!')
            }

        })
    }

    inactiveCoupon(id, index) {
        this.waiting[index] = true
        this.selectedId = id
        this.selectedIndex = index
        const param = { id: this.selectedId }
        this.ds.inactiveCoupon(param).subscribe((resp: any) => {
            this.waiting[index] = false
            if (resp.success === true) {
                this.alert.success('coupon deactive successfully')
                this.data[this.selectedIndex].status = 'inactive'
            } else {
                this.alert.error('Some error!!')
            }

        })
    }

    delete() {
        const param = { id: this.selectedId }
        this.ds.delete(param).subscribe((resp: any) => {
            if (resp.success === true) {
                this.alert.success('Coupon deleted successfully')
                this.data.splice(this.selectedIndex, 1)
                this.modalRef.hide()
            } else {
                this.alert.error('Some error!!')
                this.modalRef.hide()
            }

        })
    }

    cancelButton(f: any) {
        this.loading = true
        f.resetForm()
        this.modalRef.hide()
        this.loading = false
    }


}
