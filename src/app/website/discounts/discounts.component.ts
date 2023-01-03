import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  discountsContent = ''

  constructor(public api: ApiService) {
    this.api.activeTab = 'discounts'
  }

  ngOnInit() {
    const params = {
      route: 'discounts'
    }
    this.api.getPageContent(params).subscribe((resp: any) => {
      if (resp.success === true) {
        this.discountsContent = resp.data.content
      }
    })
  }

}
