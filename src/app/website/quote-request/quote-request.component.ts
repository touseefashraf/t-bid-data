import { UIHelpers } from './../../helpers/ui-helpers';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { DataService } from './data.service'
import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { MapsAPILoader } from '@agm/core'
import { apis } from '../../../environments/environment'


@Component({
    selector: 'app-quote-request',
    templateUrl: './quote-request.component.html',
    styleUrls: ['./quote-request.component.css']
})
export class QuoteRequestComponent implements OnInit {
    googleCaptcha = ''
    public resolved(captchaResponse: string) {
        this.googleCaptcha = captchaResponse
    }
    siteKey = apis.googleCaptchaSiteKey
    @ViewChild('search', { static: false }) public searchElementRef: ElementRef
    searchControl: any
    flag: boolean = false
    dataForm: FormGroup
    dataStatus = 'fetching'
    projectId: any
    selectedId: any
    selectedIndex: any
    lat: any
    lng: any

    constructor(
        public ds: DataService,
        public api: ApiService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private mapsAPILoader: MapsAPILoader,
    ) {

        this.ds.preQuote().subscribe((resp: any) => {
            this.projectId = resp.data
            this.ds.preId = resp.data
            this.dataStatus = 'done'
        })


        this.dataForm = this.fb.group({
            id: new FormControl(this.projectId),
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            company: new FormControl(null, [Validators.required]),
            contact: new FormControl(null, [Validators.required]),
            address: new FormControl(null, [Validators.required]),
            no_drawings: new FormControl(null, [Validators.required]),
            target_days: new FormControl(null, [Validators.required]),
            lat: new FormControl(null, []),
            lng: new FormControl(null, []),
        })
    }

    ngOnInit() {
        this.autoCom()
    }

    autoCom(): void {
        this.searchControl = new FormControl()
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            })
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace()
                if (place.geometry === undefined || place.geometry === null) {
                    return
                }
                this.lat = place.geometry.location.lat()
                this.lng = place.geometry.location.lng()
                this.dataForm.controls.address.setValue(place.formatted_address)

            })
        })
    }

    submit(data) {
        if(this.ds.planDoc.getValue() == 0){
            this.alert.error('Please Select atleast 1 Plan Document')

            return false
        }
        if(this.ds.specDoc.getValue() == 0){
            this.alert.error('Please Select atleast 1 Spec Document')

            return false
        }
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            return false
        }
        data.value.id = this.ds.preId
        data.value.lat = this.lat
        data.value.lng = this.lng

        this.ds.qtoRequest(data.value)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    return false
                } else {
                    this.dataStatus = "submitted"
                    this.alert.success('status updated successfully')
                    // const Index = this.dataList.findIndex(d => d.id === rowId)
                    // this.dataList[Index].status = readStatus
                    // this.alert.success('status updated successfully!!')
                }
            })
    }

    get g() {
        return this.dataForm.controls
    }

}
