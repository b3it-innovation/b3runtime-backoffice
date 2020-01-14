import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterNGRXService } from "../../../core/store/router/app-router.service";

@Component({
    templateUrl: './happening-overview.component.html',
    styleUrls: ['./happening-overview.component.scss']
})
export class HappeningOverviewComponent implements OnInit, OnDestroy {

    constructor(private routerService: RouterNGRXService) { }

    ngOnDestroy(): void {

    }
    ngOnInit(): void {
        console.log('HappeningComponent kör');
    }

    onDefineHappening() {
        this.routerService.routeToLocation(['/define-happening']);
    }

    onGoToHappenings() {
        console.log('körs metod');
    }
}