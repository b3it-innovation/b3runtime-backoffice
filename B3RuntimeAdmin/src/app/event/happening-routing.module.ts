import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/guard/auth-guard.service';
import { DragDropQuestion } from './containers/drag-drop-question/drag-drop-question.component';
import { HappeningOverviewComponent } from './containers/happening-overview/happening-overview.component';
import { DefineHappeningComponen } from './containers/define-happening/define-happening.component';





const routes: Routes = [
  {
    path: 'happening-home',
    component: HappeningOverviewComponent,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },

  {
    path: 'define-happening',
    component: DefineHappeningComponen,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  },

  {
    path: 'define-map/connect-question-to-control',
    component: DragDropQuestion,
    data: { requiresLogin: true },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HappeningRoutingModule { }
