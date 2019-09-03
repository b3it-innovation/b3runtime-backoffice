import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guard/auth-guard.service';

import { DefineMapComponent } from './containers/define-map/define-map.component';
import { MapsOverviewComponent } from './containers/maps-overview/maps-overview.component';

const routes: Routes = [
  {
    path: 'map-home',
    component: MapsOverviewComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },
  {
    path: 'define-map',
    component: DefineMapComponent,
    data: { requiresLogin: false },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
