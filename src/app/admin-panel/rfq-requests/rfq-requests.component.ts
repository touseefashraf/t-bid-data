import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from './data.service';
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';

@Component({
  selector: 'app-rfq-requests',
  templateUrl: './rfq-requests.component.html',
  styleUrls: ['./rfq-requests.component.css']
})
export class RfqRequestsComponent implements OnInit {
    rfqRequestList: any;
    dataStatus = 'fetching'
    approval_status='pending'
    selectedId: any;
    selectedIndex: any;
    modalRef: BsModalRef
    rejectForm:FormGroup
    approveForm:FormGroup

  loaderOptions = {
    rows: 4,
    cols: 7,
    colSpans: {
        0: 1,
    }
}
    loginLoading: boolean;

  constructor(
    private ds: DataService,
    private fb: FormBuilder,
    public ui: UIHelpers,
    private alert: IAlertService,
    private ms: BsModalService,
  ) {
        this.rejectForm = this.fb.group({
        reject_reason: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
         })
        this.approveForm = this.fb.group({
        approve_reason: new FormControl(null, [ Validators.maxLength(500)]),
         })
   }

  ngOnInit() {
    this.ds.get().subscribe((resp: any) => {
        if (resp.success === true) {
            this.rfqRequestList = resp.data
            this.dataStatus = 'done'
        }
    })
  }
  get g() {
    return this.rejectForm.controls
}

rejectRequestConfirmation(template: TemplateRef<any>, id: any, i: any) {
    this.selectedId = id
    this.selectedIndex = i
    this.modalRef = this.ms.show(template,
        { class: 'modal-md modal-dialog-centered admin-panel',
        backdrop: 'static',
        ignoreBackdropClick: true,
        keyboard: false
    })
}
approveRequestConfirmation(template: TemplateRef<any>, id: any, i: any) {
    this.selectedId = id
    this.selectedIndex = i
    this.modalRef = this.ms.show(template,
        { class: 'modal-md modal-dialog-centered admin-panel',
        backdrop: 'static',
        ignoreBackdropClick: true,
        keyboard: false

    })
}

rejectRequest(f:any) {
    this.loginLoading = true
    if (this.rejectForm.status === 'INVALID') {
        this.alert.error('Please fill-in valid data in field & try again.')
        this.loginLoading = false

        return false
    }
    const param = {
        id: this.selectedId,
        reject_reason: this.rejectForm.value.reject_reason,
    }
    this.ds.rejectRequest(param).subscribe((resp: any) => {
        this.loginLoading = false
        if (resp.success === false) {
            this.alert.error(resp.error.general)
            this.loginLoading = false

            return false
        } else {
            this.alert.success('Request Rejected successfully')
            this.rfqRequestList[this.selectedIndex].approval_status = 'rejected'
        }
        this.modalRef.hide()
        f.resetForm()
    })
}

approveRequest(f:any) {
    this.loginLoading = true
    const param = {
        id: this.selectedId,
        approve_reason: this.approveForm.value.approve_reason,
    }
    this.ds.approveRequest(param).subscribe((resp: any) => {
        this.loginLoading = false
        if (resp.success === false) {
            this.alert.error(resp.error.general)
            this.loginLoading = false

            return false
        } else {
            this.alert.success('Request Approved successfully')
            this.rfqRequestList[this.selectedIndex].approval_status = 'approved'
        }
        f.resetForm()
        this.modalRef.hide()
    })
}
  getStatusFormat(status: string) {
    const statusFormat = {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
    }

    return statusFormat[status]
}

  getStatusClass(status: string) {
    const statusFormat = {
        pending: 'i-badge yellow',
        approved: 'i-badge green',
        rejected: 'i-badge red',
    }

    return statusFormat[status]
}


}
