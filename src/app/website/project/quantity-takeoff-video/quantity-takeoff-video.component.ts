import { DomSanitizer } from '@angular/platform-browser'
import { DataService } from '../data.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-quantity-takeoff-video',
    templateUrl: './quantity-takeoff-video.component.html',
    styleUrls: ['./quantity-takeoff-video.component.css']
})
export class QuantityTakeoffVideoComponent implements OnInit {
    data: any
    dataStatus = 'fetch'
    videoUrl: any
    constructor(
        private ds: DataService,
        private _sanitizer: DomSanitizer,
    ) {
        this.data = this.ds.projectDetails.youtube_link
        console.log(this.data);

        this.dataStatus = 'done'
        if (this.data) {
            this.videoUrl = 'https://www.youtube.com/embed/' + this.data

        }
        else{
            this.videoUrl = 'https://www.youtube.com/embed/-phmMgFyGu0'
        }
        this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl)

    }

    ngOnInit() {
        if (this.data) {

        }

    }

}
