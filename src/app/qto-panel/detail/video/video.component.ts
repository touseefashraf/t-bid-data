import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { DataService } from '../data.service'
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { UIHelpers } from 'src/app/helpers/ui-helpers';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    @Input()
    video: any
    @Input()
    projectId: any
    moment = moment
    dateFormat: any
    videoUrl: any
    planForm: FormGroup
    modalRef: BsModalRef
    saveLoading = false
    constructor(
        public ds: DataService,
        private _sanitizer: DomSanitizer,
        private ms: BsModalService,
        private alert: IAlertService,
        private fb: FormBuilder,
        public ui: UIHelpers,
    ) {
        this.planForm = this.fb.group({
            project_id: new FormControl(this.projectId),
            youtube_link: new FormControl(null, [Validators.required, Validators.maxLength(250)])
        })
    }
    ngOnInit() {
        if (this.video) {
            this.videoUrl = 'http://www.youtube.com/embed/' + this.video
            this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        }
    }
    get g() {
        return this.planForm.controls
    }
    openModal(modal, index) {

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
            project_id: this.projectId,
            youtube_link: data.value.youtube_link
        }
        let saveUpdate = this.ds.updateVideo(params)

        saveUpdate.subscribe((resp: any) => {
            this.saveLoading = false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                this.modalRef.hide()
                f.resetForm()

                return false
            } else {
                this.alert.success('Video added successfully!!')
                this.video = resp.data
                this.videoUrl = 'http://www.youtube.com/embed/' + this.video
                this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
            }
            this.modalRef.hide()
            f.resetForm()
        })
    }
    cancel(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }
}
