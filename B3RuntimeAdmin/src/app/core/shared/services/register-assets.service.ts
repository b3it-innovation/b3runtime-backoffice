import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class RegisterAssetsService {

    constructor(
        private _iconRegistry: MatIconRegistry,
        private _domSanitizer: DomSanitizer) {
    }

    registerAssets() {
        this._iconRegistry.addSvgIconInNamespace('assets', 'logo',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));

        this._iconRegistry.addSvgIconInNamespace('assets', 'android',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/android.svg'));
    }

}
