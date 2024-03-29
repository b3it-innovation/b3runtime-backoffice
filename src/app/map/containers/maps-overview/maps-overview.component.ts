import { Component, OnInit } from '@angular/core';
import { RouterNGRXService } from 'app/core/store/router/app-router.service';

@Component({
  selector: 'app-maps-overview',
  templateUrl: './maps-overview.component.html',
  styleUrls: ['./maps-overview.component.scss']
})
export class MapsOverviewComponent implements OnInit {

  constructor(private routerService: RouterNGRXService) { }

  ngOnInit() {
  }

  onDefineMap() {
    this.routerService.routeToLocation(['/define-map']);
  }
}
