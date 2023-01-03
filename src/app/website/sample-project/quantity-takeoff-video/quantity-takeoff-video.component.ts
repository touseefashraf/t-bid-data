import { DomSanitizer } from '@angular/platform-browser'
import { DataService } from '../data.service'
import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
    selector: 'app-quantity-takeoff-video',
    templateUrl: './quantity-takeoff-video.component.html',
    styleUrls: ['./quantity-takeoff-video.component.css']
})
export class QuantityTakeoffVideoComponent implements OnInit, OnDestroy {
    data: any
    videoUrl: any
    constructor(
        public ds: DataService,
        private _sanitizer: DomSanitizer,
    ) {
        this.ds.getSampleProject().subscribe((res: any) => {
            this.data = res.data.project.youtube_link
            if (this.data) {
                this.videoUrl = 'https://www.youtube.com/embed/' + this.data
            }
            else {
                this.videoUrl = 'https://www.youtube.com/embed/-phmMgFyGu0'
            }
            this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl)
            this.ds.dataStatus = 'done'


        })
    }
    ngOnDestroy(): void {
        this.ds.dataStatus = 'fetching'
    }
    ngOnInit() {
        if (this.data) {

        }

    }

}
