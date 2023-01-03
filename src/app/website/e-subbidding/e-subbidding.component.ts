import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'


@Component({
  selector: 'app-e-subbidding',
  templateUrl: './e-subbidding.component.html',
  styleUrls: ['./e-subbidding.component.css']
})
export class ESubbiddingComponent implements OnInit {
  eSubbiddingContent = ''

  constructor(public api: ApiService) {
    this.api.activeTab = 'e-subbidding'
  }

  ngOnInit() {
    const params = {
      route: 'e-subbidding'
    }
    this.api.getPageContent(params).subscribe((resp: any) => {
      if (resp.success === true) {
        this.eSubbiddingContent = resp.data.content
      }
    })
  }

}
